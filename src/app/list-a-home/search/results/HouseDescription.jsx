import {BreakLine} from "@/app/list-a-home/common/BreakLine"
import {sections} from "@/app/list-a-home/common/list-your-home/Review"
import {addressConverter, detailsConverter} from "@/app/list-a-home/common/OptionComponent"
import useHomeResultsStore from "@/app/list-a-home/search/results/homeResultsStore"
import {iconPerLabel} from "@/app/list-a-home/search/results/IconPerLabel"
import {PrimaryButton} from "@/app/usignup/button"
import {config} from "@/app/usignup/config"
import {BsHousesFill} from "react-icons/bs"
import {FaHouseUser, FaStar} from "react-icons/fa"
import {GiCalendarHalfYear} from "react-icons/gi"
import {GrFormNext, GrFormPrevious} from "react-icons/gr"
import {MdHouseSiding} from "react-icons/md"
import styled from "styled-components"

export function HouseDescription(props) {
  const containerStyle = {
    padding: "0 2rem 5rem 2rem",
    overflow: "auto"
  }
  const details = props.house.price.details
  const features = [
    {icon: MdHouseSiding, feature: `${details.stories} stories`},
    {icon: GiCalendarHalfYear, feature: `Built ${details.yearBuilt}`},
    {icon: FaHouseUser, feature: details.typeOfProperty},
    {icon: BsHousesFill, feature: `HOA: ${details.HOA.toLowerCase()}`}
  ]
  const contact = props.house.contact
  const linkStyle = {
    color: config.colors.black,
    fontWeight: "500",
    backgroundColor: "transparent",
    fontSize: "1.0rem",
    whiteSpace: "nowrap"
  }

  const preferredIconStyle = {
    display: "inline-block",
    paddingRight: "0.5rem"
  }
  const anchorStyle = {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap"
  }
  const communityAndNearby = propertiesToArray(
    props.house.communityAndNearby
  ).map((can) => sections.communityAndNearby.labels[can])
  const homeAmenities = propertiesToArray(props.house.homeAmenities).map(
    (ha) => sections.homeAmenities.labels[ha]
  )
  const parking = propertiesToArray(props.house.parking).map(
    (park) => sections.parking.labels[park]
  )
  const utilities = propertiesToArray(props.house.utilities).map(
    (util) => sections.utilities.labels[util]
  )

  return (
    <div style={containerStyle} className={props.className}>
      <h1 className={"py-0"}>{props.house.general.nickname}</h1>
      <h2>{detailsConverter(props.house)}</h2>
      <h3>{addressConverter(props.house)}</h3>
      <div className={"flex flex-wrap gap-2 py-4"}>
        {features.map((feature) => (
          <Feature key={feature.feature} className={"shadow-md"}>
            <feature.icon/>
            {feature.feature}
          </Feature>
        ))}
      </div>
      <h4>Description</h4>
      <div className={"cursor-text"}>{details.description}</div>
      <FeaturesToLabels
        content={{
          title: sections.communityAndNearby.title,
          labels: communityAndNearby
        }}
      />
      <FeaturesToLabels
        content={{title: sections.homeAmenities.title, labels: homeAmenities}}
      />
      <FeaturesToLabels
        content={{title: sections.parking.title, labels: parking}}
      />
      <FeaturesToLabels
        content={{title: sections.utilities.title, labels: utilities}}
      />
      <div className={"py-4"}>
        <BreakLine style={{width: "90%"}}/>
        <h4>Contact details</h4>
        <div className={"flex flex-col"} style={linkStyle}>
          {contact.email !== "" && (
            <a
              style={anchorStyle}
              href={`mailto:${contact.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.preferred === "email" && (
                <FaStar size={"1rem"} style={preferredIconStyle}/>
              )}
              {contact.email}
            </a>
          )}
          {contact.phone !== "" && (
            <a
              style={anchorStyle}
              href={`tel:${contact.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.preferred === "phone" && (
                <FaStar size={"1rem"} style={preferredIconStyle}/>
              )}
              {contact.phone}
            </a>
          )}
        </div>
      </div>
      <NavigationBar/>
    </div>
  )
}

const Feature = styled.span`
    text-overflow: ellipsis;
    border-radius: 5px;
    background-color: ${config.colors.brandGreen};
    display: flex;
    padding: 0.15rem 0.35rem;
    align-items: center;
    margin: 0.25rem;
    column-gap: 0.5rem;
    width: 10rem;
    text-align: center;
    display: flex;
    justify-content: center;
`

function NavigationBar(props) {
  const useStore = useHomeResultsStore()
  const houses = useStore.houses
  if (houses.length >= 2) {
    // TODO: get the current index
    const currentIndex = houses.indexOf(useStore.houseDetails)
    const prev = currentIndex === 0 ? houses.length - 1 : currentIndex - 1
    const next = currentIndex === houses.length - 1 ? 0 : currentIndex + 1
    const maxWidth = "35%"

    return (
      <div
        className={"flex"}
        style={{
          justifyContent: "space-between",
          height: "2rem"
        }}
      >
        <NavigationButton
          style={{maxWidth: maxWidth}}
          next={false}
          onClick={() => useStore.changeHouseDetails(houses[prev])}
          label={houses[prev].general.nickname}
        />
        <NavigationButton
          style={{maxWidth: maxWidth}}
          next={true}
          onClick={() => useStore.changeHouseDetails(houses[next])}
          label={houses[next].general.nickname}
        />
      </div>
    )
  }
}

function NavigationButton(props) {
  const iconStyle = {
    display: "inline-block"
  }
  const buttonStyle = {
    textOverflow: "ellipsis"
  }
  return (
    <div className={props.className} style={props.style}>
      {!props.next && (
        <PrimaryButton
          onClick={props.onClick}
          className={"gap-2"}
          style={buttonStyle}
        >
          <GrFormPrevious style={iconStyle}/>
          <span style={{textOverflow: "ellipsis"}}>{props.label}</span>
        </PrimaryButton>
      )}
      {props.next && (
        <PrimaryButton
          onClick={props.onClick}
          className={"gap-2"}
          style={buttonStyle}
        >
          <span style={{textOverflow: "ellipsis"}}>{props.label}</span>
          <GrFormNext style={iconStyle}/>
        </PrimaryButton>
      )}
    </div>
  )
}

function propertiesToArray(properties) {
  return Object.keys(properties).filter((key) => properties[key] === true)
}

function FeaturesToLabels(props) {
  if (props.content.labels.length === 0) return

  return (
    <div className={"py-4 flex flex-col"}>
      <BreakLine style={{width: "90%", margin: "0.5rem 0"}}/>
      <h6 className={"pb-2"}>{props.content.title}</h6>
      <div className={"flex flex-wrap"}>
        {props.content.labels
          .map((label, index) => (label &&
            // biome-ignore lint/suspicious: intentional
            <Feature key={`${label}-${index}`}>
              {iconPerLabel(label)}
              {label}
            </Feature>
          ))}
      </div>
    </div>
  )
}
