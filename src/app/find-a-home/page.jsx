"use client"
import {DownloadApp} from "@/app/find-a-home/downloadApp"
import {DragSeparation} from "@/app/find-a-home/dragSeparation"
import {HomeDescription} from "@/app/find-a-home/homeDescription"
import {HousePrev, JoinMWDialog} from "@/app/find-a-home/HousePrev"
import BackgroundHome from "@/app/list-a-home/search/bgsearch.jpg"
import {ForSaleRentButton, PlaceResult, SearchFRBOContainer} from "@/app/list-a-home/search/page"
import {addSourceAndLayer} from "@/app/list-a-home/search/results/addSourceAndLayer"
import useHomeResultsStore from "@/app/list-a-home/search/results/homeResultsStore"
import {MapboxMaps} from "@/app/list-a-home/search/results/mapboxMaps"
import {icon, MapContainer, source} from "@/app/list-a-home/search/results/page"
import {PrimaryButton} from "@/app/usignup/button"
import {config} from "@/app/usignup/config"
import mapboxgl from "mapbox-gl"
import {useSession} from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/navigation"
import React, {useEffect, useRef, useState} from "react"
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import { IoIosArrowForward } from "react-icons/io"
import {MdDragHandle} from "react-icons/md"
import styled from "styled-components"

