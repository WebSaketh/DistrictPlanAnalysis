"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import styles from "../../styles/Map.css";

const maxBounds = L.latLngBounds(
  L.latLng(5.49955, -167.276413), //Southwest
  L.latLng(83.162102, -52.23304) //Northeast
);

const center = [40, -100];

const Map = () => {
  return (
    <MapContainer
      classname={styles.map}
      maxBounds={maxBounds}
      center={center}
      zoom={4.4}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
