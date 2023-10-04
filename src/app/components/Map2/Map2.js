"use client";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Popup,
  Tooltip,
  Polygon,
} from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { ohio2020, ill2020, colo2020 } from "./const";
import { colobound, illbound, ohiobound } from "./const";
import { latLng, polygon } from "leaflet";
import * as d3 from "d3";
import { useEffect, useState } from "react";

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
var center = [40, -96];

const Map2 = (props) => {
  const [mousePos, setMousePos] = useState(null);
  if (props.state == "Colorado") {
    center = [39.4, -106];
  }
  if (props.state == "Ohio") {
    center = [40, -83];
  }
  if (props.state == "Illinois") {
    center = [40, -89.5];
  }
  useEffect(() => {
    document.getElementById("map")?.click();
    document.getElementById("map2")?.click();
  });
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
    console.log(e);
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
        setMousePos(e.latLng);
        props.changeDistrict(i + 1);
        return;
      }
    }
  };

  const polygon1 = [
    [39.515, -100.09],
    [39.52, -106.1],
    [41.52, -106.12],
  ];

  const polygon2 = [
    [39.515, -83.09],
    [39.52, -89.1],
    [41.52, -89.12],
  ];

  const polygon3 = [
    [39.515, -77.09],
    [39.52, -83.1],
    [41.52, -83.12],
  ];

  const purpleOptions = { color: "purple" };

  const geoJsonStyle = {
    fillColor: "#B59410", // Fill color for the boundary
    color: "black", // Stroke color for the boundary
    weight: 1, // Stroke width
    fillOpacity: 0.3, // Fill opacity (0 to 1)
  };

  const style1 = {
    minHeight: "100px",
    minWidth: "600px",
    maxWidth: "600px",
    height: "100%",
  };

  const style2 = {
    minHeight: "820px",
    maxHeight: "820px",
    minWidth: "1725px",
    maxWidth: "100%",
  };

  return (
    <MapContainer
      id="map2"
      maxBounds={maxBounds}
      style={style1}
      center={center}
      zoom={6.0}
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
          data={colo2020}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        >
          {props.districtPlan ? (
            <Polygon pathOptions={purpleOptions} positions={polygon1} />
          ) : null}
          <Tooltip direction="center" offset={[0, -150]} permanent>
            STATE SENATE
          </Tooltip>
        </GeoJSON>
      ) : null}
      {props.state === "Illinois" ? (
        <GeoJSON
          data={ill2020}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        >
          {props.districtPlan ? (
            <Polygon pathOptions={purpleOptions} positions={polygon2} />
          ) : null}
          <Tooltip direction="center" offset={[0, -150]} permanent>
            FEDERAL CONGRESSIONAL DISTRICT
          </Tooltip>
        </GeoJSON>
      ) : null}
      {props.state === "Ohio" ? (
        <GeoJSON
          data={ohio2020}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        >
          {props.districtPlan ? (
            <Polygon pathOptions={purpleOptions} positions={polygon3} />
          ) : null}
          <Tooltip direction="center" offset={[0, -150]} permanent>
            FEDERAL CONGRESSIONAL DISTRICT
          </Tooltip>
        </GeoJSON>
      ) : null}
      {props.state === null ? (
        <GeoJSON
          data={colobound}
          style={geoJsonStyle}
          onEachFeature={onEachFeatureState}
        />
      ) : null}
      {props.state === null ? (
        <GeoJSON
          data={illbound}
          style={geoJsonStyle}
          onEachFeature={onEachFeatureState}
        />
      ) : null}
      {props.state === null ? (
        <GeoJSON
          data={ohiobound}
          style={geoJsonStyle}
          onEachFeature={onEachFeatureState}
        />
      ) : null}
    </MapContainer>
  );
};

export default Map2;
