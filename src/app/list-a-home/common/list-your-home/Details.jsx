"use client";

import { BottomNavigationBar } from "@/app/list-a-home/common/BottomNavigationBar";
import { BreakLine } from "@/app/list-a-home/common/BreakLine";
import {
  RequiredContainer,
  RequiredField,
} from "@/app/list-a-home/common/list-your-home/Location";
import { MiniContainer } from "@/app/list-a-home/common/list-your-home/Price";
import { editEnum } from "@/app/list-a-home/common/list-your-home/Review";
import { ToolTipParagraph } from "@/app/list-a-home/common/no-houses/RightForYou";
import {
  ensureDecimalInEvent,
  ensureNumberInEvent,
} from "@/app/list-a-home/common/validators";
import { useState } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

export const defaultNumberList = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
export const defaultStoriesList=[1,2,3,4,5,6]
export const propertyTypes = [
  "Single family",
  "Townhouse",
  "Condo",
  "Mobile home",
  "Apartment",
  "Studio",
  "Room for rent",
  "Land",
];
export const squareFootageSource = [
  "Self measured",
  "Tax records",
  "Blueprints",
];
export const squareFootageUnits = ["ft²", "m²"];
export const noYes = ["No", "Yes"];

const Details = ({ setListingState, setListingData, data, editSection }) => {
  function changeTextField(e, propertyValue, isHOA) {
    const newData = { ...data };
    if (isHOA) {
      newData.association[propertyValue] = e.target.value;
    } else {
      newData.price.details[propertyValue] = e.target.value;
    }
    setListingData(newData);
  }

  function changeCheckbox(e, parent, propertyValue) {
    let checked = e.target.checked;
    let newData = { ...data };
    let propertyName = Object.keys(checkbox).find(
      (key) => checkbox[key] === propertyValue,
    );
    newData[parent][propertyName] = checked;
    setListingData(newData);
  }

  function editStyle(edit) {
    if (edit !== editSection && editSection)
      return {
        display: "none",
      };
    else return {};
  }

  return (
    <div>
      <ExpandDiv
        title={"Home Details*"}
        style={editStyle(editEnum.PRICE)}
        editMode={editSection === editEnum.PRICE}
        expanded={true}
      >
        <div className={"lg:grid lg:grid-cols-2 flex flex-col"}>
          <div>
            {/*INFO left column*/}
            <div className={"flex"}>
              <Select
                onChange={(e) => changeTextField(e, "stories")}
                title={"Stories"}
                value={Number(data.price.details.stories)}
                options={defaultStoriesList}
              />

              <Select
                onChange={(e) => changeTextField(e, "beds")}
                title={"Beds"}
                value={Number(data.price.details.beds)}
                options={defaultNumberList}
              />
            </div>
            <div className={"flex"}>
              <Select
                value={Number(data.price.details.fullBaths)}
                onChange={(e) => changeTextField(e, "fullBaths")}
                title={"Full baths"}
                options={defaultNumberList}
              />
              <Select
                value={Number(data.price.details.tqBaths)}
                onChange={(e) => changeTextField(e, "tqBaths")}
                title={"3/4 baths"}
                options={defaultNumberList}
              />
            </div>
            <div className={"flex"}>
              <Select
                value={Number(data.price.details.halfBaths)}
                onChange={(e) => changeTextField(e, "halfBaths")}
                title={"1/2 baths"}
                options={defaultNumberList}
              />
              <Select
                value={Number(data.price.details.smallBaths)}
                onChange={(e) => changeTextField(e, "smallBaths")}
                title={"1/4 baths"}
                options={defaultNumberList}
                help={<BathHelper />}
              />
            </div>
            <TextField
              className={'[&>div>small]:translate-y-0 lg:[&>div>small]:translate-y-[3rem]'}
              title={"Square footage"}
              required={true}
              type={"text"}
              value={
                data.price.details.squareFootage
                  ? Number(data.price.details.squareFootage).toLocaleString()
                  : ""
              }
              onChange={(e) => {
                changeTextField(ensureNumberInEvent(e), "squareFootage");
              }}
              textClass={"w-48"}
            />
            <div className={"flex"}>
              <Select
                value={data.price.details.squareFootageSource}
                onChange={(e) => changeTextField(e, "squareFootageSource")}
                title={"Square footage source"}
                options={squareFootageSource}
              />
            </div>
          </div>
          <div className={"flex flex-col"}>
            {/*INFO right column*/}
            <Select
              value={data.price.details.typeOfProperty}
              onChange={(e) => changeTextField(e, "typeOfProperty")}
              title={"Type of Property"}
              options={propertyTypes}
            />
            <TextField
              title={"Year Built"}
              type={"text"}
              className={'[&>div>small]:translate-y-0 lg:[&>div>small]:translate-y-[3rem]'}
              required={true}
              value={
                data.price.details.yearBuilt
                  ? Number(data.price.details.yearBuilt)
                  : ""
              }
              onChange={(e) =>
                changeTextField(ensureNumberInEvent(e), "yearBuilt")
              }
            />
            <Select
              value={data.price.details.HOA}
              onChange={(e) => changeTextField(e, 'HOA')}
              title={"HOA"}
              options={noYes}
            />
            <TextField
              title={"Lot size"}
              type={"text"}
              value={
                data.price.details.lotSize === "0"
                  ? ""
                  : data.price.details.lotSize
              }
              onChange={(e) =>
                changeTextField(ensureDecimalInEvent(e), "lotSize")
              }
            />
            <Select
              value={data.price.details.squareFootageUnit}
              onChange={(e) => changeTextField(e, "squareFootageUnit")}
              title={"Unit"}
              options={squareFootageUnits}
            />
          </div>
        </div>
        <TextInputCounter
          value={data.price.details.description}
          onChange={(e) => changeTextField(e, "description")}
        />
      </ExpandDiv>
      <ExpandDiv
        title={"Association"}
        style={editStyle(editEnum.ASSOCIATION)}
        editMode={editSection === editEnum.ASSOCIATION}
      >
        <div className={"lg:grid lg:grid-cols-3 flex flex-col"}>
          <TextField
            value={data.association.hoaName}
            onChange={(e) => changeTextField(e, "hoaName", true)}
            title={"HOA name"}
          />
          <TextField
            value={`$ ${data.association.hoaFee.toLocaleString()}`}
            onChange={(e) => {
              let newE = { ...e };
              newE.target.value = e.target.value.replace(/[^0-9]/g, "");
              changeTextField(newE, "hoaFee", true);
            }}
            title={"HOA fee"}
            type={"text"}
          />
          <Select
            options={["Monthly", "Quarterly", "Annually"]}
            title={"HOA frequency"}
            onChange={(e) => changeTextField(e, "hoaFrequency", true)}
          />
          <TextField
            value={data.association.hoaManagementName}
            onChange={(e) => changeTextField(e, "hoaManagementName", true)}
            title={"HOA management name"}
          />
          <TextField
            value={data.association.hoaPhoneNumber}
            onChange={(e) => changeTextField(e, "hoaPhoneNumber", true)}
            title={"HOA phone number"}
            type={"text"}
            inputMode={"decimal"}
          />
          <TextField
            value={data.association.hoaEmail}
            onChange={(e) => changeTextField(e, "hoaEmail", true)}
            title={"HOA email"}
            type={"email"}
            inputMode={"email"}
          />
          <TextField
            value={data.association.hoaWebpage}
            onChange={(e) => changeTextField(e, "hoaWebpage", true)}
            title={"HOA webpage"}
          />
        </div>
      </ExpandDiv>
      <ExpandDiv
        title={"Community and Nearby"}
        style={editStyle(editEnum.COMMUNITY_AND_NEARBY)}
        editMode={editSection === editEnum.COMMUNITY_AND_NEARBY}
      >
        <CheckBoxes
          dataBox={data.communityAndNearby}
          parent={"communityAndNearby"}
          changeCheckbox={changeCheckbox}
          checkboxes={[
            checkbox.clubHouse,
            checkbox.tennisCourt,
            checkbox.playground,
            checkbox.gatedAccess,
            checkbox.lawnCare,
            checkbox.snowplowing,
            checkbox.pool,
            checkbox.hotTub,
            checkbox.concierge,
            checkbox.utilities,
            checkbox.sewer,
            checkbox.trash,
            checkbox.pestControl,
            checkbox.waterOther,
            checkbox.park,
            checkbox.hikingTrails,
            checkbox.militaryBase,
            checkbox.bikePath,
            checkbox.gym,
            checkbox.dogPark,
            checkbox.golfCourse,
            checkbox.dayCare,
            checkbox.schools, // 'Club House', 'Tennis court', 'Playground', 'Gated access', 'Lawn care', 'Snowplowing', 'Pool', 'Hot tub', 'Concierge', 'Utilities', 'Sewer', 'Trash', 'Pest control', 'Water other', 'Park', 'Hiking trails', 'Military base', 'Bike path', 'Gym', 'Dog park', 'Golf course', 'Day care', 'Schools'
          ]}
        />
      </ExpandDiv>
      <ExpandDiv
        title={"Home Amenities"}
        style={editStyle(editEnum.HOME_AMENITIES)}
        editMode={editSection === editEnum.HOME_AMENITIES}
      >
        <CheckBoxes
          dataBox={data.homeAmenities}
          parent={"homeAmenities"}
          changeCheckbox={changeCheckbox}
          checkboxes={[
            checkbox.alarmSystem,
            checkbox.ceilingFans,
            checkbox.elevator,
            checkbox.sauna,
            checkbox.privateLaundry,
            checkbox.sharedLaundry,
            checkbox.washerDryerHook,
            checkbox.balcony,
            checkbox.fendedYard,
            checkbox.sunRoof,
            checkbox.swimmingPool,
            checkbox.hotTubHome,
            checkbox.fireplace,
            checkbox.scenicView,
            checkbox.shed,
            checkbox.storage,
            checkbox.basement,
            checkbox.solarPanels, // 'Alarm system', 'Ceiling fans', 'Elevator', 'Sauna', 'Private laundry', 'Shared laundry', 'Washer dryer hookups', 'Balcony / patio', 'Fended yard', 'Sun room', 'Pool', 'Hot tub', 'Fireplace', 'Scenic view', 'Shed', 'Storage', 'Basement', 'Solar panels'
            checkbox.inLawOrGuestHouse,
            checkbox.playRoom,
            checkbox.deck,
            checkbox.office,
            checkbox.dinningRoom,
            checkbox.gourmetKitchen,
            checkbox.sittingRoom,




          ]}
        />
      </ExpandDiv>
      <ExpandDiv
        title={"Parking"}
        style={editStyle(editEnum.PARKING)}
        editMode={editSection === editEnum.PARKING}
      >
        <CheckBoxes
          dataBox={data.parking}
          parent={"parking"}
          changeCheckbox={changeCheckbox}
          checkboxes={[
            checkbox.assignedSpaces,
            checkbox.attachedSpaces,
            checkbox.carport,
            checkbox.detachedGarage,
            checkbox.electricCarHookup,
            checkbox.guestParking,
            checkbox.noParking,
            checkbox.offSiteParking,
            checkbox.parkingGarage,
            checkbox.streetParking,
            checkbox.oversizeVehicleParking,
            checkbox.unassignedSpaces,
            checkbox.valet,
          ]}
        />
      </ExpandDiv>
      <ExpandDiv
        title={"Utilities"}
        style={editStyle(editEnum.UTILITIES)}
        editMode={editSection === editEnum.UTILITIES}
      >
        <TextField
          title={"Monthly AVG Utilities Cost"}
          value={`$ ${data.price.details.monthlyUtilities.toLocaleString()}`}
          onChange={(e) => {
            let newE = { ...e };
            newE.target.value = Number(e.target.value.replace(/[^0-9]/g, ""));
            changeTextField(newE, "monthlyUtilities");
          }}
          textClass={"w-full"}
        />
        <CheckBoxes
          dataBox={data.utilities}
          parent={"utilities"}
          changeCheckbox={changeCheckbox}
          checkboxes={[
            checkbox.electric,
            checkbox.naturalGas,
            checkbox.propane,
            checkbox.centralAir,
            checkbox.forcedAir,
            checkbox.acNone,
            checkbox.swampCooler,
            checkbox.waterPublic,
            checkbox.waterSpring,
            checkbox.waterSwell,
            checkbox.individualWaterMeter,
            checkbox.waterOtherUtilities,
            checkbox.septicTank,
            checkbox.sewerSystem, // 'Electric', 'Natural gas', 'Propane', 'Central air', 'Forced air', 'A/C - none', 'Swamp cooler', 'Water - public', 'Water - spring', 'Water - well', 'Individual water meter', 'Water - other', 'Septic tank', 'Sewer system'
          ]}
        />
      </ExpandDiv>
      {![
        editEnum.PRICE,
        editEnum.ASSOCIATION,
        editEnum.COMMUNITY_AND_NEARBY,
        editEnum.UTILITIES,
        editEnum.HOME_AMENITIES,
        editEnum.PARKING,
        editEnum.UTILITIES,
      ].includes(editSection) && (
        <BottomNavigationBar
          setListingState={setListingState}
          data={data}
          setListingData={setListingData}
        />
      )}
    </div>
  );
};

