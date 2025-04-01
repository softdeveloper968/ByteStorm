import { sections } from "@/app/list-a-home/common/list-your-home/Review";
import { BiSolidCarGarage } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import {
  FaBitbucket,
  FaConciergeBell,
  FaHotTub,
  FaParking,
  FaSpa,
  FaUser,
} from "react-icons/fa";
import {
  FaArrowUpFromWaterPump,
  FaDog,
  FaPeopleLine,
  FaPersonArrowDownToLine,
  FaSolarPanel,
  FaTrashArrowUp,
  FaWater,
} from "react-icons/fa6";
import {
  GiClawSlashes,
  GiGate,
  GiHouseKeys,
  GiKidSlide,
  GiMilitaryFort,
  GiPulleyHook,
  GiRiver,
  GiSpikedFence,
  GiSwamp,
} from "react-icons/gi";
import { IoIosSunny } from "react-icons/io";
import { IoGolf, IoTrailSign } from "react-icons/io5";
import {
  LiaHotTubSolid,
  LiaSchoolSolid,
  LiaSnowplowSolid,
} from "react-icons/lia";
import { LuParkingCircleOff, LuParkingSquare, LuSiren } from "react-icons/lu";
import {
  MdAir,
  MdBalcony,
  MdCloseFullscreen,
  MdDirectionsBike,
  MdElectricBolt,
  MdElectricCar,
  MdFireplace,
  MdGarage,
  MdGasMeter,
  MdLocalLaundryService,
  MdMeetingRoom,
  MdMoneyOff,
  MdOutlineLocalLaundryService,
  MdOutlinePropaneTank,
  MdOutlineStreetview,
  MdPark,
  MdPestControl,
  MdPool,
  MdSportsTennis,
  MdWaterDrop,
} from "react-icons/md";
import {
  PiBarnFill,
  PiElevatorFill,
  PiFanBold,
  PiGarage,
  PiSwimmingPoolBold,
} from "react-icons/pi";
import { RiParkingFill } from "react-icons/ri";
import { SiClubhouse } from "react-icons/si";
import { TbCarGarage } from "react-icons/tb";

