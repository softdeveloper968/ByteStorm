"use client";
import useHomeResultsStore from "@/app/list-a-home/search/results/homeResultsStore"
import homeResultsStore from "@/app/list-a-home/search/results/homeResultsStore"
import {PrimaryButton} from "@/app/usignup/button"
import {config} from "@/app/usignup/config"
import {useSession} from "next-auth/react"
import Image from "next/image"
import {useRouter} from "next/navigation"
import React, {useEffect, useLayoutEffect, useRef, useState} from "react"
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import styled from "styled-components"
import BackgroundHome from "./bgsearch.jpg"

function SearchFSBOFRBO() {
  const useStore = homeResultsStore();
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    debounce: 600,
  });
  const [forSell, setForSell] = useState(true);
  const [forRent, setForRent] = useState(true);
  const searchInputRef = useRef(null);
  const searchButtonRef = useRef(null);
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  const [places, setPlaces] = useState([]);
  const [location, setLocation] = useState({ address: "" });
  const maxResults = 5;
  const { data: session } = useSession();
  useLayoutEffect(() => {
    if (useStore.token !== session?.user?.token)
      useStore.setState({ token: session?.user.token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (places.length !== 0) setPlaces([]);

    if (placePredictions.length > 0) {
      for (let i = 0; i < maxResults; i++) {
        try {
          placesService?.getDetails(
            {
              placeId: placePredictions[i].place_id,
            },
            (placeDetails) => {
              setPlaces((prev) => [
                ...prev,
                {
                  address: placeDetails?.formatted_address ?? "",
                  geometry: {
                    lat: placeDetails?.geometry?.location?.lat() ?? 0,
                    lng: placeDetails?.geometry?.location?.lng() ?? 0,
                  },
                },
              ]);
            },
          );
        } catch (e) {}
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placePredictions]);
  const [notFound, setNotFound] = useState(false);
  useHomeResultsStore.subscribe((state) => {
    if (submitted && state.houses && state.houses.length === 0) {
      setNotFound(true);
      setSubmitted(false);

      return;
    }

    if (submitted && state.houses && state.houses.length > 0) {
      setNotFound(false);
      router.push("/list-a-home/search/results");

      return;
    }
  });

  async function handleSubmit() {
    const isForSaleOrRent = forRent || forSell;
    const inputIsOnResults = places
      .map((place) => place.address)
      .includes(location.address);
    const filteredLocations = places.filter(
      (place) => place.address === location.address,
    );
    const locationWithCoords = filteredLocations[0] ?? places[0];
    const body = {
      forSell,
      forRent,
      location: locationWithCoords,
      radius: 30,
      houses: [],
    };
    if (isForSaleOrRent && inputIsOnResults) {
      useStore.setState(body);
      setNotFound(false);
      setSubmitted(true);
      // if (useStore.houses.length > 0) router.push("/list-a-home/search/results");
      // else alert('no results')
    }
  }

  function handleClick(e) {
    setLocation(() => ({ address: e.textContent }));
    focusSearchBtn();
  }

  function handleChange(e) {
    setLocation((prevState) => ({
      ...prevState,
      address: e.target.value,
    }));

    getPlacePredictions({
      input: e.target.value,
      region: "us",
      // types: ["(cities)"],
    });
  }

  function handleKeyDown(e) {
    if (["Tab", "Enter"].includes(e.key) && places.length > 0) {
      e.preventDefault();
      setLocation(places[0]);
      focusSearchBtn();
    }
  }

  function focusSearchBtn() {
    if (searchButtonRef.current) searchButtonRef.current.focus;
  }

  return (
    <SearchFRBOContainer style={{}}>
      <Image
        className={"background"}
        src={BackgroundHome}
        alt={"Background"}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
          height: "100%"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(250,250,250,0.4)",
        }}
      />
      <div
        style={{
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <h1>Match with your perfect home</h1>
        {notFound && (
          <h2 style={{ color: config.colors.red, textShadow: "#FFF 0 0 5px" }}>
            There is no house found for your query
          </h2>
        )}
        {submitted && !notFound && <h2>Loading...</h2>}
        {/*INFO: here are the button for for sell or rent*/}
        {/*<div>*/}
        {/*  <ForSaleRentButton*/}
        {/*    $active={forSell}*/}
        {/*    $left={true}*/}
        {/*    onClick={() => setForSell((prevState) => !prevState)}*/}
        {/*  >*/}
        {/*    Sell*/}
        {/*  </ForSaleRentButton>*/}
        {/*  <ForSaleRentButton*/}
        {/*    $active={forRent}*/}
        {/*    $left={false}*/}
        {/*    onClick={() => setForRent((prevState) => !prevState)}*/}
        {/*  >*/}
        {/*    Rent*/}
        {/*  </ForSaleRentButton>*/}
        {/*</div>*/}
        <div
          className={""}
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            gap: "1rem",
            borderRadius: "5px",
            alignItems: "center",
            marginTop: "1rem",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "0.5rem",
            maxWidth: "800px",
            width: "100%",
            minWidth: "300px",
          }}
        >
          <div className={"flex w-full gap-2"}>
            <input
              ref={searchInputRef}
              style={{ width: "80%", borderRadius: "5px" }}
              placeholder={"Search Address, City, or Zip Code"}
              value={location.address}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <PrimaryButton
              onClick={handleSubmit}
              ref={searchButtonRef}
              style={{ width: "20%", minWidth: "8rem" }}
            >
              Search
            </PrimaryButton>
          </div>
          <div
            style={{
              position: "absolute",
              top: "3.5rem",
              left: 0,
              width: "80%",
              gap: "0.25rem",
            }}
          >
            {!places.map((place) => place.address).includes(location.address) &&
              places.map((place) => (
                <PlaceResult
                  onClick={(e) => handleClick(e)}
                  address={place.address}
                  geometry={place.geometry}
                  key={place.address}
                />
              ))}
          </div>
        </div>
      </div>
    </SearchFRBOContainer>
  );
}

export default SearchFSBOFRBO;
export const ForSaleRentButton = styled.button`
  background-color: ${(props) =>
    props.$active ? config.colors.brandGreen : config.colors.black};
  width: 15rem;
  color: ${(props) =>
    props.$active ? config.colors.black : config.colors.inputBorder};
  border: 1px solid ${config.colors.inputBorder};
  border-radius: ${(props) =>
    props.$left ? "1rem 0 0 1rem" : "0 1rem 1rem 0"};
  padding: 0.15rem;
  font-weight: bold;
`;
export const SearchFRBOContainer = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  color: ${config.colors.black};
  accent-color: ${config.colors.brandGrey};

  img.background {
    position: absolute;
  }

  h1 {
    color: ${config.colors.black};
  }
`;

export function PlaceResult(props) {
  return (
    <InputPlaceResult
      onClick={(e) => (props.onClick ? props.onClick(e.target) : {})}
      className={"shadow-xl"}
      style={{
        backgroundColor: config.colors.background,
        display: "flex",
        margin: "0.35rem 0.6rem 0.25rem 0.45rem ",
        padding: "0.35rem",
        justifyContent: "start",
        alignItems: "start",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          textOverflow: "ellipsis",
          display: "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {props.address}
      </span>
    </InputPlaceResult>
  );
}
const InputPlaceResult = styled.div`
  border: inset 3px transparent;

  &:hover {
    border: inset 3px dodgerblue;
  }
`;
