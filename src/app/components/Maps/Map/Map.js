"use client";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { ohio2020, ill2020, colo2020 } from "../Map2/const";
// import { colobound, illbound, ohiobound } from "../Map2/const";
import apis from "../../../Api/index.js";
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
  const [ohio, setOhio] = useState([]);
  const [illinois, setIllinois] = useState([]);
  const [colorado, setColorado] = useState([]);

  useEffect(() => {
    try {
      const getData = async () => {
        let res = await apis.getInitialization();
        let data = res.data;
        if (data === "Error") throw new Error("error getting initial data");
        setOhio(data[0].ohiobound);
        setColorado(data[1].colobound);
        setIllinois(data[2].illbound);
      };
      getData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
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

  const onEachFeatureState = (feature, layer) => {
    layer.on({
      click: clickMapState,
    });
  };

  const clickMapState = (e) => {
    const k = e?.target?.feature?.properties?.name;
    const i = e?.target?.feature?.properties?.NAME;
    var name = i ? i : k;
    if (name == null) {
      name = "Colorado";
    }
    const p = {
      target: {
        text: name,
      },
    };
    props.changeState(p);
  };

  const clickMap = (e) => {
    const polygons = e.target.feature.geometry.geometries;
    const point = [e.latlng.lng, e.latlng.lat];
    for (var i = 0; i < polygons.length; i++) {
      if (d3.polygonContains(polygons[i].coordinates[0], point)) {
        props.changeDistrict(i + 1);
        return;
      }
    }
  };

  const geoJsonStyle = {
    fillColor: "#B59410", // Fill color for the boundary
    color: "black", // Stroke color for the boundary
    weight: 1, // Stroke width
    fillOpacity: 0.3, // Fill opacity (0 to 1)
  };

  const style2 = {
    minHeight: "60rem",
    height: "100%",
    minWidth: "100%",
    width: "100%",
  };
  // console.log(ohio);
  return (
    <MapContainer
      id="map"
      maxBounds={maxBounds}
      style={style2}
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

      {props.state === null && colorado.length !== 0 ? (
        <GeoJSON
          data={colorado}
          style={geoJsonStyle}
          onEachFeature={onEachFeatureState}
        />
      ) : null}
      {props.state === null && illinois.length !== 0 ? (
        <GeoJSON
          data={illinois}
          style={geoJsonStyle}
          onEachFeature={onEachFeatureState}
        />
      ) : null}
      {props.state === null && ohio.length !== 0 ? (
        <GeoJSON
          data={ohio}
          style={geoJsonStyle}
          onEachFeature={onEachFeatureState}
        />
      ) : null}
    </MapContainer>
  );
};

export default Map;
