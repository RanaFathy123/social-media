import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom marker icon (optional)
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const MapChart = () => {
  // Array of cities with their coordinates and names
  const cities = [
    { name: "Moscow", lat: 55.7558, lng: 37.6173, description: "Capital of Russia" },
    { name: "Paris", lat: 48.8566, lng: 2.3522, description: "Capital of France" },
    { name: "New York", lat: 40.7128, lng: -74.0060, description: "City in the USA" },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503, description: "Capital of Japan" }
  ];

  const [position] = useState({
    lat: 48.8566,
    lng: 2.3522,
    zoom: 2 // Zoom out to show multiple cities
  });

  const center = [position.lat, position.lng];

  return (
    <MapContainer center={center} zoom={position.zoom} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city, index) => (
        <Marker key={index} position={[city.lat, city.lng]} icon={customIcon}>
          <Popup>{city.name}</Popup>
          <Tooltip>{city.description}</Tooltip> {/* Tooltip for city description */}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapChart;
