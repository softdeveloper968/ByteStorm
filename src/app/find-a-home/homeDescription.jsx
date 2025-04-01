import {HouseDescription} from "@/app/list-a-home/search/results/HouseDescription"
import {PicturesComponent} from "@/app/list-a-home/search/results/PicturesComponent"
import {config} from "@/app/usignup/config"
import React, {useEffect, useRef} from "react"

export function HomeDescription(props) {

  const containerRef = useRef()
  useEffect(() => {
    const footer = document.querySelector("footer")
    const topBar = document.querySelector("#top-bar")
    if (containerRef.current) {
      containerRef.current.style.height = (window.innerHeight - footer.getClientRects()[0].height - topBar.getClientRects()[0].height) + "px"
    }
  }, [])
  const buttonStyle = {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    zIndex: 1,
    padding: "0.25rem 0.5rem",
    backgroundColor: config.colors.brandYellow,
    color: config.colors.black,
    borderRadius: "5px",
    fontWeight: "bold"
  }
  return (
    <div className={"relative w-full h-full flex flex-wrap"} style={{overflowY: "scroll"}} ref={containerRef}>
      {props.exit && <button style={buttonStyle} onClick={props.exit} className={"shadow-md"}>Back</button>}
      <PicturesComponent
        photos={props.house.photos}
        heartClick={(e) => props.heartClick(e, props.house._id)}
        $isLiked={props.$isLiked}
        style={{}}
        className={"flex-col max-w-[650px] justify-start"}
      />
      <HouseDescription
        house={props.house}
        className={"max-w-[650px]"}
      />
    </div>
  )
}