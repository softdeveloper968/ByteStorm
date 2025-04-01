import {config} from "@/app/usignup/config"
import Link from "next/link"
import React, {useEffect, useRef} from "react"

export function DownloadApp(props) {
  const linkRef = useRef()
  // useEffect(() => {
  //   const footer = document.querySelector("footer")
  //   if (linkRef.current) {
  //     linkRef.current.style.bottom = footer.getClientRects()[0].height + "px"
  //   }
  // }, [])

  return (
    <div
      id={props.id}
      ref={linkRef}
      style={{
        position: "absolute",
        backgroundColor: config.colors.black,
        padding: "1rem",
        margin: "1rem",
        borderRadius: "10px",
        color: "white",
        bottom : "80px"
      }}
    >
      <Link
        className={"shadow-lg"}
        style={{
          width: "100%"
        }}
        href={"/find-a-home/banner"}>
        <h5 style={{textAlign: "center"}}>
          Use MustWants to Rank Your Homes and Collaborate with your Partner and Chosen Real Estate Agent.
        </h5>
      </Link>
    </div>
  )
}