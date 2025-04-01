"use client";

import { IoArrowBackSharp } from "react-icons/io5";

export const activeColor = "#F20359";
export const inactiveColor = "#D9D9D9";

export const ListingState = Object.freeze({
  LOCATION: 0,
  PRICE: 1,
  DETAILS: 2,
  PHOTOS: 3,
  REVIEW: 4,
});

export function nextListingState(listingState) {
  switch (listingState) {
    case ListingState.LOCATION:
      return ListingState.PRICE;
    case ListingState.PRICE:
      return ListingState.DETAILS;
    case ListingState.DETAILS:
      return ListingState.PHOTOS;
    case ListingState.PHOTOS:
      return ListingState.REVIEW;
    default:
      return true;
  }
}

export function prevListingState(listingState) {
  switch (listingState) {
    case ListingState.PRICE:
      return ListingState.LOCATION;
    case ListingState.DETAILS:
      return ListingState.PRICE;
    case ListingState.PHOTOS:
      return ListingState.DETAILS;
    case ListingState.REVIEW:
      return ListingState.PHOTOS;
    default:
      return false;
  }
}

export function isRenting() {
  return window.location.pathname.split("/").includes("for-rent-by-owner");
}

export const ListingStateBar = ({ listingState, setListingState }) => {
  return (
    <div className={"fixed w-full pt-6 z-10"}>
      <div
        className={"flex justify-end pe-20 items-center max-w-full pb-4"}
        style={{ backgroundColor: "white" }}
      >
        <Circle active={true} label={"Location"} />
        <Line active={listingState.valueOf() >= 1} />
        <Circle
          active={listingState.valueOf() >= 1}
          label={isRenting() ? "Rental Info" : "Price"}
        />
        <Line active={listingState.valueOf() >= 2} />
        <Circle active={listingState.valueOf() >= 2} label={"Details"} />
        <Line active={listingState.valueOf() >= 3} />
        <Circle active={listingState.valueOf() >= 3} label={"Photos"} />
        <Line active={listingState.valueOf() >= 4} />
        <Circle active={listingState.valueOf() >= 4} label={"Review"} />
      </div>
      <div className="text-mw_black pl-10 flex justify-end pe-20 items-center max-w-full pb-4">
        <button
          onClick={() => setListingState((prev) => prevListingState(prev))}
        >
          <IoArrowBackSharp className="inline-block" />
          <span className="text-sm">Back</span>
        </button>
      </div>
    </div>
  );
};

const Circle = ({ active, label }) => {
  const size = "15px";
  return (
    <div
      style={{
        width: size,
        position: "relative",
        height: size,
        borderRadius: "50%",
        backgroundColor: active ? activeColor : inactiveColor,
      }}
    >
      <span
        style={{
          color: "#000",
          fontFamily: "Roboto",
          fontSize: "12px",
          textWrap: "nowrap",
          position: "absolute",
          backgroundColor: "white",
          transform: "translate(calc(-50% + 7px),15px)",
        }}
      >
        {label}
      </span>
    </div>
  );
};

const Line = ({ active }) => {
  const size = "50px";
  return (
    <div
      style={{
        backgroundColor: active ? activeColor : inactiveColor,
        width: size,
        height: "2px",
      }}
    />
  );
};
