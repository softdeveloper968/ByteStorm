"use client";

import { parserPhoneNumber } from "@/app/usignup/phoneNumber";
import useSafeStore from "@/app/usignup/safeStore";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const userStore = useSafeStore();

  return (
    <Suspense
      fallback={<p className="text-center py-2">Loading User Data ...</p>}
    >
      <main
        className="
				flex
				flex-col
				bg-mwm_white
				text-galaxy_black-700
				h-screen
				w-full
				pt-16
			"
      >
        <h1 className="font-bold text-center text-3xl mt-12 mb-16">
          User Dashboard
        </h1>

        {status !== "authenticated" && (
          <p className="text-paradise_pink-900 text-center text-3xl">
            Must be logged in to view.
          </p>
        )}

        {session?.user && (
          <div className="flex flex-col items-center">
            {userStore.suggestedPassword && (
              <h4>
                Welcome {session.user.name}. Thank you for joining the Must
                Wants Community.
              </h4>
            )}
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <p>
              {session?.user.phone && parserPhoneNumber(session?.user.phone)}
            </p>
            <p>{session.user.address}</p>
            <p>{session.user.brokerage}</p>
          </div>
        )}

        {session?.user.userRole === "realtor" && redirect("/agent")}

        {session?.user.userRole === "lender" && redirect("/lender")}

        {session?.user.userRole === "user" && redirect("/buyer")}
      </main>
    </Suspense>
  );
};
