"use client";
import {isRenting} from "@/app/list-a-home/common/list-your-home/ListingStateBar"
import {ListingDiv} from "@/app/list-a-home/common/ListingDiv"
import {Notification} from "@/app/list-a-home/common/Notification"
import {listingLicensesStore} from "@/app/list-a-home/common/store"
import {useSession} from "next-auth/react"
import Link from "next/link"
import {useRouter} from "next/navigation"
import React, {useState} from "react"
import {FiEdit} from "react-icons/fi"
const WithHouses = ({
  houses,
  newListing,
  editted,
  deleted,
  setHouses,
  globalHouses,
  licenses,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const store = listingLicensesStore();
  const [editListings, setEditListings] = useState(false);
  const initialGlobalHouses = [...globalHouses];
  const initialHousesStats = houses.map((listing) => ({
    _id: listing._id,
    status: listing.status,
    propertyStatus: listing.propertyStatus,
  }));
  const [listingState, setListingState] = useState(initialHousesStats);
  const [globalListingState, setGlobalListingState] = useState(globalHouses);
  const savehandler = () =>
    saveHandler(
      session,
      listingState,
      globalListingState,
      router,
      () => {
        setEditListings(false);
      },
      bodyMerger(
        initialHousesStats,
        listingState,
        initialGlobalHouses,
        globalListingState,
      ),
    );
  const spanTextStyle = {
    color: "rgba(242, 3, 89, 1)",
    fontFamily: "Roboto",
    cursor: "pointer",
    fontWeight: 400,
  };
  //   useEffect(() => {
  //     store.refreshData(session);
  // }, [session?.user._id, session?.user.token, editListings]);
  return (
    <div
      style={{ color: "black" }}
      className={"bg-white py-8 flex flex-col px-8 relative"}
    >
      {(newListing || editted || deleted) && (
        <Notification new={newListing} edit={editted} deleted={deleted} />
      )}
      <div className={"flex justify-between pb-3"}>
        <h2 style={{ marginTop: 0 }} className={"mb-8"}>
          Listed Homes
        </h2>
        {editListings ? (
          <div className={"flex items-center justify-center font-bold"}>
            <h5
              onClick={() => savehandler()}
              style={{ ...spanTextStyle, fontWeight: 600 }}
            >
              Save
            </h5>
            <span className={"mx-2"}>|</span>
            <h5
              onClick={() => setEditListings(false)}
              style={{ ...spanTextStyle, color: "black", fontWeight: 600 }}
            >
              Cancel
            </h5>
          </div>
        ) : (
          <div className={"flex items-center justify-between"}>
            <Link
              href={`/list-a-home/for-${isRenting() ? "rent" : "sale"}-by-owner/list-your-home`}
            >
              <h5>Add listing</h5>
            </Link>
            <span className={"mx-2"}>|</span>
            <div
              className={"flex cursor-pointer"}
              onClick={() => setEditListings(true)}
            >
              <h5>Edit</h5>
              <FiEdit className={"ml-2"} />
            </div>
          </div>
        )}
      </div>
      <div className={"flex flex-col gap-4 lg:grid lg:grid-cols-4 pb-8 mx-8"}>
        {initialGlobalHouses.map((house, index) => {
          return (
            <ListingDiv
              changeListings={setGlobalListingState}
              changeListingState={globalListingState}
              listing={house}
              deleteHouse={() => {}}
              isEditing={editListings}
              key={`${house.nickname}house${index}`}
              licenses={licenses.filter((license) =>
                [house._id, house.listingId].includes(license.attachedTo),
              )}
            />
          );
        })}
        {houses.map((house, index) => (
          <ListingDiv
            licenses={licenses.filter((license) =>
              [house._id, house.listingId].includes(license.attachedTo),
            )}
            deleteHouse={() => {
              setHouses(houses.filter((item) => item._id !== house._id));
            }}
            changeListings={setListingState}
            changeListingState={listingState}
            listing={house}
            isEditing={editListings}
            key={`${house.nickname}house${index}`}
          />
        ))}
        {/*<AddNewHome/>*/}
      </div>
    </div>
  );
};
export default WithHouses;

/**
 * This function merge in one list the two different data structures, so they can be accepted in the server.
 * @param initialHousesStats
 * @param drafts
 * @param initialGlobalHouses
 * @param published
 * @return {[]}
 */
function bodyMerger(
  initialHousesStats,
  drafts,
  initialGlobalHouses,
  published,
) {
  let body = [];
  for (let listingStateElement of drafts) {
    const initial = initialHousesStats.filter(
      (init) => init._id === listingStateElement._id,
    )[0];
    if (
      initial.status !== listingStateElement.status ||
      initial.propertyStatus !== listingStateElement.propertyStatus
    ) {
      body.push({
        ...listingStateElement,
        isGlobalHouse: false,
      });
    }
  }

  for (let listingStateElement of published) {
    const initial = initialGlobalHouses.filter(
      (init) => init._id === listingStateElement._id,
    )[0];
    if (
      initial.status !== listingStateElement.status ||
      initial.propertyStatus !== listingStateElement.propertyStatus
    ) {
      body.push({
        ...listingStateElement,
        isGlobalHouse: true,
      });
    }
  }

  return body;
}
const saveHandler = (
  session,
  listingState,
  globalListingState,
  router,
  closeEdit,
  body,
) => {
  const token = session.user.token;
  const submitURL = `${process.env.NEXT_PUBLIC_API_URL}/listings/edit`; // accept a list of elements.
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  if (body.length > 0) {
    const bodyWithUserId = body.map((listing) => ({
      ...listing,
      user: session.user._id,
    }));
    fetch(submitURL, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyWithUserId),
    }).then((res) => {
      switch (res.status) {
        case 201: {
          router.replace("/list-a-home/for-sale-by-owner?edit=true");
          closeEdit();
          break;
        }
        default:
          closeEdit();

          return;
      }
    });
  }
};
const AddNewHome = (props) => {
  const addNewHomeBtnStyle = {
    borderRadius: "5px",
    fontFamily: "Roboto",
    backgroundColor: "rgb(0, 123, 255)",
    color: "white",
    padding: "0.5rem",
    fontWeight: "bold",
  };
  return (
    <Link
      href="/list-a-home/for-sale-by-owner/list-your-home"
      className={
        "w-full shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] aspect-[3/2] flex items-center justify-center"
      }
    >
      <div style={{ aspectRatio: "3 / 2" }}>
        <button style={addNewHomeBtnStyle}>Add Listing</button>
      </div>
    </Link>
  );
};