export default Details;

const ExpandDiv = (props) => {
  const [expanded, setExpanded] = useState(props.expanded);
  if (!props.editMode)
    return (
      <div
        className={
          "shadow-[0px_2px_11.7px_0px_rgba(0,0,0,0.2)] px-12 py-10 pb-0 my-4 " +
          props.className
        }
        style={props.style}
      >
        <div
          className={"flex justify-start items-center cursor-pointer"}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
          <h2 className={"ps-4"}>{props.title}</h2>
        </div>
        <BreakLine
          style={{ backgroundColor: "#f2f1f1", width: "90%" }}
          className={"mb-0 pb-0"}
        />
        {expanded && props.children}
      </div>
    );
  else return props.children;
};

const Select = (props) => {
  return (
    <MiniContainer>
      <div className={"flex lg:justify-start items-center cursor-pointer"}>
        <h6 className={"mb-3 mr-2"}>{props.title}</h6>
        <div className={"flex"}>{props.help}</div>
      </div>
      <select
        className={"rounded lg:min-w-[120px]"}
        value={props.value}
        style={{ borderColor: "#ECECEC"}}
        onChange={(e) => props.onChange(e)}
      >
        {props.options.map((option) => (
          <option key={props.title + option}>{option}</option>
        ))}
      </select>
    </MiniContainer>
  );
};

