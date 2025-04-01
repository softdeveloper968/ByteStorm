"use client";

import {listingLicensesStore} from "@/app/list-a-home/common/store"
import {parserPhoneNumber} from "@/app/usignup/phoneNumber"
import useSafeStore, {suggestPassword} from "@/app/usignup/safeStore"
import {useSession} from "next-auth/react"
import Link from "next/link"
import {useEffect, useState} from "react"
import {FaClipboard} from "react-icons/fa"
import {MdOutlineAddHome, MdOutlineRealEstateAgent, MdOutlineSupportAgent} from "react-icons/md"
import {PiArticleMediumFill} from "react-icons/pi"
import {RiMobileDownloadLine} from "react-icons/ri"
import {TbHomeHand} from "react-icons/tb"

export default function Buyer() {
  const { data: session } = useSession();
  const userStore = useSafeStore();
  const store = listingLicensesStore()
  const [updatedPassword, setUpdatedPassword] = useState("");
  useEffect(() => {
    // fetch user information
    if (userStore.suggestedPassword !== "" && session && session.user) {
      suggestPassword(session.user.token, userStore.suggestedPassword).then(
        (res) => {
          // console.log("Before refresh", userStore);
          // console.log("response from the server: ", res);
          if (res) {
            setUpdatedPassword(userStore.suggestedPassword);
            userStore.refresh();
          }
        }
      );
    }
  }, [session]);
  // console.log("After Refresh", userStore);
  const paragraphClasses = "my-5";
  const iconSize = "3rem";
  return (
    <main className="flex flex-col bg-mw_white text-mw_black min-h-screen w-full pt-16 px-[15px] lg:px-12 pb-4 md:pb-24">
      <h1 className="text-center">Buyer Dashboard</h1>
      {session?.user.userRole !== "user" && (
        <p className="text-mw_red text-center text-3xl">
          Must be logged in as Buyer to view.
        </p>
      )}
      {session?.user.userRole === "user" && (
        <div className="flex flex-col items-center gap-y-14">
          <div className="text-center lg:text-start">
            <p className={paragraphClasses}>
              Welcome {session.user.name.split(" ")[0]}! Thank you for joining
              the MustWants Community.
            </p>
          </div>
          <div>
            {/* {userStore.suggestedPassword !== "" && updatedPassword && ( */}
            {updatedPassword !== "" && (
              <>
                <p>
                  Here is your login information. A password was created for
                  you.
                </p>
                <p className="italic">Please save it and keep it secret.</p>

                <p className="font-bold  mt-5">
                  Password: {updatedPassword}
                </p>
              </>
            )}
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <p>
              {session?.user.phone_number &&
                parserPhoneNumber(session?.user.phone_number)}
            </p>
            {/* {userStore.suggestedPassword !== "" && updatedPassword && ( */}
            {updatedPassword !== "" && (
              <>
                {/* <p> Password: {updatedPassword}</p> */}
                <p className="font-bold mt-5">
                  Click on any buttons to get started!
                </p>
              </>
            )}
          </div>
          <div className="flex justify-center gap-[20px] flex-wrap">
            <Card
              icon={<MdOutlineSupportAgent size={iconSize} />}
              title={"Vetted Agent"}
              link={"/find-a-pro/vetted-agents"}
            />
            <Card
              icon={<MdOutlineRealEstateAgent size={iconSize} />}
              title={"Vetted Lender"}
              link={"/find-a-pro/vetted-lenders"}
            />
            <Card
              icon={<PiArticleMediumFill size={iconSize} />}
              title={"Blogs"}
              link={"/blogs"}
            />
            <Card
              icon={<FaClipboard size={iconSize} />}
              title={"Checklists"}
              link={"/checklists"}
            />
            <Card
              title={"Download the app"}
              link={"/find-a-home/banner"}
              icon={<RiMobileDownloadLine size={iconSize} />}
            />
            <Card
              title={"Search FSBO/FRBO homes"}
              link={"/find-a-home"}
              icon={<TbHomeHand size={iconSize} />}
            />
            {store.listings.length > 0 || store.drafts.length > 0 &&
              <Card
                title={"My homes"}
                link={"/list-a-home/for-sale-by-owner"}
                icon={<MdOutlineAddHome size={iconSize}/>}
              />

            }
          </div>
          <div className="">
            If you have any questions, please use the chat or contact us at
            <a
              href="mailto:hello@mustwants.com"
              className="text-blue-600 underline ml-1"
            >
              hello@mustwants.com
            </a>
          </div>
          {/* <div className="w-96">
            <UpdatePassword />
          </div> */}
        </div>
      )}
    </main>
  );
}

function Card(props) {
  return (
    <Link
      href={props.link}
      className={
        "w-[47%] md:w-[170px] h-[160px] flex flex-col items-center justify-center bg-white text-mw_black rounded-lg px-4 py-4 agent-cards"
      }
    >
      {props.icon}
      <p className={"text-center"}>{props.title}</p>
    </Link>
  );
}
