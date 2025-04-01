import {source} from "@/app/list-a-home/search/results/page"
import {config} from "@/app/usignup/config"

export function addSourceAndLayer(map, features) {
  if (map && map.isStyleLoaded() === true) {
    if (map.getSource(source)) {
      map.removeLayer(source);
      map.removeSource(source);
    }

    map.addSource(source, {
      type: "geojson",
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      data: {
        type: "FeatureCollection",
        features: features,
      },
    });

    map.addLayer({
      id: "clusters",
      type: "circle",
      source: source,
      filter: ["has", "point_count"],
      paint: {
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        "circle-color": [
          "step",
          ["get", "point_count"],
          config.colors.brandGreen,
          100,
          config.colors.brandYellow,
          750,
          "#f28cb1"
        ],
        "circle-radius": [
          "step",
          ["get", "point_count"],
          20,
          100,
          30,
          750,
          40
        ]
      }
    })

    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: source,
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
      }
    })

    map.addLayer({
      id: source,
      type: "symbol",
      source: source,
      filter: ["!", ["has", "point_count"]],
      layout: {
        "icon-image": ["get", "icon"],
        "text-field": ["get", "title"],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 1.25],
        "text-anchor": "top",
      },
    });

  }
}