export function iconPerLabel(label) {
  switch (label) {
    case sections.communityAndNearby.labels.clubHouse:
      return <SiClubhouse />;
    case sections.communityAndNearby.labels.gym:
      return <CgGym />;
    case sections.communityAndNearby.labels.tennisCourt:
      return <MdSportsTennis />;
    case sections.communityAndNearby.labels.playground:
      return <GiKidSlide />;
    case sections.communityAndNearby.labels.gatedAccess:
      return <GiGate />;
    case sections.communityAndNearby.labels.dogPark:
      return <FaDog />;
    case sections.communityAndNearby.labels.lawnCare:
      return <GiClawSlashes />;
    case sections.communityAndNearby.labels.snowplowing:
      return <LiaSnowplowSolid />;
    case sections.communityAndNearby.labels.pool:
      return <MdPool />;
    case sections.communityAndNearby.labels.hotTub:
      return <FaHotTub />;
    case sections.communityAndNearby.labels.concierge:
      return <FaConciergeBell />;
    case sections.communityAndNearby.labels.utilities:
      return <MdMoneyOff />;
    case sections.communityAndNearby.labels.sewer:
      return <FaArrowUpFromWaterPump />;
    case sections.communityAndNearby.labels.trash:
      return <FaTrashArrowUp />;
    case sections.communityAndNearby.labels.pestControl:
      return <MdPestControl />;
    case sections.communityAndNearby.labels.waterOther:
      return <MdWaterDrop />;
    case sections.communityAndNearby.labels.park:
      return <MdPark />;
    case sections.communityAndNearby.labels.hikingTrails:
      return <IoTrailSign />;
    case sections.communityAndNearby.labels.militaryBase:
      return <GiMilitaryFort />;
    case sections.communityAndNearby.labels.bikePath:
      return <MdDirectionsBike />;
    case sections.communityAndNearby.labels.golfCourse:
      return <IoGolf />;
    case sections.communityAndNearby.labels.dayCare:
      return <FaSpa />;
    case sections.communityAndNearby.labels.schools:
      return <LiaSchoolSolid />;
    case sections.homeAmenities.labels.alarmSystem:
      return <LuSiren />;
    case sections.homeAmenities.labels.ceilingFans:
      return <PiFanBold />;
    case sections.homeAmenities.labels.elevator:
      return <PiElevatorFill />;
    case sections.homeAmenities.labels.sauna:
      return <LiaHotTubSolid />;
    case sections.homeAmenities.labels.privateLaundry:
      return <MdLocalLaundryService />;
    case sections.homeAmenities.labels.sharedLaundry:
      return <MdOutlineLocalLaundryService />;
    case sections.homeAmenities.labels.washerDryerHook:
      return <GiPulleyHook />;
    case sections.homeAmenities.labels.balcony:
      return <MdBalcony />;
    case sections.homeAmenities.labels.fendedYard:
      return <GiSpikedFence />;
    case sections.homeAmenities.labels.sunRoof:
      return <IoIosSunny />;
    case sections.homeAmenities.labels.swimmingPool:
      return <PiSwimmingPoolBold />;
    case sections.homeAmenities.labels.hotTubHome:
      return <LiaHotTubSolid />;
    case sections.homeAmenities.labels.fireplace:
      return <MdFireplace />;
    case sections.homeAmenities.labels.scenicView:
      return <MdOutlineStreetview />;
    case sections.homeAmenities.labels.shed:
      return <PiBarnFill />;
    case sections.homeAmenities.labels.storage:
      return <MdMeetingRoom />;
    case sections.homeAmenities.labels.basement:
      return <FaPersonArrowDownToLine />;
    case sections.homeAmenities.labels.solarPanels:
      return <FaSolarPanel />;

    case sections.parking.labels.assignedSpaces:
      return <FaParking />;
    case sections.parking.labels.attachedSpaces:
      return <LuParkingSquare />;
    case sections.parking.labels.carport:
      return <MdGarage />;
    case sections.parking.labels.detachedGarage:
      return <PiGarage />;
    case sections.parking.labels.electricCarHookup:
      return <MdElectricCar />;
    case sections.parking.labels.guestParking:
      return <TbCarGarage />;
    case sections.parking.labels.noParking:
      return <LuParkingCircleOff />;
    case sections.parking.labels.offSiteParking:
      return <RiParkingFill />;
    case sections.parking.labels.parkingGarage:
      return <BiSolidCarGarage />;
    case sections.parking.labels.streetParking:
      return <RiParkingFill />;
    case sections.parking.labels.oversizeVehicleParking:
      return <RiParkingFill />;
    case sections.parking.labels.unassignedSpaces:
      return <RiParkingFill />;
    case sections.parking.labels.valet:
      return <GiHouseKeys />;

    case sections.utilities.labels.electric:
      return <MdElectricBolt />;
    case sections.utilities.labels.naturalGas:
      return <MdGasMeter />;
    case sections.utilities.labels.propane:
      return <MdOutlinePropaneTank />;
    case sections.utilities.labels.centralAir:
      return <MdAir />;
    case sections.utilities.labels.forcedAir:
      return <MdAir />;
    case sections.utilities.labels.acNone:
      return <MdCloseFullscreen />;
    case sections.utilities.labels.swampCooler:
      return <GiSwamp />;
    case sections.utilities.labels.waterPublic:
      return <FaPeopleLine />;
    case sections.utilities.labels.waterSpring:
      return <GiRiver />;
    case sections.utilities.labels.waterSwell:
      return <GiSwamp />;
    case sections.utilities.labels.individualWaterMeter:
      return <FaUser />;
    case sections.utilities.labels.waterOther:
      return <FaWater />;
    case sections.utilities.labels.septicTank:
      return <FaBitbucket />;
    case sections.utilities.labels.sewerSystem:
      return <FaArrowUpFromWaterPump />;
  }
}