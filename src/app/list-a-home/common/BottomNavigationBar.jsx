import { needsLicense } from "@/app/list-a-home/common/licensesTools";
import {
  isRenting,
  nextListingState,
  prevListingState,
} from "@/app/list-a-home/common/list-your-home/ListingStateBar";
import { Button } from "@/app/list-a-home/common/NavigationBtn";
import { listingLicensesStore } from "@/app/list-a-home/common/store";
import { submitWithCheckout } from "@/app/list-a-home/common/stripe";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BottomNavigationBar({
  setListingState,
  submit,
  data,
  setListingData,
}) {
  const router = useRouter();
  const [disable, setDisable] = useState(false);
  const route = isRenting() ? "rent" : "sale";
  const licensesState = listingLicensesStore();

  function submitNoLicense() {
    const token = session?.user.token;
    const submitURL = `${process.env.NEXT_PUBLIC_API_URL}/listings/submit`;
    fetch(submitURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, user: userid }),
    }).then((res) => {
      if (res.status <= 200 && res.status < 300) {
        router.replace(`/list-a-home/for-${route}-by-owner?ok=true`);
      } else {
        router.replace(`/list-a-home/for-${route}-by-owner`);
      }
      licensesState.refreshData(session);
    });
  }

  /**
   *
   * @param jsonData
   * @return {Promise<any>}
   */
  async function saveDraft(jsonData) {
    try {
      const token = session.user.token;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/listings/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jsonData),
        },
      );
      return response.json().then((res) => {
        const newData = { ...data };
        newData.listingId = res.id;
        setListingData(newData);
        licensesState.refreshData(session);
        return res.id;
      });
    } catch (error) {
      return "";
    }
  }

  const { data: session } = useSession();
  const userid = session?.user?._id;
  const handleSaveForLater = () => {
    saveDraft({ ...data, user: userid }).then((_) => {
      router.replace(`/list-a-home/for-${route}-by-owner`);
    });
  };
  const inReviewListings = licensesState.drafts.filter(
    (listing) => listing.status === "in_review",
  );
  const thisListingNeedsALicense = needsLicense(
    licensesState.licenses,
    [...licensesState.listings, ...inReviewListings],
    data,
  );
  const [checkoutVisibility, setCheckoutVisibility] = useState(false);
  const checkoutTheListing = () => {
    if (!data.listingId || !data._id) {
      saveDraft({ ...data, user: userid }).then((id) =>
        submitWithCheckout(
          session.user._id,
          id,
          session.user.token,
          isRenting(),
          router,
        ),
      );
    } else {
      submitWithCheckout(
        session.user._id,
        data.listingId,
        session.user.token,
        isRenting(),
        router,
      );
    }
  };
  const handleSubmission = () => {
    setDisable(true);
    if (thisListingNeedsALicense) {
      setCheckoutVisibility(true);
    } else {
      submitNoLicense();
    }
  };
  return (
    <div
      className={
        "my-6 lg:w-full lg:flex lg:justify-between flex-wrap-reverse flex gap-4"
      }
    >
      {checkoutVisibility ? (
        <ThisListingNeedsALicense checkout={() => checkoutTheListing()} />
      ) : (
        <>
          <Button
            disabled={disable}
            link={"Previous"}
            onClick={() => setListingState((prev) => prevListingState(prev))}
          />
          <div>
            <Button
              disabled={disable}
              link={"Save for later"}
              className={"px-6 mr-8"}
              onClick={() => handleSaveForLater()}
            />
            <Button
              // disabled={disable}
              id={"nextbtn"}
              link={disable ? "Submitted" : submit ? "Submit" : "Next"}
              onClick={() => {
                submit
                  ? handleSubmission()
                  : setListingState((prev) => nextListingState(prev));
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

const ThisListingNeedsALicense = ({ checkout }) => {
  const style = {
    backgroundColor: "white",
  };
  return (
    <div
      className={"flex w-full justify-between items-center text-justify"}
      style={style}
    >
      <div className={"w-full flex items-center justify-center flex-col"}>
        <p>Your First Home Listed was on MustWants!</p>
        <p>Additional listings are just $5-$10/month each.</p>
      </div>
      <Button link={"Checkout"} onClick={() => checkout()} />
    </div>
  );
};
