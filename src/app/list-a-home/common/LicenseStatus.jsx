import { feedbackLicense, sortLicenses } from "@/app/list-a-home/common/licensesTools";
import { isRenting } from "@/app/list-a-home/common/list-your-home/ListingStateBar";
import { listingLicensesStore } from "@/app/list-a-home/common/store";
import { handleSubscription } from "@/app/list-a-home/common/stripe";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const LicenseStatus = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const store = listingLicensesStore();
  const style = {
    display: props.show ? "flex" : "none",
    position: "absolute",
    backgroundColor: props.backgroundColor,
  };
  // useEffect(() => {
  //   store.refreshData(session);
  // }, [session?.user._id, session?.user.token, session]);
  return (
    <div
      className={"drop-shadow-sm shadow-green-950 top-10 px-4 py-2 rounded-xl"}
      style={style}
    >
      {props.licenseStatus
        .filter((license) => ["active", "canceled"].includes(license.status))
        .sort(sortLicenses)
        .map((license, index) => {
          if (index > 0) {
            return;
          }
          const route = isRenting() ? "rent" : "sale";
          let { feedback, clickLabel } = feedbackLicense(license);
          return (
            <span key={index} className={"font-bold w-max"}>
              {feedback}
              <span
                className={"underline cursor-pointer"}
                onClick={() => {
                  handleSubscription(license, session?.user.token, router).then(
                    (_) => {
                      props.closeDialog();
                      router.replace(`for-${route}-by-owner?edit=true`);
                    },
                  );
                }}
              >
                <br />
                {clickLabel}
              </span>
            </span>
          );
        })}
    </div>
  );
};

export default LicenseStatus;
