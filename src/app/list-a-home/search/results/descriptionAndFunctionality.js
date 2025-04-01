import { addCircle } from "@/app/list-a-home/search/results/addCircle";
import { config } from "@/app/usignup/config";

export function descriptionAndFunctionality(map, source, focusHome) {
  map.on("click", source, (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.title;
    addCircle(map, source, coordinates, () =>
      focusHome({
        location: {
          coordinates: {
            lng: coordinates[0],
            lat: coordinates[1],
          },
        },
      }),
    );
    const layerId = "circle";
    const existingLayer = map.getLayer(layerId);
    if (existingLayer) return;

    map.addLayer({
      id: layerId,
      type: "circle",
      source: `_${source}`,
      paint: {
        "circle-radius": 20,
        "circle-color": "#ffffff",
        "circle-stroke-color": config.colors.brandGreen,
        "circle-stroke-width": 4,
        "circle-opacity": 0.2,
      },
    });
  });

  map.on("mouseenter", source, () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", source, () => {
    map.getCanvas().style.cursor = "";
  });
}