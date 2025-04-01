// Default state unselected fill color
export const stateFillLayer = {
    id: "state-fill",
    type: "fill",
    "source-layer": "state",
    paint: {
        "fill-outline-color": "rgba(255, 0, 0, 1.0)",
        "fill-color": "rgba(255, 0, 0, 0.1)"
    }
};

// Highlighted state fill color (hovered)
export const stateHighlightLayer = {
    id: "state-highlighted",
    type: "fill",
    "source-layer": "state",
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1.0)",
        "fill-color": "#459f9f",
        "fill-opacity": 0.9
    }
};

// Selected state fill color
export const stateSelectedLayer = {
    id: "state-selected",
    type: "fill",
    "source-layer": "state",
    paint: {
        "fill-outline-color": "rgba(0, 128, 0, 1.0)",
        "fill-color": "rgba(0, 128, 0, 0.6)",
        "fill-opacity": 0.8
    }
};
