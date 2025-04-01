"use client";

import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import { useCallback, useMemo, useRef, useState } from "react";
import Map, { Layer, Popup, Source } from "react-map-gl";
import DraggablePopup from "./draggable-popup";
import {
  stateFillLayer,
  stateHighlightLayer,
  stateSelectedLayer,
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

export default function SelectStateCoverageMap({ selectedStates, setSelectedStates, closeModal }) {
    const mapRef = useRef();
    const [initialView] = useState(initialViewState);
    const [mapStyle] = useState("mapbox://styles/mapbox/light-v11");

    const [stateHoverInfo, setStateHoverInfo] = useState(null);


    // Handle hover effect for states
    const onStateHover = useCallback(
        (event) => {
            const state = event.features && event.features[0];
            const stateName = state && state.properties.NAME;

            if (state) {
                setStateHoverInfo({
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                    STATE: stateName,
                });
            } else {
                setStateHoverInfo(null);
            }
        },
        []
    );

    // Handle state click for selecting/deselecting
    const onStateClick = useCallback(
        (event) => {
            const state = event.features && event.features[0];
            // const name = state && state.properties.NAME;
            const name = state && state.properties.STUSPS;

            if (name) {
                setSelectedStates((prevSelected) => {
                    // Toggle the state in the selected array
                    if (prevSelected.includes(name)) {
                        return prevSelected.filter((s) => s !== name);
                    } else {
                        return [...prevSelected, name];
                    }
                });
            }
        },
        [setSelectedStates]
    );

    // Filters for hover effect
    const hoverState = (stateHoverInfo && stateHoverInfo.STATE) || '';

    // Filter for highlighted state (on hover)
    const stateFilter = useMemo(() => {
        if (hoverState) {
            return ['in', 'STATEFP', hoverState]; // Filter based on STATEFP (state code)
        } else {
            return ['==', 'STATEFP', '']; // Default filter for no state hover
        }
    }, [hoverState]);

    // Filter for selected states
    const selectedStateFilter = useMemo(() => {
        // return ['in', 'NAME', ...selectedStates];
        return ['in', 'STUSPS', ...selectedStates];
    }, [selectedStates]);


    return (
        <div className="flex w-full h-full">
            <Map
                initialViewState={initialViewState}
                minZoom={2}
                mapStyle={mapStyle}
                mapboxAccessToken={mapboxToken}
                interactiveLayerIds={["state-fill"]}
                onMouseMove={onStateHover}
                onClick={onStateClick}
                ref={mapRef}
                style={{ borderRadius: 8 }}
            >
                <Source type="vector" url="mapbox://mustwants.93czo4tl">
                    {/* State fill layer for default color */}
                    <Layer
                        beforeId="waterway-label"
                        {...stateFillLayer}
                    />

                    {/* State layer for hover effect */}
                    <Layer
                        beforeId="waterway-label"
                        {...stateHighlightLayer}
                        filter={stateFilter}
                    />

                    {/* State layer for selected states */}
                    <Layer
                        beforeId="waterway-label"
                        {...stateSelectedLayer}
                        filter={selectedStateFilter}
                    />
                </Source>

                {hoverState && (
                    <Popup
                        offset={25}
                        anchor="bottom"
                        latitude={stateHoverInfo.latitude}
                        longitude={stateHoverInfo.longitude}
                        closeButton={false}
                        closeOnClick={false}
                    >
                        <div className="flex bg-blue-400 text-black justify-center p-2">
                            <p className="font-bold">State:</p>
                            <p className="ml-2">{hoverState}</p>
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
            </Map>

            {/* Draggable window for selected states */}
            <DraggablePopup>
                <div
                    className="absolute bg-white text-black w-48 rounded p-2 cursor-move"
                    style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
                >
                    <h4 className="text-center font-bold mb-2">
                        Please Select at Least<br />
                        One (1) State
                    </h4>

                    <div className="h-48 text-sm overflow-auto">
                        {selectedStates.length > 0 ? (
                            selectedStates
                                .slice()
                                .sort()
                                .map((state, index) => (
                                    <p key={index}>
                                        {state}
                                    </p>
                                ))
                        ) : (
                            <p className="text-center text-mw_red">
                                No states selected
                            </p>
                        )}
                    </div>

                    <button
                        className="bg-mw_olive hover-scale-btn text-white rounded-xl w-44 h-12"
                        onClick={closeModal}
                    >
                        Finished
                    </button>
                </div>
            </DraggablePopup>
        </div>
    );
};
