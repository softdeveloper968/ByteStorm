"use client";

import useHomeResultsStore from "@/app/list-a-home/search/results/homeResultsStore"
import {signOut, useSession} from "next-auth/react"
import Link from "next/link"
import {useRouter} from "next/navigation"
import React from "react"

export default function SignInButton({ setOpen }) {
  const { data: session } = useSession();

  const useStore = useHomeResultsStore()
  const handleOpenToggle = () => {
    if (setOpen) {
      setOpen((prev) => !prev);
    }
  };

  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-x-4 gap-y-2 lg:flex-row sm:flex-col ">
        {session && session.data !== null && (
          <>
            <Link href="/dashboard">
              <div
                className="text-mw_green w-28 lg:text-sm sm:text-lg sm:text-center truncate "
                onClick={handleOpenToggle}
              >
                {session?.user.name}
              </div>
            </Link>

            <div onClick={handleOpenToggle}>
              <button
                className="bg-mw_red text-white rounded-full w-28 px-4 py-1 hover:text-mw_gray hover-scale-btn"
                onClick={() => {
                  signOut({ redirect: false }).then(() => {
                    useStore.logOut()
                    router.push("/");
                  });
                }}
              >
                Log Out
              </button>
            </div>
          </>
        )}

        {!session && (
          <div onClick={handleOpenToggle}>
            <button
              className="flex site-nav_link justify-center items-center text-black rounded-full w-28 ml-6 py-2 px-4 md:inline-flex primary-button-hover"
              onClick={() => router.push("/login")}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </>
  );
}
