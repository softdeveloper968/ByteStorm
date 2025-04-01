import {needsLicense} from "@/app/list-a-home/common/licensesTools"
import {isRenting} from "@/app/list-a-home/common/list-your-home/ListingStateBar"
import OptionComponent, {addressConverter, detailsConverter, enumTraductor} from "@/app/list-a-home/common/OptionComponent"
import SpanStatus from "@/app/list-a-home/common/SpanStatus"
import {listingLicensesStore, refreshData} from "@/app/list-a-home/common/store"
import {useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import React, {useEffect, useState} from "react"
import {FaEdit, FaRegTrashAlt} from "react-icons/fa"

export const ListingDiv = ({
  listing,
  isEditing,
  changeListings,
  changeListingState,
  deleteHouse,
  licenses,
}) => {
  const store = listingLicensesStore();
  const route = isRenting() ? "rent" : "sale";
  const router = useRouter();
  const { data: session } = useSession();
  const [needsUpdate, setNeedsUpdate] = useState(true);
  useEffect(() => {
    if (needsUpdate) {
      refreshData(session);
      setNeedsUpdate(() => false);
    }
  }, [needsUpdate]);
  const listingName = listing?.general?.nickname
    ? listing.general.nickname
    : "Not named yet";
  const forSale =
    listing.price.forRent && listing.price.price !== null
      ? "For sale / rent"
      : listing.price.forRent
        ? "For rent"
        : "For sale";
  const propertyStatus = () => {
    if (changeListingState.length > 0) {
      const newState = changeListingState.filter(
        (stat) => stat._id === listing._id,
      );
      if (newState.length > 0) return newState[0].propertyStatus;
    }

    return loading();
  };
  const setPropertyStatus = (value) => {
    let prevListingStateStat = changeListingState.filter(
      (list) => list._id === listing._id,
    )[0];
    let newListingState = {
      _id: listing._id,
      status: prevListingStateStat.status,
      propertyStatus: value,
    };
    changeListings([
      ...changeListingState.filter((list) => list._id !== listing._id),
      newListingState,
    ]);
  };
  function loading() {
    // setTimeout(() => {
    //   if (!needsUpdate) {
    //     setNeedsUpdate(true);
    //   }
    // }, 5000);
    return "loading";
  }

  function status() {
    if (changeListingState.length > 0) {
      const newState = changeListingState.filter(
        (stat) => stat._id === listing._id,
      );
      if (newState.length > 0) return newState[0].status;
    }
    store.refreshData(session, true);

    return loading();
  }

  function setStatus(value) {
    let prevListingStateStat = changeListingState.filter(
      (list) => list._id === listing._id,
    )[0];
    let newListingState = {
      _id: listing._id,
      status: value,
      propertyStatus: prevListingStateStat.propertyStatus,
    };
    changeListings([
      ...changeListingState.filter((list) => list._id !== listing._id),
      newListingState,
    ]);
  }
  const constrainedOptions = ["in_progress", "in_review"].includes(status())
    ? [status()]
    : ["active", "inactive"];
  const handleToDraft = () => {
    const token = session?.user.token;
    const submitURL = `${process.env.NEXT_PUBLIC_API_URL}/listings/todraft`;
    fetch(submitURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: listing._id }),
    })
      .then((res) => {
        res.json().then((list) => {
          const isRenting = list.price.forRent;
          router.replace(
            `/list-a-home/for-${isRenting ? "rent" : "sale"}-by-owner/list-your-home?object=${JSON.stringify(list)}`,
          );
        });
      })
      .catch((e) => console.log(e));
  };
  const handleDelete = () => {
    const userid = session?.user._id;
    const token = session?.user.token;
    const route = isRenting() ? "rent" : "sale";
    const submitURL = `${process.env.NEXT_PUBLIC_API_URL}/listings/add`;
    try{
      fetch(submitURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...listing, user: userid }),
      }).then((res) => {
        if (res.status === 200) {
          changeListings(
            changeListingState.filter((list) => list._id !== listing._id),
          );
          deleteHouse();
          router.replace(`/list-a-home/for-${route}-by-owner?deleted=true`);
        }
      })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }

  };
  const selectStyle = {
    border: "2px solid rgba(236, 236, 236, 1)",
  };
  const trashStyle = {
    cursor: "pointer",
  };
  const needLicense = needsLicense(store.licenses, store.listings, listing);
  const activeDisabled = () => {
    return (
      ["in_review", "in_progress"].includes(status().toLowerCase()) ||
      needLicense
    );
  };

  return (
    <div>
      <div className={"relative w-full shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"}>
        <div
          style={{
            aspectRatio: "3 / 2",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundImage: listing?.photos ? [0] && `url(${listing.photos[0]})` : "",
            backgroundColor: "rgba(231, 231, 231, 1)",
          }}
        >
          <div
            className={
              "my-4 flex justify-between ml-3 items-center absolute w-11/12"
            }
          >
            <SpanStatus
              text={status()}
              licenses={licenses}
              needsLicense={needLicense}
              listing={listing}
            />
            {isEditing && status() === "in_progress" && (
              <FaRegTrashAlt
                size={25}
                color={"red"}
                style={trashStyle}
                onClick={() => {
                  handleDelete();
                }}
              />
            )}
            {isEditing && ["active", "inactive"].includes(status()) && (
              <FaEdit
                size={25}
                color={"red"}
                style={trashStyle}
                onClick={() => {
                  handleToDraft();
                }}
              />
            )}
          </div>
        </div>
        <div
          className={"w-full pb-4"}
          style={isEditing ? {cursor: "pointer"} : {}}
          onClick={() => {
            if (status() === "in_progress") {
              router.replace(
                `/list-a-home/for-${route}-by-owner/list-your-home?object=${JSON.stringify(listing)}`,
              );
            }
          }}
        >
          <h6 className={"text-end w-full px-2 mt-1"}>
            {enumTraductor(propertyStatus())}
          </h6>
          <h4 className={"mx-2 truncate"}>
            {listingName} - {forSale}
          </h4>
          <LabelText text={detailsConverter(listing)}/>
          <LabelText text={addressConverter(listing)}/>
        </div>
      </div>
      {isEditing && (
        <div className={"mt-4"}>
          <h4>Active / Inactive</h4>
          <select
            style={selectStyle}
            className={"w-full"}
            disabled={activeDisabled()}
            defaultValue={status()}
            onChange={(e) => setStatus(e.target.value)}
          >
            {constrainedOptions.map((stat, index) => (
              <OptionComponent option={stat} key={stat + index}/>
            ))}
          </select>
          <h4>Property Status</h4>
          <select
            style={selectStyle}
            disabled={["in_review"].includes(status().toLowerCase())}
            className={"w-full"}
            defaultValue={propertyStatus()}
            onChange={(e) => {
              setPropertyStatus(e.target.value);
            }}
          >
            {[
              "active",
              "sold",
              "rented_pending",
              "accepting_backup_offers",
              "off_market",
            ].map((stat, index) => (
              <OptionComponent option={stat} key={stat + index}/>
            ))}
          </select>
        </div>
      )}
    </div>
  )
};
const LabelText = ({ text }) => (
  <p style={{ fontFamily: "Roboto" }} className={"mx-2 truncate"}>
    {text}
  </p>
);
