import { useEffect, useState } from "react";


const shadowStyle = {
    boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)`
};

export default function ZoomLevelDisplay({ mapRef, initialView }) {
    const [zoomLevel, setZoomLevel] = useState(3.5);

    useEffect(() => {
        const handleZoom = () => {
            if (mapRef.current) {
                const currentZoom = mapRef.current.getMap().getZoom();

                setZoomLevel(currentZoom);
            }
        };

        if (mapRef.current) {
            const mapInstance = mapRef.current.getMap();

            mapInstance.on('zoom', handleZoom);

            return () => {
                mapInstance.off('zoom', handleZoom);
            };
        }
    }, [mapRef]);

    return (
        <div
            className="flex justify-between items-center bg-white text-black text-center text-base border-2 border-black rounded-lg w-64 mx-auto px-2 py-1"
            style={{ ...shadowStyle }}
        >
            <div>
                Zoom Level: {zoomLevel.toFixed(2)}
            </div>

            <div
                className="text-black border-2 border-black rounded-xl px-2 py-1 hover:bg-slate-300 cursor-pointer"
                onClick={() => {
                    if (mapRef.current) {
                        mapRef.current.flyTo({
                            center: [initialView.longitude, initialView.latitude],
                            zoom: initialView.zoom,
                            duration: 4000
                        });
                    }
                }}
            >
                Reset View
            </div>
        </div>
    );
};
