"use client";

import { UserSelectedProContext } from "@/app/user-selected-pro-context/user-selected-pro-context";
import { basesFill } from "@/components/maps/base-fill-style";
import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import BaseMarkersDropdown from "@/components/military-base-markers/base-markers-dropdown";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import Map, {
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Source,
} from "react-map-gl";
import LenderMapCard from "./lender-map-card";
import { stateFillLayer } from "./map-styles";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxToken = process.env.NEXT_PUBLIC_API_MAPBOX;
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const socket = new WebSocket('wss://mustwants.herokuapp.com');

const initialViewState = {
    longitude: -98.583333,
    latitude: 39.833333,
    projection: "mercator",
    zoom: 3.5,
    minZoom: 1.0,
    maxZoom: 22
};


export default function LenderMap({ lender }) {
    const mapRef = useRef();
    const { userSelectedPro, setUserSelectedPro } = useContext(UserSelectedProContext);
    const [initialView] = useState(initialViewState);
    const [lenders, setLenders] = useState(null);
    const [selectedLender, setSelectedLender] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);


    useEffect(() => {
        fetchLendersList();
        initializeRealTimeUpdates();
    }, [userSelectedPro]);

    const fetchLendersList = () => {
        fetch(`${baseURL}/lender/lenders_map`)
        .then((response) => response.json())
        .then((brokers) => {
            if (userSelectedPro) {
                const lenderData = brokers.brokers.filter(item => item._id === userSelectedPro);
                setLenders(lenderData);
                setSelectedLender(lenderData[0]);
            } else {
                setLenders(brokers.brokers);
            };
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    const initializeRealTimeUpdates = () => {
        socket.onopen = () => {
            console.log('WebSocket connection established.');
            socket.send('Hello Server');
        };
        
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Message from server:', data);
            
            if (data.message === 'Checkout session completed!') {
                fetchLendersList();
            }
        };
        
        socket.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };
        
        socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        // Cleanup on unmount
        return () => {
            socket.close();
        };
    }

    return (
        <Map
            initialViewState={initialView}
            minZoom={2}
            mapStyle={"mapbox://styles/mapbox/streets-v12"}
            mapboxAccessToken={mapboxToken}
            ref={mapRef}
        >
            {lenders && lenders.map((lender, index) => (
                <Marker
                    key={index}
                    latitude={lender.location.coordinates[1]}
                    longitude={lender.location.coordinates[0]}
                    onClick={e => {
                        e.originalEvent.stopPropagation();
                        setSelectedLender(lender);
                    }}
                >
                    <Image
                        className="w-10 h-10 object-contain"
                        src="/images/logos-must-wants/must-wants-lender-pin.svg"
                        alt="Lender Icon"
                        placeholder="blur"
                        blurDataURL="/images/logos-must-wants/must-wants-lender-pin.svg"
                        width={0}
                        height={0}
                        sizes="100vh"
                    />
                </Marker>
            ))}

            <Source type="vector" url="mapbox://mustwants.93czo4tl">
                {selectedLender &&
                    <Layer
                        beforeId="waterway-label"
                        {...stateFillLayer(selectedLender.states)}
                    />
                }
            </Source>

            {selectedLender && (
                <div className="absolute bottom-8 left-6 z-20">
                    <LenderMapCard
                        lender={selectedLender}
                        setLender={setSelectedLender}
                    />
                </div>
            )}

            <Source type="vector" url="mapbox://mustwants.6sfalxsz">
                <Layer {...basesFill} />
            </Source>


            {/* Native Mapbox controls. */}
            <GeolocateControl position={"bottom-right"} />
            <NavigationControl position={"bottom-right"} />


            {/* Custom controls. */}
            <div className="absolute top-2 left-0 right-0 hidden lg:block">
                <ZoomLevelDisplay
                    mapRef={mapRef}
                    initialView={initialView}
                />
            </div>

            {/* <div className="absolute top-2 left-2 hidden lg:block">
                <MapStyleDropdown mapRef={mapRef} />
            </div> */}

            <div className="absolute top-2 right-2">
                <BaseMarkersDropdown
                    mapRef={mapRef}
                    setSelectedArea={setSelectedArea}
                />
            </div>
        </Map >
    );
};
