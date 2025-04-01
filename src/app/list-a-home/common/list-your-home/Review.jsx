"use client";
import { BottomNavigationBar } from "@/app/list-a-home/common/BottomNavigationBar";
import { BreakLine } from "@/app/list-a-home/common/BreakLine";
import AddPhotos from "@/app/list-a-home/common/list-your-home/AddPhotos";
import Details, { noYes } from "@/app/list-a-home/common/list-your-home/Details";
import Location from "@/app/list-a-home/common/list-your-home/Location";
import Price from "@/app/list-a-home/common/list-your-home/Price";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";

const Review = ({ setListingState, data, setListingData }) => {
  const [canSubmit, setCanSubmit] = useState(true);
  return (
    <div>
      <h2>Review</h2>
      <ReviewSection
        title={sections.general.title}
        data={data}
        setCanSubmit={setCanSubmit}
        editSection={
          <Location
            data={data}
            editSection={editEnum.GENERAL}
            setListingState={setListingState}
            setListingData={setListingData}
          />
        }
      />
      <ReviewSection
        title={sections.contact.title}
        data={data}
        setCanSubmit={setCanSubmit}
        editSection={
          <Location
            data={data}
            editSection={editEnum.CONTACT}
            setListingState={setListingState}
            setListingData={setListingData}
          />
        }
      />
      <ReviewSection
        title={sections.price.title}
        data={data}
        setCanSubmit={setCanSubmit}
        editSection={
          <div>
            <Price
              data={data}
              setListingState={setListingState}
              setListingData={setListingData}
              editSection={editEnum.PRICE}
            />
            <Details
              data={data}
              setListingData={setListingData}
              setListingState={setListingData}
              editSection={editEnum.PRICE}
            />
          </div>
        }
      />
      <ReviewSection
        title={sections.association.title}
        data={data}
        stopRender={data.price.details.HOA === noYes[0]}
        editSection={
          <Details
            data={data}
            setListingState={setListingState}
            setListingData={setListingData}
            editSection={editEnum.ASSOCIATION}
          />
        }
      />
      <ReviewSection
        title={sections.communityAndNearby.title}
        data={data}
        onlyCheckboxes={true}
        editSection={
          <Details
            data={data}
            setListingState={setListingState}
            setListingData={setListingData}
            editSection={editEnum.COMMUNITY_AND_NEARBY}
          />
        }
      />
      <ReviewSection
        title={sections.homeAmenities.title}
        data={data}
        onlyCheckboxes={true}
        editSection={
          <Details
            data={data}
            setListingState={setListingState}
            setListingData={setListingData}
            editSection={editEnum.HOME_AMENITIES}
          />
        }
      />
      <ReviewSection
        title={sections.parking.title}
        data={data}
        onlyCheckboxes={true}
        editSection={
          <Details
            data={data}
            setListingState={setListingState}
            setListingData={setListingData}
            editSection={editEnum.PARKING}
          />
        }
      />
      <ReviewSection
        title={sections.utilities.title}
        data={data}
        onlyCheckboxes={true}
        editSection={
          <Details
            data={data}
            setListingState={setListingState}
            setListingData={setListingData}
            editSection={editEnum.UTILITIES}
          />
        }
      />
      <ReviewSection
        title={sections.photos.title}
        data={data}
        onlyCheckboxes={false}
        editSection={
          <AddPhotos
            data={data}
            setListingState={setListingState}
            setListingData={setListingData}
            editSection={editEnum.PHOTOS}
          />
        }
      />
      <BottomNavigationBar
        setListingState={setListingState}
        submit={true}
        data={data}
        canSubmit={canSubmit}
        setListingData={setListingData}
      />
    </div>
  );
};

function checkRequiredValues(data) {
  let canSubmit = true;
  let flattenData = flatten(data);
  const flattenSection = flatten(sections);
  const invalidValues = [undefined, null, 0, "", "0", "$", "$0", "$ 0"];
  Object.keys(flattenSection).forEach((key) => {
    if (
      requiredFields.includes(flattenSection[key]) &&
      invalidValues.includes(flattenData[key])
    ) {
      canSubmit = false;
    }
  });
  const hasValidSellPrice = !invalidValues.includes(flattenData.price);
  if (canSubmit) canSubmit = flattenData.forRent || hasValidSellPrice;
  return canSubmit;
}

function getLabelForProperty(section, label) {
  return sections[section].labels[label];
}

