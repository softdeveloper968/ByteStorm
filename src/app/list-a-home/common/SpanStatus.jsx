import LicenseStatus from "@/app/list-a-home/common/LicenseStatus";
import { validLicense } from "@/app/list-a-home/common/licensesTools";
import { isRenting } from "@/app/list-a-home/common/list-your-home/ListingStateBar";
import { enumTraductor } from "@/app/list-a-home/common/OptionComponent";
import { listingLicensesStore } from "@/app/list-a-home/common/store";
import { submitWithCheckout } from "@/app/list-a-home/common/stripe";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";

const SpanStatus = (props) => {
  const { data: session } = useSession();
  const inReviewColor = "rgba(255, 192, 70, 0.55)";
  const inProgressColor = "rgba(154, 181, 249, 0.56)";
  const inactiveColor = "rgba(179, 179, 179, 0.63)";
  const activeColor = "rgba(255, 255, 255, 0.6)";
  const licenseStatus = props.licenses
    .filter((license) => license.status !== "incomplete")
    .map((license) => license.currentPeriodEnd > Date.now() / 1000);
  let backgroundColor;

  switch (props.text) {
    case "active":
      backgroundColor = activeColor;
      break;
    case "inactive":
      backgroundColor = inactiveColor;
      break;
    case "in_review":
      backgroundColor = inReviewColor;
      break;
    default:
      backgroundColor = inProgressColor;
      break;
  }
  const borderRadius = "1rem";
  const expiredLicenseColor = "#bf4f76";
  const validLicenseColor = "#4a8d07";
  const creditCardColor = "#6c16ff";
  const [licenseDialog, setLicenseDialog] = useState(false);
  const store = listingLicensesStore();
  const router = useRouter();
  const closeDialog = () => {
    setLicenseDialog(false);
  };
  // useEffect(() => {
  //   store.refreshData(session);
  // }, [licenseDialog]);
  return (
    <div
      className={"flex items-center px-2 py-1 shadow-xl drop-shadow-lg"}
      style={{ backgroundColor, borderRadius }}
    >
      <span
        className={licenseStatus.length > 0 || props.needsLicense ? "me-2" : ""}
        style={{ fontWeight: "500", fontFamily: "roboto" }}
      >
        {enumTraductor(props.text)}
      </span>
      {props.licenses.filter((item) => validLicense(item)).length > 0 ? (
        <IconContext.Provider value={{ color: validLicenseColor }}>
          <FaCheckCircle
            onClick={(_) => setLicenseDialog(!licenseDialog)}
            className={"cursor-pointer"}
          />
          <LicenseStatus
            show={licenseDialog}
            licenseStatus={props.licenses}
            backgroundColor={backgroundColor}
            closeDialog={closeDialog}
          />
        </IconContext.Provider>
      ) : licenseStatus.length > 0 ? (
        <IconContext.Provider value={{ color: expiredLicenseColor }}>
          <LicenseStatus
            show={licenseDialog}
            licenseStatus={props.licenses}
            backgroundColor={backgroundColor}
            closeDialog={closeDialog}
          />
          <FaExclamationCircle
            className={"cursor-pointer"}
            onClick={(_) => setLicenseDialog(!licenseDialog)}
          />
        </IconContext.Provider>
      ) : props.needsLicense ? (
        <IconContext.Provider value={{ color: creditCardColor }}>
          <LicenseStatus
            show={licenseDialog}
            licenseStatus={props.licenses}
            backgroundColor={backgroundColor}
            closeDialog={closeDialog}
          />
          <FaCreditCard
            className={"cursor-pointer"}
            onClick={(_) => {
              submitWithCheckout(
                session?.user._id,
                props.listing._id,
                session?.user.token,
                isRenting(),
                router,
              );
            }}
          />
        </IconContext.Provider>
      ) : (
        ""
      )}
    </div>
  );
};

export default SpanStatus;
