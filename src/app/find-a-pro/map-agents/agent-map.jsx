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
import AgentMapCard from "./agent-map-card";
import { coverageFill, coverageLine } from "./map-styles";
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


export default function AgentMap() {
    const mapRef = useRef();
    const { userSelectedPro, setUserSelectedPro } = useContext(UserSelectedProContext);
    const [initialView] = useState(initialViewState);
    const [agents, setAgents] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);


    const markerClick = (agentData) => {
        setSelectedAgent(agentData);

        mapRef.current?.flyTo({
            center: [agentData.location.coordinates[0], agentData.location.coordinates[1]],
            zoom: 8,
            duration: 4000
        });
    };

    useEffect(() => {
        fetchAgentsList();
        initializeRealTimeUpdates();
    }, [userSelectedPro]);

    const fetchAgentsList = () => {
        fetch(`${baseURL}/realtor/realtors_map`)
            .then((response) => response.json())
            .then(agents => {
                if (userSelectedPro) {
                    const agentData = agents.agents.filter(item => item._id === userSelectedPro);

                    setAgents(agentData);
                    markerClick(agentData[0]);
                } else {
                    setAgents(agents.agents);
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
                fetchAgentsList();
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
            {selectedAgent &&
                <Source type="vector" url="mapbox://mustwants.93czo4tl">
                    <Layer
                        beforeId="waterway-label"
                        {...coverageFill(selectedAgent.coverage_zipcodes)}
                    />
                    <Layer
                        beforeId="waterway-label"
                        {...coverageLine(selectedAgent.coverage_zipcodes)}
                    />
                </Source>
            }

            <Source type="vector" url="mapbox://mustwants.6sfalxsz">
                <Layer {...basesFill} />
            </Source>

            {selectedAgent && (
                <div className="absolute bottom-8 left-6 z-20">
                    <AgentMapCard
                        agent={selectedAgent}
                        setAgent={setSelectedAgent}
                    />
                </div>
            )}

            {agents && agents.map((agent, index) => (
                <Marker
                    key={index}
                    latitude={agent.location.coordinates[1]}
                    longitude={agent.location.coordinates[0]}
                    onClick={(event) => {
                        event.originalEvent.stopPropagation();
                        markerClick(agent);
                    }}
                >
                    <Image
                        className="w-10 h-10 object-contain"
                        src="/images/logos-must-wants/must-wants-agent-pin.svg"
                        alt="Agents Icon"
                        placeholder="blur"
                        blurDataURL="/images/logos-must-wants/must-wants-agent-pin.svg"
                        width={0}
                        height={0}
                        sizes="100vh"
                    />
                </Marker>
            ))}

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
