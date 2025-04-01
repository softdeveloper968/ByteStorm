import useHomeResultsStore from "@/app/list-a-home/search/results/homeResultsStore"
import {config} from "@/app/usignup/config"
import Image from "next/image"
import {useRef, useState} from "react"
import {FaHeart, FaRegHeart} from "react-icons/fa"

export function PicturesComponent(props) {

  const [isScrolling, setIsScrolling] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef(null)
  const startDragging = (e) => {
    setIsScrolling(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }
  const stopDragging = (e, photo) => {
    if (isScrolling && Math.abs(startX - e.clientX) < 5 && photo) {
      setPicture(photo)
    }
    setIsScrolling(false)
  }
  const onDrag = (e) => {
    if (!isScrolling) return
    e.preventDefault()
    e.stopPropagation()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 1 // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk
  }
  const defaultPicture =
    "https://media.newhomeinc.com/348/2022/11/30/The-Apex-Georgian-Elevation-1.jpeg?width=1000&ois=0360179&fit=bounds&height=666"
  const [picture, setPicture] = useState(props.photos[0] ?? defaultPicture)
  useHomeResultsStore.subscribe((store) => {
    if (
      store.houseDetails &&
      store.houseDetails.photos &&
      store.houseDetails.photos.length > 0
    ) {
      setPicture(store.houseDetails.photos[0])
    }
  })
  const mainPictureStyle = {
    backgroundImage: `url(${picture})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    aspectRatio: "3 / 2",
    height: "70%",
    borderRadius: "5px",
    position: "relative"
  }
  const smallPictureStyle = {
    aspectRatio: "3 / 2",
    maxHeight: "200px",
    maxWidth: "30%",
    cursor: isScrolling ? "grabbing" : "pointer",
    userSelect: "none",
    WebkitUserDrag: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none"
  }
  const containerStyle = {
    display: "flex",
    minWidth: "300px"
  }
  const heartStyle = {
    color: "red",
    position: "absolute",
    top: 0,
    right: 0,
    padding: "0.75rem",
    cursor: "pointer",
    height: "3rem",
    width: "3rem"
  }
  return (
    <div className={props.className} style={containerStyle}>
      <div style={mainPictureStyle} className={"p-0"}>
        {props.$isLiked ?
          <FaHeart style={heartStyle} onClick={e => props.heartClick(e)}/>
          : <FaRegHeart style={heartStyle} onClick={e => props.heartClick(e)}/>
        }
      </div>
      <div className={"w-full flex overflow-x-auto overflow-y-hidden"}
           ref={containerRef}
           onMouseDown={startDragging}
           onMouseMove={onDrag}
           style={{
             overflowX: "scroll",
             whiteSpace: "nowrap",
             cursor: isScrolling ? "grabbing" : "grab",
             userSelect: "none"
           }}
      >
        {props.photos.map((photo, index) => (
          <Image
            onKeyDown={(e) => e.key === "Enter" && setPicture(photo)}
            onMouseUp={(e) => stopDragging(e, photo)}
            alt={`picture-${index}`}
            key={photo}
            src={photo}
            width={300}
            height={200}
            className={"rounded-lg m-2"}
            style={{
              ...smallPictureStyle,
              border: `6px solid ${
                picture === photo ? config.colors.brandGreen : "transparent"
              }`
            }}
          />
        ))}
      </div>
    </div>
  )
}
