import { config } from "@/app/usignup/config";

export function addCircle(map, source, coordinates, flyTo) {
  flyTo();
  const clickSource = `_${source}`;
  const existingSource = map.getSource(clickSource);
  const existingLayer = map.getLayer(clickSource);
  if (existingSource) {
    existingSource.setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coordinates,
          },
        },
      ],
    });

    return;
  }

  map.addSource(`_${source}`, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coordinates,
          },
        },
      ],
    },
  });

  if (!existingLayer) {
    const layerId = "circle";
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
  }
}