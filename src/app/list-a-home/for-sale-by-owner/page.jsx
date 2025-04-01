"use client"
import NoHouses from "@/app/list-a-home/common/NoHouses"
import {listingLicensesStore} from "@/app/list-a-home/common/store"
import WithHouses from "@/app/list-a-home/common/WithHouses"
import PageFooter from "@/components/home-page/section-07-page-footer"
import {useSession} from "next-auth/react"
import {useSearchParams} from "next/navigation"
import React, {Suspense, useEffect, useState} from "react"
import {FaUsers} from "react-icons/fa"
import {FaDollarSign, FaShuffle} from "react-icons/fa6"
import Hero from "../common/list-your-home/Hero"

export function FSBOLayout(props) {
  return (
    <main className={"pt-10 flex-col overflow-x-hidden"}>
      <Hero  label={props.route}/>
      <div>{props.children}</div>
      <PageFooter/>
    </main>
  )
}

export default function ForSaleByOwner() {
  return (
    <FSBO
      route={"For Sale by Owner"}
      benefits={benefits}
      rightForYou={rightForYou}
      sellingProcess={sellingProcess}
    />
  )
}

export function FSBO(props) {
  const newListing = useSearchParams().get("ok") === "true"
  const editedListings = useSearchParams().get("edit") === "true"
  const deletedListing = useSearchParams().get("deleted") === "true"
  const [isUpdating, setIsUpdating] = useState(true)
  const {data: session} = useSession()
  const token = session?.user.token
  const store = listingLicensesStore()
  useEffect(() => {
    if (session?.user)
      store.refreshData(session, true)
        .then(res => {
          if (res === true) {
            // INFO: the store is sucessfully restored
            setIsUpdating(false)
          } else {
            setIsUpdating(false)
            console.log("not updated")
          }

        })
    else {
      setIsUpdating(false)
      store.clear()
    }
  }, [session?.user._id, token, session?.user, session])

  return (
      <FSBOLayout route={props.route}>
        <Suspense fallback={<h1>Loading...</h1>}>{!isUpdating &&
        (!store.drafts && !store.listings) ||  (store.drafts.length === 0 && store.listings.length === 0) ? (
          <NoHouses
            benefits={props.benefits}
            rightForYou={props.rightForYou}
            sellingProcess={props.sellingProcess}
            isRent={props.isRent}
          />
        ) : (
          <WithHouses
            licenses={store.licenses}
            setGlobalHouses={store.setListings}
            globalHouses={store.listings}
            setHouses={store.setDrafts}
            houses={store.drafts}
            newListing={newListing}
            editted={editedListings}
            deleted={deletedListing}
          />
        )}
        </Suspense>
      </FSBOLayout>
  )
}

const benefits = {
  title: "For Sale By Owner Benefits",
  cards: [
    {
      title: "Cost Savings",
      icon: <FaDollarSign size={40}/>,
      label:
        "Save money On commission fees. Note: commission fees are negotiable and the right agent can bring value"
    },
    {
      title: "More Flexibility",
      icon: <FaShuffle size={40}/>,
      label:
        "Increased flexibility to schedule showings, open houses, and handle inquiries on your own time, without relying on a real estate agent's schedule"
    },
    {
      title: "Increased engagement",
      icon: <FaUsers size={40}/>,
      label:
        "Selling FSBO gives sellers full control over the process. Set the price, negotiate directly with buyers, and manage the entire transaction yourself"
    }
  ]
}
const rightForYou = {
  title: "Which Selling Method is Right for You?",
  tooltip: [
    {
      title: "Using a Seller Agent",
      content: [
        {
          label: "Save time",
          text: "Agents free up a lot of your time, so you're not responsible for tasks like coordinating open houses, listing your home, marketing, etc."
        },
        {
          label: "Professional expertise.",
          text: "MustWants Pro Agents understand your experience and can help reduce the stress related to the selling process, understanding the market, and answering buyer questions"
        },
        {
          label: "Valuable engagement.",
          text: "Set the price, negotiate directly with buyers, and manage the entire transaction yourself"
        }
      ]
    },
    {
      title: "For Sale by Owner",
      content: [
        {
          label: "Save money.",
          text: "Avoid the typical commission fee that real estate agents charge"
        },
        {
          label: "Increased flexibility.",
          text: "Schedule showings and handle inquiries on your own time"
        },
        {
          label: "Increased engagement.",
          text: "Set the price, negotiate directly with buyers, and manage the entire transaction yourself"
        }
      ]
    }
  ]
}
const sellingProcess = {
  title: "Selling Process",
  content: [
    {
      title: "Price your home",
      content:
        "Research comparable homes in your area to determinate the appropriate listing price for your property. Online resources, recent sales data, and professional appraisals can help determine the right place."
    },
    {
      title: "Market your property",
      content:
        "Attract potential buyers by creating listings on MustWants, social media platforms, and signage in your neighborhood. Professional photos and detailed descriptions can help showcase your home effectively."
    },
    {
      title: "Show your home",
      content:
        "Schedule open houses and private showings to allow interested buyers to view your property. Be prepared to answer questions and highlight the features of your home during these showings."
    },
    {
      title: "Negotiate offers",
      content:
        "When you receive offers from interested buyers, carefully review them and negotiate terms as needed. Be prepared to counteroffer and negotiate the price, contingencies, and closing timeline."
    },
    {
      title: "Complete paperwork",
      content:
        "Once you've accepted an offer, you'll need to complete various paperwork, including the sales contract, disclosures, and any other legal documents required in your area. It's essential to comply with all legal regulations and ensure that the transaction is conducted properly."
    },
    {
      title: "Close the sale",
      content:
        "Work with the buyer, their agent (if applicable), and a title company or real estate attorney to finalize the sale. This involves coordinating inspections, appraisals, and any necessary repairs, as well as signing the final documents at the closing table."
    }
  ]
}

