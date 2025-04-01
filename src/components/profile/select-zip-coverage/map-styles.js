// Default zip unselected fill color
export const zipFillLayer = {
    id: "zip-fill",
    type: "fill",
    "source-layer": "zcta",
    minzoom: 8,
    maxzoom: 15,
    paint: {
        "fill-outline-color": "rgba(0, 0, 255, 1.0)",
        "fill-color": "rgba(0, 0, 255, 0.1)"
    }
};

// Highlighted zip code polygons.
export const zipHighlightLayer = {
    id: "zip-highlighted",
    type: "fill",
    "source-layer": "zcta",
    minzoom: 8,
    maxzoom: 15,
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1.0)",
        "fill-color": "#459f9f",
        "fill-opacity": 0.9
    }
};

// Selected state fill color
export const zipSelectedLayer = {
    id: "zip-selected",
    type: "fill",
    "source-layer": "zcta",
    minzoom: 8,
    maxzoom: 15,
    paint: {
        "fill-outline-color": "rgba(0, 0, 255, 1.0)",
        "fill-color": "rgba(0, 0, 255, 0.3)"
    }
};
