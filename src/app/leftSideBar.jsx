"use client"
import useHomeResultsStore from "@/app/list-a-home/search/results/homeResultsStore"
import {useSession} from "next-auth/react"
import Link from "next/link"
import {usePathname, useSearchParams} from "next/navigation"
import React, {useEffect, useRef, useState} from "react"
import {FaClipboard} from "react-icons/fa"
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineAddHome,
  MdOutlineRealEstateAgent,
  MdOutlineSupportAgent,
  MdSpaceDashboard
} from "react-icons/md"
import {PiArticleMediumFill} from "react-icons/pi"
import {RiMobileDownloadLine} from "react-icons/ri"
import {TbHomeHand} from "react-icons/tb"
import {config} from "./usignup/config"

export function LeftSideBar(props) {
  const session = useSession()
  const [navigation, setNavigation] = useState([])
  const [sidebar, setSidebar] = useState(false)
  const leftBarRef = useRef(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const recommendedStore = useHomeResultsStore()
  function resizeMain() {
    const topBarSize = document.querySelector("div#top-bar").clientHeight
    const mainPage = document.querySelector("main")
    if (leftBarRef.current && mainPage && topBarSize && session.data?.user) {
      leftBarRef.current.style.top = `${topBarSize}px`
      const leftBarSize = leftBarRef.current.clientWidth
      mainPage.style.marginLeft = `${leftBarSize}px`
      mainPage.style.width = `calc(100% - ${leftBarSize}px)`
      const role = session.data.user.userRole
      const navigation = () => {
        switch (role) {
          case "user":
            return sideMenuData.user
        }
      }
      setNavigation(navigation())
    }
  }
  const bodyRef = React.useRef(null)
  useEffect(() => {

    if (!session.data || !session.data.user) {
      setNavigation([])

      return
    }

    recommendedStore.token = session.data.user.token
    

    bodyRef.current = document.querySelector("main")
    resizeMain()
    const handleResize = (entries) => {
      entries.forEach((_) => {
        resizeMain()
      })
    }
    const resizeObserver = new ResizeObserver(handleResize)
    if (bodyRef.current) {
      resizeObserver.observe(bodyRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [session, pathname, searchParams, session.data?.user])
  const navSelected = "border-mw_green text-mw_green"
  const navNotSelected =
    "text-mw_gray border-mw_gray hover:text-mw_olive hover:border-mw_olive"
  return (
    <>
      {navigation && (
        <div
          style={{
            zIndex: config.zIndex.leftSideBar,
            display: navigation.length > 0 ? "block" : "none"
          }}
          ref={leftBarRef}
          id="left-bar"
          className={`fixed top-0 left-0 h-screen ${
            sidebar ? "" : "lg:w-12 w-0"
          } bg-mw_black md:block md:pt-24 transition-all duration-[0.5s] ease-out shadow-xl drop-shadow-xl`}
        >
          <button
            type="button"
            onKeyDown={(e) => e.key === "Enter" && setSidebar(!sidebar)}
            onClick={() => setSidebar(!sidebar)}
            className={`absolute top-0 ${
              sidebar ? "right-[-13px]" : "lg:right-[-13px] right-[-18px]"
            } cursor-pointer rounded-full border-2 border-white bg-[#d1ee00] p-[2px] w-6 h-6 flex items-center justify-center`}
          >
            {sidebar ? (
              <MdChevronLeft className="h-6 w-6 text-black"/>
            ) : (
              <MdChevronRight className="h-6 w-6 text-black"/>
            )}
          </button>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex truncate items-center gap-2 border-l-8 pl-2 py-4 cursor-pointer 
                  ${!sidebar && "hidden lg:block"}
                  
                  ${
                  pathname === item.href
                    ? `${navSelected}`
                    : `${navNotSelected}`
                }`}
              >
                {item.icon}
                {sidebar ? item.name : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
const sideMenuData = Object.freeze({
  user: [
    {
      name: "Dashboard",
      href: "/buyer",
      icon: <MdSpaceDashboard className="h-6 w-6"/>
    },
    {
      name: "Vetted Agent",
      href: "/find-a-pro/vetted-agents",
      icon: <MdOutlineSupportAgent className="h-6 w-6"/>
    },
    {
      name: "Vetted Lender",
      href: "/find-a-pro/vetted-lenders",
      icon: <MdOutlineRealEstateAgent className="h-6 w-6"/>
    },
    {
      name: "Blogs",
      href: "/blogs",
      icon: <PiArticleMediumFill className="h-6 w-6"/>
    },
    {
      name: "Checklists",
      href: "/checklists",
      icon: <FaClipboard className="h-6 w-6"/>
    },
    {
      name: "Download the app",
      href: "/find-a-home/banner",
      icon: <RiMobileDownloadLine className="h-6 w-6"/>
    },

    {
      name: "My listings",
      href: "/list-a-home/for-sale-by-owner",
      icon: <MdOutlineAddHome className="h-6 w-6"/>
    },
    {
      name: "Search FSBO/FRBO",
      href: "/find-a-home",
      icon: <TbHomeHand className="h-6 w-6"/>
    }
  ]
})
