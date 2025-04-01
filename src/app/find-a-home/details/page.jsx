"use client"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect, useRef} from "react"
import {HouseDescription} from "../../list-a-home/search/results/HouseDescription"
import {PicturesComponent} from "../../list-a-home/search/results/PicturesComponent"

export default function HomeDetails() {
  const searchParams = useSearchParams()
  const router = useRouter()
  let house
  try {
    house = JSON.parse(searchParams?.get("house") ?? "")
  } catch (err) {
  }
  const containerRef = useRef()
  useEffect(() => {
    const topBar = document.querySelector("#top-bar")
    if (containerRef.current && topBar)
      containerRef.current.style.padding = `calc(${topBar.getClientRects()[0].bottom}px) 0`

    if (house) window.history.replaceState(null, "", "/find-a-home/details")
    else {
      router.push("/find-a-home")
    }
  }, [])

  return house &&
    <main className={"relative w-full h-full flex flex-wrap"} ref={containerRef}>
      <PicturesComponent photos={house.photos}
                         className={
                           "lg:w-[50%] w-full lg:h-[calc(100%-5rem)] h-[calc(50%-2.5rem)]"
                         }
      />
      <HouseDescription house={house}
                        className={
                          "lg:w-[50%] w-full lg:h-[calc(100%-5rem)] h-[calc(50%-2.5rem)] pb-8"
                        }
      />
    </main>
}
