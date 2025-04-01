// Base fill colors
// Air Force #00308F 
// Army #4B5320
// Coast Guard #223C70
// Marine Corps #A6192E
// Navy #000080
// Space Force #009EE0

export const basesFill = {
    id: "bases-fill",
    type: "fill",
    "source-layer": "us-military-bases-adkg8p",
    minzoom: 2,
    maxzoom: 16,
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1.0)",
        "fill-color": [
            "match",
            ["get", "branch"],
            "Air Force", "#00308F",
            "Army", "#4B5320",
            "Coast Guard", "#223C70",
            "Marine Corps", "#A6192E",
            "Navy", "#000080",
            "Space Force", "#009EE0",
            "#00FFFF" // Default color if no match.
        ],
        // "fill-color": "rgba(0, 255, 255, 0.5)"
        "fill-opacity": 0.5
    }
};