const TextField = (props) => (
  <MiniContainer className={props.className}>
    <h6 className={"mb-3"}>{props.title}</h6>
    <RequiredContainer>
      <input
        type={props.type ? props.type : "text"}
        required={props.required}
        pattern={props.pattern}
        onChange={(e) => props.onChange(e)}
        style={{ borderColor: "#ECECEC" }}
        className={"rounded shadow-none " + props.textClass}
        value={props.value}
        inputMode={props.inputMode}
        placeholder={props.placeholder}
      />
      <RequiredField />
    </RequiredContainer>
  </MiniContainer>
);

const CheckBoxes = (props) => (
  <div className={"grid lg:grid-cols-4 pb-12"} style={{ fontFamily: "Roboto" }}>
    {props.checkboxes.map((option) => (
      <div key={"checkboxes" + option} className={"flex items-center my-2"}>
        <input
          type="checkbox"
          onChange={(e) => props.changeCheckbox(e, props.parent, option)}
          checked={
            props.dataBox[
              Object.keys(checkbox).find((key) => checkbox[key] === option)
            ]
          }
        />
        <span className={"ps-2"}>{option}</span>
      </div>
    ))}
  </div>
);

const TextInputCounter = (props) => {
  return (
    <MiniContainer>
      <h6 className={"mb-3"}>Home Description</h6>
      <RequiredContainer>
        <textarea
          required
          style={{
            borderColor: "#ECECEC",
            minHeight: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "start",
          }}
          className={
            "align-text-top rounded w-full justify-start items-start inline-block"
          }
          value={props.value}
          onChange={(e) => {
            props.onChange(e);
          }}
        />
        <div style={{ width: "100%" }} className={"flex justify-end pb-12"}>
          <span style={{ fontSize: "0.85rem", color: "#B2B2B2" }}>
            {props.value.split(/\s|\n/).length}/5000 words
          </span>
        </div>
        <RequiredField style={{ transform: "translateY(-4rem)" }} />
      </RequiredContainer>
    </MiniContainer>
  );
};