const ReviewSection = ({
  title,
  data,
  onlyCheckboxes,
  stopRender,
  editSection,
  setCanSubmit,
}) => {
  const propertyName = Object.keys(sections).find(
    (key) => sections[key].title === title,
  );
  const propertyData = data[propertyName];
  const [isEditing, setIsEditing] = useState(false);
  const isPriceSection = title === sections.price.title;
  const arePictures = title === sections.photos.title;
  const canRenderCheckbox =
    onlyCheckboxes &&
    Object.keys(propertyData).filter(
      (property) => propertyData[property] === true,
    ).length > 0;
  if (setCanSubmit) setCanSubmit(checkRequiredValues(data));
  if ((canRenderCheckbox || !onlyCheckboxes) && !stopRender)
    return (
      <div className={"flex flex-col justify-center items-center lg:px-16 md:px-8"}>
        <div className={"flex justify-between pb-3 w-full"}>
          <h3>{title}</h3>
          <span
            className={"flex items-center cursor-pointer justify-between"}
            onClick={() => setIsEditing(!isEditing)}
          >
            <h5>Edit</h5>
            <FiEdit className={"ml-2"} />
          </span>
        </div>
        <div className={"grid lg:grid-cols-3 relative w-full gap-3 lg:gap-0"}>
          {!isEditing &&
            !onlyCheckboxes &&
            !isPriceSection &&
            !arePictures &&
            Object.keys(propertyData).map((key) => {
              const label = getLabelForProperty(propertyName, key);
              const value = propertyData[key];
              if (propertyData.preferred === "email") {
                requiredFields = requiredFields.filter(
                  (requiredField) =>
                    requiredField !== sections.contact.labels.phone,
                );
                requiredFields = [
                  ...requiredFields,
                  sections.contact.labels.email,
                ];
              }
              if (propertyData.preferred === "phone") {
                requiredFields = requiredFields.filter(
                  (requiredField) =>
                    requiredField !== sections.contact.labels.email,
                );
                requiredFields = [
                  ...requiredFields,
                  sections.contact.labels.phone,
                ];
              }
              const isRequired = requiredFields.includes(label);
              return (
                <SpanLabelValue
                  key={propertyName + key}
                  label={label}
                  value={value}
                  required={isRequired}
                />
              );
            })}
          {!isEditing &&
            onlyCheckboxes &&
            !isPriceSection &&
            !arePictures &&
            Object.keys(propertyData).filter(
              (key) => propertyData[key] === true,
            ).length > 0 &&
            Object.keys(propertyData).map(
              (key) =>
                propertyData[key] && (
                  <span key={propertyName + key}>
                    {getLabelForProperty(propertyName, key)}
                  </span>
                ),
            )}
        </div>
        {!isEditing &&
          isPriceSection &&
          !arePictures &&
          propertyData.price !== null && (
            <>
              <h4>
                {" "}
                {sections.price.sellLabel}:{" "}
                {propertyData.price ? (
                  `$ ${propertyData.price.toLocaleString()}`
                ) : (
                  <span
                    style={{
                      color: "red",
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                    }}
                  >
                    &nbsp;REQUIRED
                  </span>
                )}
              </h4>
            </>
          )}
        {!isEditing && isPriceSection && !arePictures && (
          <>
            <h5>Details</h5>
            <div
              className={
                "grid lg:lg:grid-cols-3 w-full gap-3 lg:gap-0 gap-3 lg:gap-0"
              }
            >
              {Object.keys(sections.price.labels).map((key) => {
                const label = sections.price.labels[key];
                const value = propertyData.details[key];
                if (propertyData.forRent)
                  requiredFields = [
                    ...requiredFields,
                    sections.price.rent.lease.deposit,
                    sections.price.rent.lease.leaseLength,
                    sections.price.rent.lease.monthlyRent,
                  ];
                else
                  requiredFields = requiredFields.filter(
                    (field) =>
                      ![
                        sections.price.rent.lease.deposit,
                        sections.price.rent.lease.leaseLength,
                        sections.price.rent.lease.monthlyRent,
                      ].includes(field),
                  );
                if (propertyData.price === null) {
                  requiredFields = requiredFields.filter(
                    (label) => label !== sections.price.sellLabel,
                  );
                }
                const required = requiredFields.includes(label);
                return (
                  <SpanLabelValue
                    key={"details" + key}
                    required={required}
                    label={label}
                    value={value}
                    attach={
                      sections.price.labels[key] ===
                        sections.price.labels.squareFootage &&
                      value > 0 && (
                        <span>
                          {propertyData.details.squareFootageUnit} (
                          {propertyData.details.squareFootageSource})
                        </span>
                      )
                    }
                  ></SpanLabelValue>
                );
              })}
            </div>
            {propertyData.forRent && (
              <>
                <h4>{sections.price.rentTitle}</h4>
                <div className={"grid lg:grid-cols-3 w-full gap-3 lg:gap-0"}>
                  <div className={"my-8"}>
                    <h4>Lease</h4>
                    {Object.keys(sections.price.rent.lease).map((key) => {
                      const label = sections.price.rent.lease[key];
                      const required = requiredFields.includes(label);
                      const value = propertyData.rent.lease[key];
                      return (
                        <p key={"detailsRentLease" + key}>
                          <SpanLabelValue
                            required={required}
                            label={label}
                            value={value}
                            attach={
                              sections.price.labels[key] ===
                                sections.price.labels.squareFootage &&
                              value > 0 && (
                                <span>
                                  {propertyData.details.squareFootageUnit} (
                                  {propertyData.details.squareFootageSource})
                                </span>
                              )
                            }
                          ></SpanLabelValue>
                        </p>
                      );
                    })}
                  </div>
                  <div className={"my-8"}>
                    <h4>Pets</h4>
                    {Object.keys(sections.price.rent.pets).map((key) => {
                      const label = sections.price.rent.pets[key];
                      const required = requiredFields.includes(label);
                      const value = propertyData.rent.pets[key];
                      return (
                        <p key={"detailsRentPets" + key}>
                          <SpanLabelValue
                            required={required}
                            label={label ? label : "Breed Restrictions"}
                            value={
                              label === sections.price.rent.pets.allowedTypes
                                ? value.join(" ")
                                : value
                            }
                            attach={
                              sections.price.labels[key] ===
                                sections.price.labels.squareFootage &&
                              value > 0 && (
                                <span>
                                  {propertyData.details.squareFootageUnit} (
                                  {propertyData.details.squareFootageSource})
                                </span>
                              )
                            }
                          ></SpanLabelValue>
                        </p>
                      );
                    })}
                  </div>
                  <div className={"my-8"}>
                    <h4>Discounts</h4>
                    {Object.keys(sections.price.rent.discounts)
                      .filter(
                        (key) => propertyData.rent.discounts[key] === true,
                      )
                      .map(
                        (key, index) =>
                          propertyData.rent.discounts[key] && (
                            <span key={"detailsRentDiscounts" + key}>
                              {index !== 0 && " - "}
                              {sections.price.rent.discounts[key]}
                            </span>
                          ),
                      )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
        {!isEditing && arePictures && (
          <div
            className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-2"}
          >
            {propertyData.map((pic, index) => (
              <div className={'relative my-2'} key={"details" + index}>
                <img
                  alt={"photo-" + index}
                  src={pic}
                  className={"object-cover"}
                  style={{ aspectRatio: 1, width: "100%" }}
                />
                {index === 0 && (
                  <span
                    className={"absolute bg-white font-bold px-2 bottom-0"}
                    style={{ fontFamily: "Roboto" }}
                  >
                    {sections.photos.labels.primaryPhoto}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        {isEditing && editSection}
        <BreakLine className={"w-full"} style={{ width: "110%" }} />
      </div>
    );
  else if (isEditing) return editSection;
};

export const sections = {
  general: {
    title: "Home Details",
    labels: {
      nickname: "Nickname",
      address: "Address",
      number: "apt/suite/number",
      zipcode: "Zip code",
      city: "City",
      state: "State",
      country: "Country",
    },
  },
  contact: {
    title: "Contact Details",
    labels: {
      email: "Email",
      phone: "Phone Number",
      preferred: "Contact preference",
    },
  },
  price: {
    title: "Price",
    sellLabel: "Price Sale",
    rentTitle: "Rent Details",
    rent: {
      lease: {
        monthlyRent: "Monthly Rent",
        deposit: "Deposit",
        leaseLength: "Lease Length",
      },
      discounts: {
        military: "Military",
        policeFirefighter: "Police / FireFighter",
        healthcare: "EMS / Healthcare",
        teacher: "Teacher",
      },
      pets: {
        // INFO: conditional rendering if there are pet allowed
        allowedTypes: "Allowed types",
        breedRestrictionsDescription: "",
        monthlyPetRent: "Monthly Pet Rent",
        petDeposit: "Pet Deposit",
      },
    },
    labels: {
      // price: "Price",
      // INFO: this is part of details
      beds: "Beds",
      fullBaths: "Full Bathrooms",
      smallBaths: "Small Bathrooms",
      halfBaths: "Half Bathrooms",
      tqBaths: "3/4 Bathrooms",
      squareFootage: "Area",
      // squareFootageSource: "",
      // squareFootageUnit: "",
      lotSize: "Lot Size",
      typeOfProperty: "Type of Property",
      yearBuilt: "Year Built",
      HOA: "HOA",
      description: "Description",
      monthlyUtilities: "Monthly AVG Utilities Cost",
    },
  },
  association: {
    title: "HOA Details",
    labels: {
      hoaFee: "Fee",
      hoaFrequency: "Frequency",
      hoaName: "HOA",
      hoaManagementName: "Manager",
      hoaPhoneNumber: "Contact Phone Number",
      hoaEmail: "HOA Email",
      hoaWebpage: "Webpage",
    },
  },
  communityAndNearby: {
    title: "Community Information",
    labels: {
      clubHouse: "Club House",
      gym: "Gym",
      tennisCourt: "Tennis Court",
      playground: "Playground",
      gatedAccess: "Gated Access",
      dogPark: "Dog Park",
      lawnCare: "Lawn Care",
      snowplowing: "Snow Plowing",
      pool: "Pool",
      hotTub: "Hot Tub",
      concierge: "Concierge",
      utilities: "Utilities",
      sewer: "Sewer",
      trash: "Trash",
      pestControl: "Pest Control",
      waterOther: "Water - Other",
      park: "Park",
      hikingTrails: "Hiking Trails",
      militaryBase: "Military Base",
      bikePath: "Bike Path",
      golfCourse: "Golf Course",
      dayCare: "Day Care",
      schools: "Schools",
    },
  },
  homeAmenities: {
    title: "Home Amenities",
    labels: {
      alarmSystem: "Alarm System",
      ceilingFans: "Ceiling Fans",
      elevator: "Elevator",
      sauna: "Sauna",
      privateLaundry: "Private Laundry",
      sharedLaundry: "Shared Laundry",
      washerDryerHook: "Washer Dryer hookups",
      balcony: "Balcony",
      fendedYard: "Fended Yard",
      sunRoof: "Sun Roof",
      swimmingPool: "Swimming Pool",
      hotTubHome: "Hot Tub",
      fireplace: "Fireplace",
      scenicView: "Scenic View",
      shed: "Shed",
      storage: "Storage",
      basement: "Basement",
      solarPanels: "Solar Panels",
    },
  },
  parking: {
    title: "Parking Information",
    labels: {
      assignedSpaces: "Assigned Spaces",
      attachedSpaces: "Attached Spaces",
      carport: "Car Port",
      detachedGarage: "Detached Garage",
      electricCarHookup: "Electric Car HookUp",
      guestParking: "Guest Parking",
      noParking: "No Parking",
      offSiteParking: "Off-Site Parking",
      parkingGarage: "Parking Garage",
      streetParking: "Street Parking",
      oversizeVehicleParking: "Oversize Vehicle Parking",
      unassignedSpaces: "Unassigned Spaces",
      valet: "Valet",
    },
  },
  utilities: {
    title: "Utilities",
    labels: {
      electric: "Electric",
      naturalGas: "Natural Gas",
      propane: "Propane",
      centralAir: "Central Air",
      forcedAir: "Forced Air",
      acNone: "A/C None",
      swampCooler: "Swamp Cooler",
      waterPublic: "Water Public",
      waterSpring: "Water Spring",
      waterSwell: "Water Smell",
      individualWaterMeter: "Individual Water Meter",
      waterOther: "Water - Other",
      septicTank: "Septic Tank",
      sewerSystem: "Sewer System",
    },
  },
  photos: {
    title: "Your Photos",
    labels: {
      primaryPhoto: "Primary Photo",
    },
  },
};

const isMoneyValue = [
  sections.price.labels.monthlyUtilities,
  sections.price.sellLabel,
  sections.price.rent.lease.monthlyRent,
  sections.price.rent.lease.deposit,
  sections.price.rent.pets.petDeposit,
  sections.price.rent.pets.monthlyPetRent,
  sections.association.labels.hoaFee,
];

let requiredFields = [
  sections.general.labels.nickname,
  sections.general.labels.address,
  sections.general.labels.zipcode,
  sections.general.labels.city,
  sections.general.labels.state,
  sections.general.labels.country,
  sections.contact.labels.preferred,
  sections.price.labels.squareFootage,
  sections.price.labels.yearBuilt,
  sections.price.labels.description,
];
export default Review;

const SpanLabelValue = (props) => {
  const isMoney = isMoneyValue.includes(props.label);
  const requiredStyle = props.value
    ? {}
    : { color: "red", fontWeight: "bold", fontSize: "0.9rem" };
  if (props.required || props.value)
    return (
      <span>
        ○<span className={"font-bold mx-2"}>{props.label}:</span>
        <span style={requiredStyle}>
          {isMoney && "$ "}
          {isMoney ? props.value.toLocaleString() : props.value || "REQUIRED"}
          {props.attach}
        </span>
      </span>
    );
};

export const editEnum = Object.freeze({
  GENERAL: 1,
  CONTACT: 2,
  PRICE: 3,
  ASSOCIATION: 4,
  COMMUNITY_AND_NEARBY: 5,
  HOME_AMENITIES: 6,
  PARKING: 7,
  UTILITIES: 8,
  PHOTOS: 9,
});

function flatten(obj) {
  if (obj === null) return {};
  const result = {};
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === "object") {
      const nested = flatten(obj[key]);
      for (const nestedKey of Object.keys(nested)) {
        result[nestedKey] = nested[nestedKey];
      }
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
