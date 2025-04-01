import {
  addressConverter,
  detailsConverter,
} from "@/app/list-a-home/common/OptionComponent";
import useHomeResultsStore from "@/app/list-a-home/search/results/homeResultsStore";
import { PrimaryButton } from "@/app/usignup/button";
import { config } from "@/app/usignup/config";
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { LuMoveHorizontal, LuMoveVertical } from "react-icons/lu";
import styled from "styled-components";

export function HousesSideBar(props) {
  const useStore = useHomeResultsStore();
  const [expanded, setExpanded] = useState(true);
  return (
    <HouseSideBarContainer
      id={props.id} //style={{width: expanded ? "30%" : "1rem"}}
      style={{
        display: props.houses && props.houses.length > 0 ? "block" : "none",
      }}
    >
      <ShowHideDiv
        $expanded={expanded}
        map={props.map}
        onClick={() => {
          setExpanded(!expanded);
          props.map.current.resize();
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 500px))",
          gap: "1rem",
        }}
      >
        {props.houses?.map((house, index) => {
          const houseCenter = [
            house.location.coordinates.lng,
            house.location.coordinates.lat,
          ];
          // DEBT: should check for the listing id, because the location precision maybe will be not enough in the future
          const precision = 3;
          const isCentered =
            props.center[0].toFixed(precision) ===
              houseCenter[0].toFixed(precision) &&
            props.center[1].toFixed(precision) ===
              houseCenter[1].toFixed(precision);
          const forSale =
            house.price.forRent && house.price.price !== 0
              ? "For sale / rent"
              : house.price.forRent
                ? "For rent"
                : "For sale";
          return (
            <div
              id={index}
              className={`border-4 ${isCentered ? "border-mw_olive" : "border-mw_dark_gray"}
               rounded-lg shadow p-2 m-2 cursor-pointer hover:border-mw_olive md:ms-[1.5rem] md:mt-0 sm:mt-[1.5rem] sm:ms-0`}
              key={house._id}
              style={{
                display: expanded ? "inherit" : "none",
                minWidth:
                  window.innerWidth > window.innerHeight ? "300px" : "100%",
              }}
              onClick={() => props.focusHouse(house)}
              onKeyDown={(e) => e.key === "Enter" && props.focusHouse(house)}
            >
              <div
                style={{
                  aspectRatio: "3 / 2",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  backgroundImage: house.photos[0] && `url(${house.photos[0]})`,
                  backgroundColor: "rgba(231, 231, 231, 1)",
                  borderRadius: "5px",
                  position: "relative",
                }}
              >
                {isCentered && (
                  <PrimaryButton
                    onClick={() => useStore.changeHouseDetails(house)}
                  >
                    Details
                  </PrimaryButton>
                )}
                <span
                  style={{
                    position: "absolute",
                    borderRadius: "10px",
                    background: `${config.colors.background}ab`,
                    padding: "0.15rem 0.35rem",
                    fontWeight: "500",
                    color: config.colors.black,
                    bottom: "0.25rem",
                    right: "0.25rem",
                  }}
                >
                  {house.propertyStatus}
                </span>
              </div>
              <h2>{`${house.general.nickname} - ${forSale}`}</h2>
              <h3>{detailsConverter(house)}</h3>
              <h4>{addressConverter(house)}</h4>
            </div>
          );
        })}
      </div>
    </HouseSideBarContainer>
  );
}

