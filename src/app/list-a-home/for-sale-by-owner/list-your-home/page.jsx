"use client";
import AddPhotos from "@/app/list-a-home/common/list-your-home/AddPhotos";
import Details, {
  noYes,
  propertyTypes,
  squareFootageSource,
  squareFootageUnits,
} from "@/app/list-a-home/common/list-your-home/Details";
import {
  isRenting,
  ListingState,
  ListingStateBar,
} from "@/app/list-a-home/common/list-your-home/ListingStateBar";
import Location, {
  countries,
  states,
} from "@/app/list-a-home/common/list-your-home/Location";
import Price from "@/app/list-a-home/common/list-your-home/Price";
import Review from "@/app/list-a-home/common/list-your-home/Review";
import { Container } from "@/app/list-a-home/common/NoHouses";
import { FSBOLayout } from "@/app/list-a-home/for-sale-by-owner/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ListYourHome = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const query = props.searchParams.object;
  let listing = {};
  try {
    listing = JSON.parse(`${query}`);
  } catch (error) {}

  const canInsertHome = ["user", "realtor"].includes(session?.user.userRole);
  if (!canInsertHome) {
    router.push("/login");
  }

  const defaultListing = {
    status: "in_progress",
    general: {
      nickname: "",
      address: "",
      number: "",
      zipcode: "",
      city: "",
      state: states[0],
      country: countries[0],
    },
    contact: {
      email: "",
      phone: "",
      preferred: "email",
    },
    price: {
      forRent: isRenting(),
      price: isRenting() ? null : 0,
      rent: {
        lease: {
          monthlyRent: 0,
          deposit: 0,
          leaseLength: 0,
        },
        discounts: {
          military: false,
          policeFirefighter: false,
          healthcare: false,
          teacher: false,
        },
        pets: {
          allowed: false,
          allowedTypes: [],
          breedRestrictions: false,
          breedRestrictionsDescription: "",
          monthlyPetRent: 0,
          petDeposit: 0,
        },
        utilities: {
          water: false,
          trash: false,
          snowRemoval: false,
          gas: false,
          electric: false,
          lawnCare: false,
          other: false,
        },
      },
      details: {
        stories: 1,
        beds: 0,
        fullBaths: 0,
        smallBaths: 0,
        halfBaths: 0,
        tqBaths: 0,
        squareFootage: 0,
        squareFootageSource: squareFootageSource[0],
        squareFootageUnit: squareFootageUnits[0],
        lotSize: 0,
        typeOfProperty: propertyTypes[0],
        yearBuilt: 0,
        HOA: noYes[0],
        description: "",
        monthlyUtilities: 0,
      },
    },
    association: {
      hoaFee: 0,
      hoaFrequency: "",
      hoaName: "",
      hoaManagementName: "",
      hoaPhoneNumber: 0,
      hoaEmail: "",
      hoaWebpage: "",
    },
    communityAndNearby: {
      clubHouse: false,
      gym: false,
      tennisCourt: false,
      playground: false,
      gatedAccess: false,
      dogPark: false,
      lawnCare: false,
      snowplowing: false,
      pool: false,
      hotTub: false,
      concierge: false,
      utilities: false,
      sewer: false,
      trash: false,
      pestControl: false,
      waterOther: false,
      park: false,
      hikingTrails: false,
      militaryBase: false,
      bikePath: false,
      golfCourse: false,
      dayCare: false,
      schools: false,
    },
    homeAmenities: {
      alarmSystem: false,
      ceilingFans: false,
      elevator: false,
      sauna: false,
      privateLaundry: false,
      sharedLaundry: false,
      washerDryerHook: false,
      balcony: false,
      fendedYard: false,
      sunRoof: false,
      swimmingPool: false,
      hotTubHome: false,
      fireplace: false,
      scenicView: false,
      shed: false,
      storage: false,
      basement: false,
      solarPanels: false,
      inLawOrGuestHouse: false,
      playRoom: false,
      deck: false,
      office: false,
      dinningRoom: false,
      gourmetKitchen: false,
      sittingRoom: false,
    },
    parking: {
      assignedSpaces: false,
      attachedSpaces: false,
      carport: false,
      detachedGarage: false,
      electricCarHookup: false,
      guestParking: false,
      noParking: false,
      offSiteParking: false,
      parkingGarage: false,
      streetParking: false,
      oversizeVehicleParking: false,
      unassignedSpaces: false,
      valet: false,
    },
    utilities: {
      electric: false,
      naturalGas: false,
      propane: false,
      centralAir: false,
      forcedAir: false,
      acNone: false,
      swampCooler: false,
      waterPublic: false,
      waterSpring: false,
      waterSwell: false,
      individualWaterMeter: false,
      waterOther: false,
      septicTank: false,
      sewerSystem: false,
    },
    photos: [],
  };

  const [listingState, setListingState] = useState(ListingState.LOCATION);
  const [listingData, setListingData] = useState(
    listing
      ? {
          ...defaultListing,
          ...listing,
          listingId: listing._id,
        }
      : { ...defaultListing }
  );

  return (
    <FSBOLayout
      route={`Sell > For ${
        isRenting() ? "Rent" : "Sale"
      } by Owner > List your home`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
				.hide {
					display: none;
				}
				.red-border {
					border-color: #ff0000 !important;
					border-width: 2px;
				}
    `,
        }}
      ></style>
      <ListingStateBar
        listingState={listingState}
        setListingState={setListingState}
      />
      <Container
        style={{
          backgroundColor: "white",
          width: "100%",
          padding: "6rem 10% 2rem",
          color: "#000",
        }}
      >
        {listingState === false && router.push("/list-a-home/for-sale-by-owner")}
        {listingState === ListingState.LOCATION && (
          <Location
            data={listingData}
            setListingData={setListingData}
            setListingState={setListingState}
          />
        )}
        {listingState === ListingState.PRICE && (
          <Price
            data={listingData}
            setListingState={setListingState}
            setListingData={setListingData}
          />
        )}
        {listingState === ListingState.DETAILS && (
          <Details
            data={listingData}
            setListingState={setListingState}
            setListingData={setListingData}
          />
        )}
        {listingState === ListingState.PHOTOS && (
          <AddPhotos
            data={listingData}
            setListingState={setListingState}
            setListingData={setListingData}
          />
        )}
        {listingState === ListingState.REVIEW && (
          <Review
            data={listingData}
            setListingState={setListingState}
            setListingData={setListingData}
          />
        )}
      </Container>
    </FSBOLayout>
  );
};

export default ListYourHome;
