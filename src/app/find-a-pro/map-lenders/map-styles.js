export const stateFillLayer = (states) => {    
    return {
        id: "state-fill",
        type: "fill",
        "source-layer": "state",
        paint: {
            "fill-outline-color": "rgba(255, 0, 0, 1.0)",
            "fill-color": "rgba(255, 0, 0, 0.2)"
        },
        filter: ["in", ["get", "STUSPS"], ["literal", states]]
    };
};
