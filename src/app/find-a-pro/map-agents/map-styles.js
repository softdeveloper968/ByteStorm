export const coverageFill = (zcta) => {
    return {
        id: "coverage-fill",
        type: "fill",
        "source-layer": "zcta",
        paint: {
            "fill-color": "rgba(255, 0, 255, 0.2)"
        },
        filter: ["in", ["get", "ZCTA5CE20"], ["literal", zcta]]
    };
};

export const coverageLine = (zcta) => {
    return {
        id: "coverage-line",
        type: "line",
        "source-layer": "zcta",
        paint: {
            "line-color": "rgba(0, 0, 0, 1.0)",
            "line-width": 1
        },
        filter: ["in", ["get", "ZCTA5CE20"], ["literal", zcta]]
    };
};
