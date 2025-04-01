import {unstable_noStore as noStore} from "next/cache"
import {useEffect, useState} from "react"
import {create} from "zustand"
import {persist} from "zustand/middleware"

export const listingLicensesStore = create(
  persist(
    (set, get) => ({
      licenses: [],
      drafts: [],
      listings: [],
      lastUpdated: 0,
      clear: ()=>set({
        licenses: [],
        drafts: [],
        listings: [],
        lastUpdated: 0,
      }),
      refreshData: async (session, force) => {
        noStore();
        const forced = force || Date.now() - get().lastUpdated > 10000;
        if (!session || !forced) return false;

       return fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/getListings`, {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify({ _id: session?.user._id }),
        })
          .then((res) => res.json())
          .then((res) => {
            get().setListings(res.globalListings);
            get().setDrafts(res.listings);
            get().setLicenses(res.licenses);
            set({lastUpdated: Date.now()});

            return true
          })
          .catch((err) => {
            console.log(err)
            return false
          });
      },
      setLicenses: (licenses) =>
        set({
          licenses: licenses,
        }),
      setDrafts: (drafts) =>
        set({
          drafts: drafts,
        }),
      setListings: (listings) =>
        set({
          listings: listings,
        }),
    }),
    {
      name: "listings",
    },
  ),
);
const HydrationZustand = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};
/**
 * refresh the store for the listings
 * @param session next session, is required for auth
 * @param store store to update
 */
export const refreshData = (session, store) => {
  noStore();
  if (!session) return
  const userId = session?.user._id;
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/getListings`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token}`,
    },
    body: JSON.stringify({ _id: userId }),
  })
    .then((res) => res.json())
    .then((res) => {
      store.setListings(res.globalListings);
      store.setDrafts(res.listings);
      store.setLicenses(res.licenses);
    })
    .catch(() => {})
};

export default HydrationZustand;