function ShowHideDiv(props) {
  const [portrait, setPortrait] = useState(false);
  const [innerWindow, setInnerWindow] = useState({ height: 0, width: 0 });
  useEffect(() => {
    setInnerWindow({ height: window.innerHeight, width: window.innerWidth });
    setPortrait(window.innerHeight > window.innerWidth);
  }, []);
  // const barWidth = "1rem";
  // useEffect(() => {
  //   smallRef.current = window.innerHeight < 1000;
  //   const expanded = smallRef.current === true ? 0.25 : 0;
  //   const shrink = smallRef.current === true ? 0.75 : 0.5;
  //   setRotation(props.$expanded ? expanded : shrink);
  // }, [props.$expanded]);
  // function handleClick() {
  //   const mapContainer = document.querySelector("#map-container");
  //   const resultContainer = document.querySelector("#houses-side-bar");
  //   // console.log(mapContainer);
  //   // console.log(resultContainer);
  //   if (props.$expanded) {
  //     mapContainer.classList.add("expanded");
  //     resultContainer.classList.add("shrunk");
  //   } else {
  //     mapContainer.classList.remove("expanded");
  //     resultContainer.classList.remove("shrunk");
  //   }
  //   props.onClick();
  // }
  const isDragging = useRef(false);
  const start = useRef(0);
  const [currentSize, setCurrentSize] = useState();
  const minSize = 18;
  const handleMouseMove = (e) => {
    const mapContainer = document.querySelector("div#map-container");
    const resultsContainer = document.querySelector("div#houses-side-bar");
    if (!isDragging) return;

    if (portrait && resultsContainer && mapContainer) {
      const delta = e.clientY - start.current;
      const newHeight = Math.max(
        minSize,
        Math.min(currentSize - delta, innerWindow.height),
      );
      const mapHeight = innerWindow.height - newHeight;
      resultsContainer.style.height = `${newHeight}px`;
      mapContainer.style.height = `${mapHeight}px`;
    } else if (!portrait && resultsContainer && mapContainer) {
      const delta = e.clientX - start.current;
      const newWidth = Math.max(
        minSize,
        Math.min(currentSize - delta, innerWindow.width),
      );
      const mapWidth = innerWindow.width - newWidth;
      resultsContainer.style.width = `${newWidth}px`;
      mapContainer.style.width = `${mapWidth}px`;
    }
    // if (props.map?.current) props.map.current.resize();
  };
  const handleMouseUp = (e) => {
    const resultsContainer = document.querySelector("div#houses-side-bar");
    if (props.map) {
      props.map.current.resize();
    }
    isDragging.current = false;

    if (portrait && resultsContainer) {
      // should be dragged on the Y axis
      start.current = e.clientY;
      setCurrentSize(resultsContainer.offsetHeight);
    } else if (!portrait && resultsContainer) {
      // should be dragged on the X axis
      start.current = e.clientX;
      setCurrentSize(resultsContainer.offsetWidth);
    }
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const handleMouseDown = (e) => {
    const resultsContainer = document.querySelector("div#houses-side-bar");
    isDragging.current = true;

    if (portrait && resultsContainer) {
      start.current = e.clientY;
      setCurrentSize(resultsContainer.offsetHeight);
    } else if (!portrait && resultsContainer) {
      start.current = e.clientX;
      setCurrentSize(resultsContainer.offsetWidth);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      className={"sm:w-full sm:h-[1rem] md:w-[1rem] md:h-full"}
      style={{
        position: "fixed",
        backgroundColor: config.colors.primary,
        zIndex: 1,
        cursor: "e-resize",
      }}
      // onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      <IconContext.Provider
        value={{
          color: config.colors.brandYellow,
          size: "1.5rem",
          style: {
            borderRadius: "50%",
            position: "absolute",
            top: 0,
            left: 0,
            translate: portrait ? "0 -0.25rem" : "-0.25rem 0",
            padding: "0.25rem",
            backgroundColor: config.colors.primary,
          },
        }}
      >
        {portrait ? <LuMoveVertical /> : <LuMoveHorizontal />}
      </IconContext.Provider>
    </div>
  );
}

export const SearchResultContainer = styled.main`
  width: 100vw;
  position: relative;
  height: calc(100vh - 4rem);
  padding: 4rem 0 0 0;
  display: flex;
  flex-direction: row;

  .mapboxgl-canary,
  .mapboxgl-control-container {
    display: none;
  }

  div#map-container,
  div#houses-side-bar {
    height: 100%;
  }

  div#map-container {
    width: 100%;
  }

  // div#map-container.expanded {
  //   width: 100%;
  // }

  div#houses-side-bar {
    width: 500px;
  }

  // div#houses-side-bar.shrunk {
  //   width: 1rem;
  // }

  @media only screen and (max-width: 850px) {
    flex-direction: column;
    padding: 4rem 0 0 0;
    div#houses-side-bar,
    div#map-container {
      height: 50%;
      width: 100%;
    }

    // div#map-container.expanded {
    //   height: 100%;
    // }
    // div#houses-side-bar.shrunk {
    //   height: 1rem;
    // }
    div#map-container {
    }
  }

  overflow: hidden;
`;
const HouseSideBarContainer = styled.div`
  //display: flex;
  overflow-y: scroll;
  position: relative;
`;
