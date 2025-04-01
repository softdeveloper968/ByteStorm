import { PlaceResult } from "@/app/list-a-home/search/page";
import useHomeResultsStore from "@/app/list-a-home/search/results/homeResultsStore";
import { config } from "@/app/usignup/config";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export function SearchOnMap() {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    debounce: 600,
  });
  const useStore = useHomeResultsStore();
  const inputStyle = {
    width: "60%",
    minWidth: "22rem",
    backgroundColor: config.colors.background,
    display: "flex",
    margin: "0.35rem 0.6rem 0.25rem 0.45rem ",
    padding: "0.35rem",
    justifyContent: "start",
    alignItems: "start",
    borderRadius: "5px",
    cursor: "text",
  };
  const [submitted, setSubmitted] = useState(false);
  const [forSell, setForSell] = useState(true);
  const [forRent, setForRent] = useState(true);
  const [places, setPlaces] = useState([]);
  const [location, setLocation] = useState({
    address: useStore.location.address,
  });
  const maxResults = 5;
  const { data: session } = useSession();
  const containerRef = useRef(null);
  useEffect(() => {
    const leftMargin = document.querySelector("div#left-bar").clientWidth ?? 0;
    const topMargin = document.querySelector("div#top-bar").clientHeight ?? 0;
    if (containerRef.current) {
      containerRef.current.style.left = `calc(${leftMargin}px + 1.5rem)`;
      // containerRef.current.style.top = `calc(${topMargin}px + 1.5rem)`
      containerRef.current.style.top = "calc(1.5rem)";
    }
    if (useStore.token !== session?.user?.token)
      useStore.setState({ token: session?.user.token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (places.length !== 0) setPlaces([]);

    if (placePredictions.length > 0) {
      for (let i = 0; i < maxResults; i++) {
        try {
          placesService?.getDetails(
            {
              placeId: placePredictions[i].place_id,
            },
            (placeDetails) => {
              setPlaces((prev) => [
                ...prev,
                {
                  address: placeDetails?.formatted_address ?? "",
                  geometry: {
                    lat: placeDetails?.geometry?.location?.lat() ?? 0,
                    lng: placeDetails?.geometry?.location?.lng() ?? 0,
                  },
                },
              ]);
            },
          );
        } catch (e) {}
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placePredictions]);
  const [notFound, setNotFound] = useState(false);
  useHomeResultsStore.subscribe((state) => {
    if (submitted && state.houses.length === 0) {
      setNotFound(true);
      setSubmitted(false);
    }

    if (submitted && state.houses.length > 0) {
      setNotFound(false);
      setSubmitted(false);
    }
  });
  const [inputIsOnResults, setInputIsOnResults] = useState(false);

  async function handleSubmit() {
    const isForSaleOrRent = forRent || forSell;
    const filteredLocations = places.filter(
      (place) => place.address === location.address,
    );
    const locationWithCoords = filteredLocations[0] ?? places[0];
    const body = {
      forSell,
      forRent,
      location: locationWithCoords,
      radius: 30,
      houses: [],
    };
    if (isForSaleOrRent && inputIsOnResults) {
      useStore.setState(body);
      setNotFound(false);
      setSubmitted(true);
    }
  }

  function handleClick(e) {
    setLocation(() => ({ address: e.textContent }));
    setInputIsOnResults(true);
  }

  function handleChange(e) {
    setNotFound(false);
    setSubmitted(false);
    setInputIsOnResults(false);
    setLocation((prevState) => ({
      ...prevState,
      address: e.target.value,
    }));

    getPlacePredictions({
      input: e.target.value,
      region: "us",
      // types: ["(cities)"],
    });
  }

  function handleKeyDown(e) {
    if (["Tab", "Enter"].includes(e.key) && places.length > 0) {
      e.preventDefault();
      setLocation(places[0]);
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        zIndex: 1,
        color: config.colors.black,
      }}
    >
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            className={"shadow-lg"}
            style={inputStyle}
            type="text"
            placeholder="Search for a house"
            onChange={handleChange}
            value={location.address}
            onKeyDown={handleKeyDown}
          />
          {places
            .map((place) => place.address.toLowerCase())
            .includes(location.address.toLowerCase()) && (
            <button
              className={"shadow-lg rounded"}
              style={{
                backgroundColor: config.colors.brandYellow,
                padding: "0.25rem 1rem",
                margin: 0,
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              onClick={handleSubmit}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              type="button"
            >
              Search
            </button>
          )}
        </div>
        <FeedbackFromSearch notFound={notFound} submitted={submitted} />
        {!places
          .map((place) => place.address.toLowerCase())
          .includes(location.address.toLowerCase()) &&
          places.map((place) => (
            <PlaceResult
              onClick={(e) => handleClick(e)}
              address={place.address}
              geometry={place.geometry}
              key={place.address}
            />
          ))}
      </div>
    </div>
  );
}

function FeedbackFromSearch(props) {
  return (
    <div
      style={{
        position: "absolute",
        width: "60%",
        minWidth: "22rem",
        backgroundColor: props.notFound ? config.colors.red : config.colors.brandGreen,
        color: props.notFound ? config.colors.brandYellow : config.colors.black,
        fontWeight: "bold",
        display: !props.notFound && !props.submitted ? "none" : "flex",
        margin: "0.35rem 0.6rem 0.25rem 0.45rem ",
        padding: "0.35rem",
        justifyContent: "start",
        alignItems: "start",
        borderRadius: "5px",
      }}
    >
      {!props.notFound && props.submitted
        ? "Loading..."
        : props.notFound
          ? "Nothing Found"
          : ""}
    </div>
  );
}
