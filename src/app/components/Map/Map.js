"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const maxBounds = L.latLngBounds(
  L.latLng(5.49955, -167.276413), //Southwest
  L.latLng(83.162102, -52.23304) //Northeast
);

const center = [40, -100];

const Map = () => {
  return (
    <MapContainer
      maxBounds={maxBounds}
      style={{ minHeight: "400px", height: "100%", width: "100%" }}
      center={center}
      zoom={4.4}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
