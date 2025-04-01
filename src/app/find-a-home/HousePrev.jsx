import {addressConverter, detailsConverter} from "@/app/list-a-home/common/OptionComponent"
import {config} from "@/app/usignup/config"
import Link from "next/link"
import {useRouter} from "next/navigation"

import {FaHeart, FaRegHeart} from "react-icons/fa"
import styled from "styled-components";

export function HousePrev(props) {
  const router = useRouter()
  const forSale =
    props.house.price.forRent && props.house.price.price !== 0
      ? "For sale / rent"
      : props.house.price.forRent
        ? "For rent"
        : "For sale"
  function handleClick(e) {
    e.preventDefault()
    e.stopPropagation()
    router.push("/find-a-home/details?house=" + JSON.stringify(props.house))
  }

  return (
    <div
      onClick={(e) => props.focus ? props.focus(props.house._id) : handleClick(e)}
      className="house-prev-wrapper shadow-lg"
      style={{
        cursor: "pointer",
        minWidth: "100px",
        position: "relative",
        maxWidth: "300px",
        border: `3px solid ${props.$isFocused ? config.colors.brandGreen : "transparent"}`,
        borderRadius: "5px"
      }}>
      {/*<JoinMWDialog reff={modalRef} onClick={(e) => heartClick(e)}/>*/}
      <div
        style={{
          aspectRatio: "3 / 2",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundImage: props.house.photos[0] && `url(${props.house.photos[0]})`,
          borderRadius: "5px"
        }}
      />
      {props.$isLiked
        ? <FaHeart color={"red"} size={"1.5rem"}
                   style={{position: "absolute", right: "1rem", top: "1rem", cursor: "pointer"}}
                   onClick={(e) => props.heartClick(e, props.house._id)}/>
        : <FaRegHeart color={"red"} size={"1.5rem"}
                      style={{position: "absolute", right: "1rem", top: "1rem", cursor: "pointer"}}
                      onClick={(e) => props.heartClick(e, props.house._id)}/>
      }
      <div style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "rgba(255,255,255,0.5)",
        width: "100%",
        padding: "0.25rem 0.5rem",
        borderRadius: "0 0 5px 5px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap"
      }}>
        <h4>{`${props.house.general.nickname} - ${forSale}`}</h4>
        <h5>{detailsConverter(props.house)}</h5>
        <h6>{addressConverter(props.house)}</h6>
      </div>
    </div>
  )
}
const Dialog = styled.dialog`
    cursor: not-allowed;
    background-color: transparent;

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.8);
    }
`
export function JoinMWDialog(props) {

  return (
    <Dialog
      ref={props.reff}
      onClick={e => props.onClick(e)}
    >
      <div
        className={"shadow-lg"}
        style={{
          display: "flex",
          color: "white",
          backgroundColor: "black",
          border: `2px solid ${config.colors.brandGreen}`,
          alignItems: "center",
          justifyItems: "center",
          flexDirection: "column",
          cursor: "default",
          padding: "2rem",
          borderRadius: "10px"
        }}
        onClick={e => props.onClick(e)}
      >
        <h2>Join our Community to save your favorites</h2>
        <Link
          href={"/usignup"}
          className="btn-1 ml-2 site-nav_link flex justify-center gap-x-2 items-center text-black mt-10 py-2 px-5 primary-button-hover md:inline-flex"
        >
            <span style={{whiteSpace: "nowrap"}}>
              {"Join MustWants Community"}
            </span>
        </Link>
        <h6 className={"pt-4"}>We do NOT sell your personal information.</h6>
      </div>
    </Dialog>
  )
}