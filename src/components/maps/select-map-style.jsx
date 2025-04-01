import { useEffect, useState } from "react";


const mapStyles = [
    { id: 0, label: "Streets", value: "streets-v12" },
    { id: 1, label: "Satellite Streets", value: "satellite-streets-v12" },
    { id: 2, label: "Light", value: "light-v11" },
    { id: 3, label: "Dark", value: "dark-v11" },
    { id: 4, label: "Outdoors", value: "outdoors-v12" }
];

export default function SelectMapStyle({ mapRef }) {
    const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12");


    useEffect(() => {
        if (mapRef.current) {
            const mapInstance = mapRef.current.getMap();
            mapInstance.setStyle(mapStyle);
        }
    }, [mapStyle, mapRef]);

    const changeMapStyle = (event) => {
        const selectedStyle = `mapbox://styles/mapbox/${event.target.value}`;

        setMapStyle(selectedStyle);
    };

    return (
        <div className="bg-black w-48 rounded-lg p-4 shadow-md">
            <h3 className="text-lg text-center border-b-2 mb-4">
                Map Styles:
            </h3>

            {mapStyles.map(style => (
                <div key={style.id} className="flex items-center text-base mb-2 text-white">
                    <input
                        name="mapStyle"
                        type="radio"
                        className="border-transparent focus:border-transparent focus:ring-0 mr-2 hover:bg-blue-500"
                        id={style.label}
                        value={style.value}
                        checked={mapStyle === `mapbox://styles/mapbox/${style.value}`}
                        onChange={changeMapStyle}
                    />

                    <label htmlFor={style.value}>{style.label}</label>
                </div>
            ))}
        </div>
    );
};
