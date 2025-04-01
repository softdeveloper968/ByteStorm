"use client";
import {addCircle} from "@/app/list-a-home/search/results/addCircle"
import {addSourceAndLayer} from "@/app/list-a-home/search/results/addSourceAndLayer"
import {descriptionAndFunctionality} from "@/app/list-a-home/search/results/descriptionAndFunctionality"
import useHomeResultsStore from "@/app/list-a-home/search/results/homeResultsStore"
import HouseDetailsMaps from "@/app/list-a-home/search/results/HouseDetails"
import {HousesSideBar, SearchResultContainer} from "@/app/list-a-home/search/results/housesSideBar"
import {MapboxMaps} from "@/app/list-a-home/search/results/mapboxMaps"
import {SearchOnMap} from "@/app/list-a-home/search/results/searchOnMap"
import mapboxgl from "mapbox-gl"
import {useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import {useEffect, useRef, useState} from "react"
import styled from "styled-components"
import "mapbox-gl/dist/mapbox-gl.css"

export const source = "points";

function SearchResultsPage(props) {
  const useStore = useHomeResultsStore();
  const [fly, setFly] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();
  const mapRef = useRef();
  // INFO: when checking for an specific home, should reset the zoom to at least 15
  const [zoom, setZoom] = useState(5);
  const mapContainerRef = useRef();
  const [center, setCenter] = useState([-106.5348, 38.7945]);
  // INFO: this is triggered before the map is loaded
  useHomeResultsStore.subscribe((state) => {
    if (mapRef.current && isMounted) {
      const map = mapRef.current;
      const features = state.houses.map((house) => ({
        type: "Feature",

        id: house._id ?? house.listingId,
        geometry: {
          type: "Point",
          coordinates: [
            house.location.coordinates.lng,
            house.location.coordinates.lat,
          ],
        },
        properties: {
          title: house.general.nickname,
          id: house._id ?? house.listingId,
          photo:
            house.general.photos?.length > 0 ? house.general.photos[0] : "",
          description: `${house.price.details.description}`,
        },
      }));
      addSourceAndLayer(map, features);

      setCenter((prev) => [
        state.location.geometry.lng,
        state.location.geometry.lat,
      ]);
      setFly(true);
      descriptionAndFunctionality(map, source, focusHouse);

      if (state.houses.length === 0 && mapContainerRef.current) {
        // const mapElement = document.querySelector("div#map-container");
        if (mapElement) {
          mapContainerRef.current.style.width = "100%";
          mapContainerRef.current.style.height = "100%";
        }
      }
      if (mapRef.current) mapRef.current?.resize()
    }
  });
  const router = useRouter();
  function focusHouse(house) {
    const lng = house.location.coordinates.lng;
    const lat = house.location.coordinates.lat;
    const coordinates = [lng, lat];
    setCenter(() => coordinates);
    setFly(true);
    if (mapRef.current)
      addCircle(mapRef.current, source, coordinates, () => {});
  }

  useEffect(() => {
    // INFO: this makes sure that everytime the center is being modified, the map fly to the center
    if (mapRef.current && fly) {
      setTimeout(() => {
        mapRef.current?.flyTo({
          center: center,
          zoom: 14,
          speed: 0.7,
          curve: 1,
          easing(t) {
            return t;
          },
        });
        setFly(false);
      }),
        1000;
    }
  }, [fly]);

  useEffect(() => {
    if (useStore.houses.length === 0) router.push("/list-a-home/search");
    setIsMounted(false);
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_API_MAPBOX;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      minZoom: 5,
      maxZoom: 17,
      // cluster: true,
      // clusterMaxZoom: 14,
      // clusterRadius: 50,
      fitBoundsOptions: {
        padding: 10,
      },
      language: "auto",
      style: MapboxMaps.MW_MONO,
    });
    mapRef.current = map;
    const features = useStore.houses.map((house) => ({
      type: "Feature",
      id: house._id ?? house.listingId,
      geometry: {
        type: "Point",
        coordinates: [
          house.location.coordinates.lng,
          house.location.coordinates.lat,
        ],
      },
      properties: {
        title: house.general.nickname,
        id: house._id ?? house.listingId,
        photo: house.photos?.length > 0 ? house.photos[0] : "",
      },
    }));
    map.on("load", () => {
      // map.loadImage(icon.url, (error, image) => {
      //   if (error) throw error;
      //
      //   map.addImage(icon.name, image, {
      //     sdf: "true",
      //   });
      // });
      addSourceAndLayer(mapRef.current, features);
      descriptionAndFunctionality(mapRef.current, source, focusHouse);
    });

    setCenter((prev) => [
      useStore.location.geometry.lng,
      useStore.location.geometry.lat,
    ]);

    setTimeout(() => {
      mapRef.current?.flyTo({
        center: [
          useStore.location.geometry.lng,
          useStore.location.geometry.lat,
        ],
        zoom: 14,
        speed: 0.7,
        curve: 1,
        easing(t) {
          return t;
        },
      });
      setIsMounted(true);
    }, 1500);

    return () => {
      mapRef.current?.remove()
    };
  }, []);

  useEffect(() => {
    if (useStore.token !== session?.user?.token && session?.user?.token)
      useStore.setState({ token: session.user.token });
  }, [session]);

  return (
    <SearchResultContainer
      className={"grid-cols-1 md:grid-cols-2"}
    >
      <MapContainer id="map-container" ref={mapContainerRef}>
        <SearchOnMap />
      </MapContainer>
      <HousesSideBar
        houses={useStore.houses}
        id="houses-side-bar"
        focusHouse={focusHouse}
        center={center}
        map={mapRef}
      />
      {useStore.houseDetails && <HouseDetailsMaps />}
    </SearchResultContainer>
  );
}

export const MapContainer = styled.div`
  background-color: lightgrey;
  position: relative;
`;

export const icon = {
  name: "mw-icon",
  mapbox: "mapbox-home",
  // mapbox: "mw-home",
  url: "http://mustwants-listing-images.s3.amazonaws.com/mw-home.svg",
  // url: "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
  // url:"https://mustwants-general.s3.amazonaws.com/mw-home.png"
  inactive: "mw-home-unfocus",
  active: "mw-home",
  activeLiked: "mw-home-liked",
  inactiveLiked: "mw-home-liked-unfocus"
};

export default SearchResultsPage;
