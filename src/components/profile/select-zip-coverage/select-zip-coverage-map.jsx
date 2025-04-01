"use client";

import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import BaseMarkersDropdown from "@/components/military-base-markers/base-markers-dropdown";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, { Layer, Popup, Source } from "react-map-gl";
import DraggablePopup from "./draggable-popup";
import styles from "./map-popup.module.css";
import {
  zipFillLayer,
  zipHighlightLayer,
  zipSelectedLayer,
} from "./map-styles";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxToken = process.env.NEXT_PUBLIC_API_MAPBOX;

const initialViewState = {
    longitude: -98.583333,
    latitude: 39.833333,
    projection: "mercator",
    zoom: 3.5,
    minZoom: 1.0,
    maxZoom: 22
};

export default function SelectZipCoverageMap({ startZip, selectedZip, setSelectedZip, closeModal }) {
    const mapRef = useRef(null);
    const hasFlownToInitialZip = useRef(false);

    const [initialView] = useState(initialViewState);
    const [mapStyle] = useState("mapbox://styles/mapbox/light-v11");

    const [selectedArea, setSelectedArea] = useState(null);
    const [isHoveringControl, setIsHoveringControl] = useState(false);

    const [zipHoverInfo, setZipHoverInfo] = useState(null);
    

    // Get latitude and longitude from Mapbox api using zip code.
    const geocodeZipCode = async (zipCode) => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/search/geocode/v6/forward?q=${zipCode}&country=us&access_token=${mapboxToken}`
            );
            const data = await response.json();

            // console.log("Geocoding response:", data);

            if (data.features && data.features.length > 0) {
                const [longitude, latitude] = data.features[0].geometry.coordinates;

                // console.log(`Coordinates for ${zipCode}:`, { latitude, longitude });
                
                return { latitude, longitude };
            } else {
                throw new Error("Location not found for zip code " + zipCode);
            };
        } catch (error) {
            console.error("Error in geocodeZipCode:", error);
            throw error;
        };
    };

    // Make sure map only flys to location on load, not when first zip code in coverage changes.
    const flyToZipCode = useCallback(async (zipCode) => {
        try {
            const { latitude, longitude } = await geocodeZipCode(zipCode);

            if (mapRef.current) {
                mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom: 8.0,
                    essential: true
                });
            };
        } catch (error) {
            console.error("Error flying to location:", error);
        };
    }, [mapRef]);

    // Call flyToZipCode only once on initial load
    useEffect(() => {
        if (!hasFlownToInitialZip.current && startZip) {
            flyToZipCode(startZip);
            hasFlownToInitialZip.current = true; // Mark as flown
        };
    }, [flyToZipCode, startZip]);


    // Handle hover effect for ZIP codes
    const onZipHover = useCallback(
        (event) => {
            const zip = event.features && event.features[0];
            const zipNumber = zip && zip.properties.ZCTA5CE20; // Use ZCTA5CE20 for ZIP codes

            if (zip) {
                setZipHoverInfo({
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                    ZIP: zipNumber, // Store ZIP code
                });
            } else {
                setZipHoverInfo(null);
            }
        },
        []
    );

    // Handle state click for selecting/deselecting
    const onZipClick = useCallback(
        (event) => {
            const zip = event.features && event.features[0];
            const zipNumber = zip && zip.properties.ZCTA5CE20;

            if (zipNumber) {
                setSelectedZip((prevSelected) => {
                    // Toggle the state in the selected array
                    if (prevSelected.includes(zipNumber)) {
                        return prevSelected.filter((s) => s !== zipNumber);
                    } else {
                        return [...prevSelected, zipNumber];
                    };
                });
            };
        },
        [setSelectedZip]
    );

    // Filters for hover effect
    const hoverZip = (zipHoverInfo && zipHoverInfo.ZIP) || '';

    // Filter for highlighted zip (on hover)
    const zipFilter = useMemo(() => {
        if (hoverZip) {
            return ['in', 'ZCTA5CE20', hoverZip]; // Filter based on ZCTA5CE20 (ZIP code)
        } else {
            return ['==', 'ZCTA5CE20', '']; // Default filter for no ZIP hover
        }
    }, [hoverZip]);

    // Filter for selected states
    const selectedZipFilter = useMemo(() => {
        return ['in', 'ZCTA5CE20', ...selectedZip];
    }, [selectedZip]);


    return (
        <div className="flex flex-col w-full h-full">
            <h3 className="mb-3">
                Choose a military installation or zoom into your desired area to see zip code boundaries.
            </h3>

            <Map
                initialViewState={initialViewState}
                minZoom={2}
                mapStyle={mapStyle}
                mapboxAccessToken={mapboxToken}
                interactiveLayerIds={["zip-fill"]}
                onMouseMove={onZipHover}
                onClick={onZipClick}
                ref={mapRef}
                style={{ borderRadius: 8 }}
                // onLoad={() => {
                //     console.log("Map loaded");
                //     setMapReady(true);
                // }}
            >
                <Source type="vector" url="mapbox://mustwants.93czo4tl">
                    <Layer
                        id="zip-fill"
                        beforeId="waterway-label"
                        {...zipFillLayer}
                    />

                    <Layer
                        id="zip-highlight"
                        beforeId="waterway-label"
                        {...zipHighlightLayer}
                        filter={zipFilter}
                    />

                    <Layer
                        id="zip-highlight"
                        beforeId="waterway-label"
                        {...zipSelectedLayer}
                        filter={selectedZipFilter}
                    />
                </Source>

                {hoverZip && (
                    <Popup
                        offset={25}
                        anchor="bottom"
                        latitude={zipHoverInfo.latitude}
                        longitude={zipHoverInfo.longitude}
                        closeButton={false}
                        closeOnClick={false}
                    >
                        <h3
                            className={styles.popupTitle}
                            style={{ backgroundColor: "#0000FF" }}
                        >
                            Zip Code:
                        </h3>

                        <div className="flex flex-col bg-slate-200 text-black rounded-b-lg px-2 py-1">
                            <p className="text-center font-bold">
                                {hoverZip}
                            </p>
                        </div>
                    </Popup>
                )}

                {/* Custom controls */}
                <div className="absolute top-2 left-0 right-0 hidden lg:block">
                    <ZoomLevelDisplay
                        mapRef={mapRef}
                        initialView={initialView}
                    />
                </div>

                <div
                    className="absolute top-2 right-2"
                    onMouseEnter={() => setIsHoveringControl(true)}
                    onMouseLeave={() => setIsHoveringControl(false)}
                >
                    <BaseMarkersDropdown
                        mapRef={mapRef}
                        setSelectedArea={setSelectedArea}
                    />
                </div>

                {/* Draggable window for selected zip codes */}
                <DraggablePopup>
                    <div
                        className="absolute bg-white text-black w-48 rounded p-2 cursor-move"
                        style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
                    >
                        <h4 className="text-center font-bold mb-2">
                            Please Select at Least<br />
                            One (1) Zip Code
                        </h4>

                        <div className="h-48 text-sm mb-4 overflow-auto">
                            {selectedZip.length > 0 ? (
                                selectedZip
                                    .slice()
                                    .sort()
                                    .map((zip, index) => (
                                        <p key={index}>{zip}</p>
                                    ))
                            ) : (
                                <p className="text-center text-mw_red">
                                    No zip codes selected
                                </p>
                            )}
                        </div>

                        <button
                            className="bg-mw_olive hover-scale-btn text-white rounded-xl w-36 h-8"
                            onClick={closeModal}
                        >
                            Finished
                        </button>
                    </div>
                </DraggablePopup>
            </Map>
        </div>
    );
};