export const checkbox = {
  clubHouse: "Club House",
  tennisCourt: "Tennis court",
  playground: "Playground",
  gatedAccess: "Gated access",
  lawnCare: "Lawn care",
  snowplowing: "Snowplowing",
  pool: "Pool",
  hotTub: "Hot tub",
  concierge: "Concierge",
  utilities: "Utilities",
  sewer: "Sewer",
  trash: "Trash",
  pestControl: "Pest control",
  waterOther: "Water other",
  park: "Park",
  hikingTrails: "Hiking trails",
  militaryBase: "Military base",
  bikePath: "Bike path",
  gym: "Gym",
  dogPark: "Dog park",
  golfCourse: "Golf course",
  dayCare: "Day care",
  schools: "Schools",

  alarmSystem: "Alarm system",
  ceilingFans: "Ceiling fans",
  elevator: "Elevator",
  sauna: "Sauna",
  privateLaundry: "Private laundry",
  sharedLaundry: "Shared laundry",
  washerDryerHook: "Washer dryer hookups",
  balcony: "Balcony / Patio",
  fendedYard: "Fenced yard",
  sunRoof: "Sun room",
  swimmingPool: "Pool",
  hotTubHome: "Hot tub",
  fireplace: "Fireplace",
  scenicView: "Scenic view",
  shed: "Shed",
  storage: "Storage",
  basement: "Basement",
  solarPanels: "Solar panels",
  inLawOrGuestHouse: "In Law / Guest House",
  playRoom:"Play/Recreational Room",
  deck:"Deck",
  office:"Office Room",
  dinningRoom:"Dinning Room",
  gourmetKitchen: "Gourmet Kitchen",
  sittingRoom: "Sitting Room",

  assignedSpaces: "Assigned spaces",
  attachedSpaces: "Attached garage",
  carport: "Carport",
  detachedGarage: "Detached garage",
  electricCarHookup: "Electric car hookup",
  guestParking: "Guest/visitor parking",
  noParking: "No parking",
  offSiteParking: "Off site parking",
  parkingGarage: "Parking garage",
  streetParking: "Street parking",
  oversizeVehicleParking: "Oversize vehicle parking",
  unassignedSpaces: "Unassigned spaces",
  valet: "Valet",

  electric: "Electric",
  naturalGas: "Natural gas",
  propane: "Propane",
  centralAir: "Central air",
  forcedAir: "Forced air",
  acNone: "A/C - none",
  swampCooler: "Swamp cooler",
  waterPublic: "Water - public",
  waterSpring: "Water - spring",
  waterSwell: "Water - well",
  individualWaterMeter: "Individual water meter",
  waterOtherUtilities: "Water - other",
  septicTank: "Septic tank",
  sewerSystem: "Sewer system",
};

