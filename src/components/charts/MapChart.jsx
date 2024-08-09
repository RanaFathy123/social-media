import React from "react";
import Map from "react-map-gl";
import DeckGL, { ScatterplotLayer } from "deck.gl";
import {state} from '../../data/chartsData'

// Sample data: Array of objects with latitude, longitude, and size
const data = [
  { longitude: -122.4194, latitude: 37.7749, size: 100, color: [255, 0, 0] }, // San Francisco
  { longitude: -74.006, latitude: 40.7128, size: 150, color: [0, 255, 0] }, // New York
  { longitude: -118.2437, latitude: 34.0522, size: 200, color: [0, 0, 255] }, // Los Angeles
];

const MapChart = () => {
  const initialViewState = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  };

  // Define a ScatterplotLayer to visualize data points
  const scatterplotLayer = new ScatterplotLayer({
    id: "scatterplot-layer",
    data,
    pickable: true,
    getPosition: (d) => [d.longitude, d.latitude],
    getRadius: (d) => d.size,
    getFillColor: (d) => d.color,
    radiusMinPixels: 5,
    radiusMaxPixels: 100,
  });

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={[scatterplotLayer]}
    >
      <Map
        mapLib={import("mapbox-gl")}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </DeckGL>
  );
};

export default MapChart;
