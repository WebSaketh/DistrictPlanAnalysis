"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { geoJsonData, geoJsonData2, geoJsonData3 } from "./const";
import { colobound, illbound, ohio2020 } from "./const";
import { latLng, polygon } from "leaflet";
import * as d3 from "d3";

const MapControl = (props) => {
  const map = useMapEvents({
    click: () => {
      map.flyTo(L.latLng(props.center), props.zoom);
    },
  });
  return null;
};

const maxBounds = L.latLngBounds(
  L.latLng(5.49955, -167.276413), // Southwest
  L.latLng(83.162102, -52.23304) // Northeast
);

const center = [40, -96];

const Map = (props) => {
  const onEachFeature = (feature, layer) => {
    // console.log("feature:", feature);
    // if (feature.properties) {
    //   layer.bindPopup("Your text or whatever");
    // }
    layer.on({
      // mouseover: onMouseOver,
      // mouseout: onMouseOut,
      click: clickMap,
    });
  };

  const clickMap = (e) => {
    // console.log(
    //   e,
    //   "clicked state",
    //   e.latlng,
    //   e.target.feature.geometry.geometries
    // );
    const polygons = e.target.feature.geometry.geometries;
    // console.log(polygons.length);
    const point = [e.latlng.lng, e.latlng.lat];
    for (var i = 0; i < polygons.length; i++) {
      // console.log(polygons[i]);
      if (d3.polygonContains(polygons[i].coordinates[0], point)) {
        props.changeDistrict(i + 1);
        return;
      }
    }
  };

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
        <GeoJSON
          data={colobound}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      ) : null}
      {props.state === "Illinois" ? (
        <GeoJSON
          data={illbound}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      ) : null}
      {props.state === "Ohio" ? (
        <GeoJSON
          data={ohio2020}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      ) : null}
      {props.state === null ? (
        <GeoJSON data={geoJsonData} style={geoJsonStyle} />
      ) : null}
      {props.state === null ? (
        <GeoJSON data={geoJsonData2} style={geoJsonStyle} />
      ) : null}
      {props.state === null ? (
        <GeoJSON data={geoJsonData3} style={geoJsonStyle} />
      ) : null}
    </MapContainer>
  );
};

export default Map;
