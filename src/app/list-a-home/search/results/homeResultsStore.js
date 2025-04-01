import {create} from "zustand"

/**
 *
 * @type {UseBoundStore<Mutate<StoreApi<void>, []>>}
 */
const useHomeResultsStore = create((set, get) => ({
  houses: [],
  houseDetails: null,
  token: null,
  location: {
    address: "United States",
    geometry: {
      lat: 38.7945952,
      lng: -106.5348379
    },
    bounds: {
      minLat: 33.82160839009329,
      maxLat: 34.68903240990669,
      minLng: -119.0510348225548,
      maxLng: -118.18361477744521
    }
  },
  forSell: true,
  forRent: true,
  radius: 30,
  savedBO: [],
  getResults: async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get().token}` // DEBT: the endpoing is public
      },
      body: JSON.stringify({
        location: get().location,
        forSell: get().forSell,
        forRent: get().forRent,
        radius: get().radius
      })
    }
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/searchMW`, options)
      .then((res) => res.json())
      .then((res) => {
        set((state) => ({
          ...state,
          houses: res.houses,
          location: {
            ...state.location,
            bounds: res.bounds
          }
        }))
      })
      .catch((err) => console.log(err))
  },
  changeHouseDetails: (houseDetails) => {
    set((state) => ({
      ...state,
      houseDetails: houseDetails
    }))
  },
  saveBO: async ({id, save}) => {
    const body = {
      save,
      id
    }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/save_bo`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get().token}`
      }
    }).then(res => res.json())
      .then(res => {
        if (res.length > 0) set({savedBO: res})
        else set({savedBO: []})
      })
      .then(_ => get().savedBO)
      .catch(_ => set({savedBO: []}))
  },
  updateSavedBO: async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/save_bo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get().token}`
      }
    }).then(res => res.json())
      .then(res => {
        if (res.length > 0) set({savedBO: res})
        else set({savedBO: []})
      })
      .then(_ => get().savedBO)
      .catch(_ => set({savedBO: []}))
  },
  setState: async (newState) => {
    set((state) => ({
      ...state,
      ...newState
    }))

    await get().getResults()
  },
  logOut: () => set({houses: [], savedBO: [], token: null}),
}))
export default useHomeResultsStore