export default function SearchAHome() {
  const mapRef = useRef()
  const mapContainerRef = useRef()
  const searchInput = useRef()
  const resultsRef = useRef()
  const [center, setCenter] = useState([-106.5348, 38.7945])
  const [status, setStatus] = useState("forSale"); // Default to "For Sale"
  const [zoom, setZoom] = useState(5)
  const maxResults = 5
  const [forSell, setForSell] = useState(false)
  const [forRent, setForRent] = useState(true)
  const [focusedHome, setFocusedHome] = useState(null)
  const [location, setLocation] = useState({address: ""})
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    debounce: 600
  })
  const searchInputRef = useRef(null)
  const searchButtonRef = useRef(null)
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])
  const [allBOHomes, setAllBOHomes] = useState([])
  const [notFound, setNotFound] = useState(false)
  function blurIfTouching() {
    const resultContainer = document.querySelector("#results-container")
    const searchContainer = document.querySelector("#search-container")
    const elementsPrev = [...resultContainer.getElementsByClassName("house-prev-wrapper")]
    const bottom = searchContainer.getClientRects()[0].bottom
    const isTouching = elementsPrev.some(elem => elem.getBoundingClientRect().top < bottom)
    if (isTouching) {
      searchContainer.classList.add("backdrop-blur-sm")
    } else {
      searchContainer.classList.remove("backdrop-blur-sm")
    }
  }
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    const resultContainer = document.querySelector("#results-container")
    const searchContainer = document.querySelector("#search-container")
    const downloadAppContainer = document.querySelector("#download-app")
    resultContainer?.addEventListener("scroll", blurIfTouching)
    const topBarBottom = document.querySelector("#top-bar").getClientRects()[0].bottom
    if (topBarBottom && searchInput.current) {
      searchInput.current.style.top = topBarBottom + "px"
    }
    const footer = document.querySelector("footer")
    if (footer && resultsRef.current && searchContainer && downloadAppContainer) {
      const footerHeight = footer.getClientRects()[0].height
      const windowHeight = window.innerHeight
      const downloadAppUpperBorder = windowHeight - downloadAppContainer.getClientRects()[0].top
      resultsRef.current.style.maxHeight = (windowHeight - footerHeight - topBarBottom - downloadAppUpperBorder) + "px"
      resultsRef.current.style.paddingTop = (searchContainer.getClientRects()[0].height) + "px"
      resultsRef.current.style.paddingBottom = downloadAppUpperBorder + "px"
    }

    return () => {
      resultContainer?.removeEventListener("scroll", blurIfTouching)
    }

  }, [focusedHome, notFound])

  function fetchAllHomes() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/searchMW`)
      .then(res => res.json())
      .then(res => setAllBOHomes(res.listings))

  }

  const handleToggle = () => {
    if(status === "forSale") {
      setStatus("forRent");
      setForRent((prevState) => !prevState)
      setForSell((prevState) => !prevState)
    } else {
      setStatus("forSale");
      setForRent((prevState) => !prevState)
      setForSell((prevState) => !prevState)
    }
  };

  const useStore = useHomeResultsStore()
  const [savedHomes, setSavedHomes] = useState([])
  useEffect(() => {
    fetchAllHomes()

    useStore.updateSavedBO()
      .then(res => setSavedHomes(res))
  }, [session.data?.user])

  useEffect(() => {
    if (places.length !== 0) setPlaces([])

    if (placePredictions.length > 0) {
      for (let i = 0; i < maxResults; i++) {
        try {
          placesService?.getDetails(
            {
              placeId: placePredictions[i].place_id
            },
            (placeDetails) => {
              setPlaces((prev) => [
                ...prev,
                {
                  address: placeDetails?.formatted_address ?? "",
                  geometry: {
                    lat: placeDetails?.geometry?.location?.lat() ?? 0,
                    lng: placeDetails?.geometry?.location?.lng() ?? 0
                  }
                }
              ])
            }
          )
        } catch (e) {}
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placePredictions])
  const [places, setPlaces] = useState([])
  async function handleSubmit() {
    const isForSaleOrRent = forRent || forSell
    const inputIsOnResults = places
      .map((place) => place.address)
      .includes(location.address)
    const filteredLocations = places.filter(
      (place) => place.address === location.address
    )
    const locationWithCoords = filteredLocations[0] ?? places[0]
    const bodyArgs = {
      forSell,
      forRent,
      location: locationWithCoords,
      radius: 30
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/searchMW`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify(bodyArgs)
      }).then(res => res.json())
      .then(res => {
        if (res.houses.length > 0) {
          setNotFound(false)
          setAllBOHomes(res.houses)
        } else {
          setNotFound(true)
        }
      })
  }

  function handleClick(e) {
    setLocation(() => ({address: e.textContent}))
    focusSearchBtn()
  }

  function handleChange(e) {
    setLocation((prevState) => ({
      ...prevState,
      address: e.target.value
    }))

    getPlacePredictions({
      input: e.target.value,
      region: "us"
      // types: ["(cities)"],
    })
  }

  function handleKeyDown(e) {
    if (["Tab", "Enter"].includes(e.key) && places.length > 0) {
      e.preventDefault()
      setLocation(places[0])
      focusSearchBtn()
    }
  }

  function focusSearchBtn() {
    if (searchButtonRef.current) searchButtonRef.current.focus
  }

  useEffect(() => {
    // INFO: for the map
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_API_MAPBOX
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      minZoom: 5,
      maxZoom: 17,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
      fitBoundsOptions: {
        padding: 10
      },
      language: "auto",
      style: MapboxMaps.MW_MONO
    })
    mapRef.current = map

    map.on("load", () => {
      const feature = getFeaturesForMap(focusedHome === null ? "" : focusedHome._id)
      addSourceAndLayer(map, feature)

      map.on("mousedown", source, (e) => {
        removeListeners()
        changeHomeFocus(e.features[0].properties.id)
      })

      if (allBOHomes.length > 0) {
        const lng = allBOHomes[0].location.coordinates.lng
        const lat = allBOHomes[0].location.coordinates.lat
        const coordinates = [lng, lat]
        setCenter(() => coordinates)
      }
    })

    return () => {
      mapRef.current?.remove()
    }
  }, [allBOHomes])

  function getFeaturesForMap(id) {
    return allBOHomes.map(house => ({
      type: "Feature",
      id: house._id ?? house.listingId,
      geometry: {
        type: "Point",
        coordinates: [
          house.location.coordinates.lng,
          house.location.coordinates.lat
        ]
      },
      properties: {
        title: house.general.nickname,
        id: house._id ?? house.listingId,
        photo: house.photos?.length > 0 ? house.photos[0] : "",
        icon: (id === house._id && (Array.isArray(savedHomes) && savedHomes.includes(house._id))) ? icon.activeLiked
          : id === house._id ? icon.active
            : (Array.isArray(savedHomes) && savedHomes.includes(house._id)) ? icon.inactiveLiked
              : icon.inactive
      }
    }))

  }
  const [focusedHomeID, setFocusedHomeID] = useState("")
  useEffect(() => {
    if (mapRef.current && mapRef.current.getSource(source)) {
      const features = getFeaturesForMap(focusedHomeID)
      mapRef.current.getSource(source)
        .setData({
          type: "FeatureCollection",
          features: features
        })
    }
  }, [savedHomes, focusedHomeID])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current?.flyTo({
        center: center,
        zoom: 12,
        speed: 0.7,
        curve: 1,
        easing(t) {
          return t
        }
      })
    }
  }, [center])

  function changeHomeFocus(id) {
    const changeFocus = allBOHomes.find(home => home._id === id)
    if (changeFocus) {
      const features = getFeaturesForMap(id)
      mapRef.current.getSource(source).setData({
        type: "FeatureCollection",
        features: features
      })
      setFocusedHome(changeFocus)
      setFocusedHomeID(changeFocus._id)
      const coordinates = [changeFocus.location.coordinates.lng, changeFocus.location.coordinates.lat]
      setCenter(coordinates)
    }
  }
  const [isDragging, setIsDragging] = useState(false)
  const start = useRef(0)
  const rightPanel = useRef()
  const [currentSize, setCurrentSize] = useState()
  const minSize = 630
  function handleMouseUp(e) {
    setIsDragging(false)
    removeListeners()
    start.current = e.clientX
    const rightPanel = document.querySelector("#right-panel")
    setCurrentSize(rightPanel.offsetWidth)
    mapRef.current?.resize()
  }

  function handleMouseMove(e) {
    const rightPanel = document.querySelector("#right-panel")
    const mapPanel = document.querySelector("#map-container")
    const delta = e.clientX - start.current
    const newWidth = Math.max(minSize, Math.min(currentSize - delta, window.innerWidth))
    const mapWidth = window.innerWidth - newWidth
    mapPanel.style.width = `${mapWidth}px`
    rightPanel.style.width = `${newWidth}px`
  }

  function handleMouseDown(e) {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    setIsDragging(true)
    const rightPanel = document.querySelector("#right-panel")
    setCurrentSize(rightPanel.offsetWidth)
    start.current = e.clientX
  }

  useEffect(() => {
    if (!isDragging) {
      removeListeners()
    }
  }, [isDragging])

  function removeListeners() {
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  useEffect(() => {
    if (notFound) {
      setTimeout(() => {
        setNotFound(false)
      }, 2000)
    }

  }, [notFound])
  const modalRef = useRef()
  function heartClick(e, id) {
    e.stopPropagation()
    e.preventDefault()

    if (session.data?.user && session.data?.user?.userRole === "user") {
      if (useStore.token?.trim() === "Bearer" || !useStore.token) {
        useStore.token = session.data.user.token
      }

      if (savedHomes.length >= 0) {
      } else {
        setSavedHomes([])
      }
      const save =Array.isArray(savedHomes) && !savedHomes.includes(id)
      const body = {save, id}
      useStore.saveBO(body)
        .then(res => setSavedHomes(_ => res))
    } else {
      if (modalRef.current?.hasAttribute("open")) {
        modalRef.current?.close()
      } else {
        modalRef.current?.showModal()
      }
    }
  }

  return (
    <SearchFRBOContainer style={{flexDirection: "row", position: "relative", overflow: "hidden"}}>
      {/* <Image
        fetchPriority={"high"}
        className={"background"}
        src={BackgroundHome}
        alt={"Background"}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          width: "100%",
          height: "100%"

        }}
      /> */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: focusedHome ? config.colors.brandGrey
            : "#28252b"
        }}
      />
      <MapContainer
        style={{height: "100%", width: "620px", zIndex: 12}}
        id={"map-container"}
        ref={mapContainerRef}
      >
        <DragSeparation
          style={{}}
          $isDragging={isDragging}
          onMouseDown={handleMouseDown}
        >
          <MdDragHandle/>
        </DragSeparation>
      </MapContainer>
      <div
        ref={rightPanel}
        id={"right-panel"}
        className="align-main-inherit px-4 md:mt-[65px] my-[20px] md:mb-[80px] w-full flex items-center flex-col overflow-auto md:h-[calc(100%-140px)]">
        {focusedHome ? <HomeDescription
            $isLiked={Array.isArray(savedHomes) && savedHomes.includes(focusedHome._id)}
            house={focusedHome}
            exit={() => setFocusedHome(null)}
            heartClick={(e) => heartClick(e, focusedHome._id)}
          /> :
          <>
            <div
              ref={searchInput}
              id={"search-container"}
              className={"justify-center flex flex-col items-center z-10 pb-4 w-full pt-4 md:pt-10"}
            >
              <h1 className="!text-white !m-0 !mb-2">Find Your Perfect Home</h1>
              <p className="text-white max-w-[600px] text-center mb-6"><a href="/download-app" className="!bg-mw_green !text-black truncate rounded px-1 hover:!bg-mw_olive transition duration-150 ease-in-out cursor-pointer" target="_blank">Download the MustWants app</a> to explore 3.97 million+ homes nationwide (coming soon to the web). Below, browse properties listed for sale or rent directly by their owners and start your home search today!</p>
              {notFound && (
                <h2 style={{color: config.colors.red, textShadow: "#FFF 0 0 5px"}}>
                  There is no house found for {location.address}
                </h2>
              )}
              {/* <div>
                <ForSaleRentButton
                  $active={forSell}
                  $left={true}
                  onClick={() => setForSell((prevState) => !prevState)}
                >
                  Sell
                </ForSaleRentButton>
                <ListAHomeButton onClick={()=>router.push('/list-a-home/for-sale-by-owner')}>List a house</ListAHomeButton>
                <ForSaleRentButton
                  $active={forRent}
                  $left={false}
                  onClick={() => setForRent((prevState) => !prevState)}
                >
                  Rent
                </ForSaleRentButton>
              </div> */}

<div className="flex items-center bg-[#D1EE00] rounded-full overflow-hidden">
      <button
        onClick={handleToggle}
        className={`py-2 px-4 ${status === "forSale" ? "!bg-[#D1EE00] text-black" : "bg-white text-black"}`}
      >
       For Sale
      </button>
      <span className="w-[1px] h-[40px] bg-[#d2d1d1]"></span> 
      <button
        onClick={handleToggle}
        className={`py-2 px-4 ${status !== "forSale" ? "bg-[#D1EE00] text-black" : "bg-white text-black"}`}
      >
        For Rent
      </button>
    </div>
              <div
                className={"w-[500px] max-w-[90%] flex flex-col relative rounded-[5px] gap-[1rem] mt-4 items-center"}
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  padding: "0.5rem",
                  minWidth: "300px"
                }}
              >
                <div className={"flex w-full gap-2"}>
                  <input
                    ref={searchInputRef}
                    style={{width: "80%", borderRadius: "5px"}}
                    placeholder={"Search Address, City, or Zip Code"}
                    value={location.address}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                  <PrimaryButton
                    onClick={handleSubmit}
                    ref={searchButtonRef}
                    style={{width: "20%", minWidth: "8rem"}}
                  >
                    Search
                  </PrimaryButton>
                </div>

                {/* <div className="flex flex-row items-center text-[#fff]"> */}
                <Link href={'/list-a-home/for-sale-by-owner'} className="text-lg text-[#fff] text-center px-3 py-2 cursor-pointer flex items-center justify-center">List your home here <IoIosArrowForward className="ml-2" /></Link>
                {/* </div> */}
                <div
                  style={{
                    position: "absolute",
                    top: "3.5rem",
                    left: 0,
                    width: "80%",
                    gap: "0.25rem"
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
            <div id={"results-container"}
                 ref={resultsRef}
                 style={{
                   width: "90%",
                   margin: "1rem",
                   display: "grid",
                   alignItems: "center",
                   gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                   gap: "1rem"
                 }} className="!py-0 !max-h-auto">
              {allBOHomes.length > 0 ? allBOHomes
                  .filter(house => {
                    if (forSell && forRent) return true
                    else if (forRent) return house.price.forRent
                    else if (forSell) return house.price.price !== null
                    else return false
                  })
                  .map((house, index) => <HousePrev key={`${house.address}${index}`}
                                           $isLiked={
                    Array.isArray(savedHomes) && savedHomes.length > 0 && savedHomes.includes(house._id)}
                                           $isFocused={focusedHomeID === house._id}
                                           house={house}
                                           heartClick={(e, id) => heartClick(e, id)}
                                           focus={changeHomeFocus}/>
                )
                : <div style={{
                  borderRadius: "10px",
                  padding: "1rem",
                  backgroundColor: config.colors.red
                }}>
                  <h2 style={{
                    color: "white",
                    textAlign: "center"
                  }}>Sorry, there are no Home For Sale or For Rent By Owner Listed At this time.</h2>
                </div>
              }
            </div>
            <DownloadApp id={"download-app static-mobile-pos"}/></>
        }
        <JoinMWDialog reff={modalRef} onClick={heartClick}/>
      </div>
    </SearchFRBOContainer>)
}
const ListAHomeButton = styled(ForSaleRentButton)`
  background-color: ${config.colors.brandYellow};
    color: ${config.colors.black};
    border-radius: 0;
  
`