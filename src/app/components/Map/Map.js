"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { geoJsonData, geoJsonData2, geoJsonData3 } from "./const";
import { colobound, illbound, ohio2020 } from "./const";

const MapControl = (props) => {
  const map = useMapEvents({
    click: () => {
      map.flyTo(L.latLng(props.center), props.zoom);
    },
  });
  return null;
};
const p = (e) => {
  console.log(e, "clicked state");
};

const onEachFeature = (feature, layer) => {
  if (feature.properties) {
    layer.bindPopup("Your text or whatever");
  }
  layer.on({
    // mouseover: onMouseOver,
    // mouseout: onMouseOut,
    click: p,
  });
};

const maxBounds = L.latLngBounds(
  L.latLng(5.49955, -167.276413), // Southwest
  L.latLng(83.162102, -52.23304) // Northeast
);

const center = [40, -96];

const Map = (props) => {
  const geoJsonStyle = {
    fillColor: "#B59410", // Fill color for the boundary
    color: "black", // Stroke color for the boundary
    weight: 3, // Stroke width
    fillOpacity: 0.6, // Fill opacity (0 to 1)
  };

  return (
    <MapContainer
      id="map"
      maxBounds={maxBounds}
      style={{ minHeight: "400px", height: "100%", width: "100%" }}
      center={center}
      zoom={4.6}
      scrollWheelZoom={true}
      dragging={false}
    >
      <MapControl
        center={props.center}
        state={props.state}
        zoom={props.zoom}
      ></MapControl>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.state === "Colorado" ? (
        <GeoJSON data={colobound} style={geoJsonStyle} />
      ) : null}
      {props.state === "Illinois" ? (
        <GeoJSON data={illbound} style={geoJsonStyle} />
      ) : null}
      {props.state === "Ohio" ? (
        <GeoJSON data={ohio2020} style={geoJsonStyle} />
      ) : null}
      {props.state === "Default" ? (
        <GeoJSON
          data={geoJsonData}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      ) : null}
      {props.state === "Default" ? (
        <GeoJSON data={geoJsonData2} style={geoJsonStyle} />
      ) : null}
      {props.state === "Default" ? (
        <GeoJSON data={geoJsonData3} style={geoJsonStyle} />
      ) : null}
    </MapContainer>
  );
};

export default Map;