const BathHelper = (props) => {
  const tooltipStyle = {
    width: "17rem",
    backgroundColor: "rgba(209, 238, 0, 1)",
    transform: "translate(25%, -50%)",
  };
  const [toggleToolTip, setToggleToolTip] = useState(false);
  return (
    <div className={"absolute flex"} style={{ transform: "translateY(-75%)" }}>
      <FaRegCircleQuestion
        size={25}
        className={"cursor-pointer"}
        onClick={() => setToggleToolTip(!toggleToolTip)}
      />
      {toggleToolTip && (
        <>
          <div
            style={{
              position: "absolute",
              height: "0",
              width: "0",
              borderTop: "1rem solid transparent",
              borderRight: "2rem solid rgba(209, 238, 0, 1)",
              borderBottom: "1rem solid transparent",
              transform: "translate(150%, -15%)",
            }}
          />
          <div className={"absolute rounded p-4"} style={tooltipStyle}>
            <ToolTipParagraph
              label={"Full-bath:"}
              text={"sink, toilet, shower and tub"}
            />
            <ToolTipParagraph
              label={"3/4-bath:"}
              text={"sink, toilet, shower or tub"}
            />
            <ToolTipParagraph label={"1/2-bath:"} text={"sink and toilet"} />
            <ToolTipParagraph label={"1/4-bath:"} text={"toilet only"} />
          </div>
        </>
      )}
    </div>
  );
};
