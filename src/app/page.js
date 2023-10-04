"use client";
import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import Table from "./components/Table/table";
import Navbar from "./components/Navbar";
import Tile from "./components/Tile";
import React, { useEffect, useState } from "react";
import Map2 from "./components/Map2";
import button from "daisyui";
import SimpleBoxPlot from "src/app/components/SimpleBoxPlot.js";

import Scatterplot from "./components/Scatterplot/Scatterplot"; // Update the path to your Scatterplot component

const data = Array.from({ length: 20 }, () => ({
  x: Math.random() * 300 + 5, // Random X value between 0 and 100
  y: Math.random() * 300 + 5, // Random Y value between 0 and 100
}));

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const data1 = {
  columns: [
    "Cluster",
    "Number of Plans",
    "Avg Distance between Plans",
    "Republican %",
    "Democratic %",
    "White %",
    "African American %",
    "Asians %",
    "Hispanic %",
  ],
  rows: [
    [
      1,
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      2,
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      3,
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      4,
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      5,
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
  ],
};

const data2 = {
  columns: [
    "District Plan",
    "Opportunity Districts",
    "Republican %",
    "Democratic %",
    "White %",
    "African American %",
    "Asians %",
    "Hispanic %",
  ],
  rows: [
    [
      "Average DP",
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      1,
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      2,
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      3,
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      4,
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
  ],
};

export default function Home() {
  const [state, setState] = useState(null);
  const [center, setCenter] = useState([40, -96]);
  const [zoom, setZoom] = useState(4.6);
  const [district, setDistrict] = useState(null);
  const [ensemble, setEnsemble] = useState(null);
  const [distanceMeasure, setDistanceMeasure] = useState(null);
  const [cluster, setCluster] = useState(null);
  const [districtPlan, setDistrictPlan] = useState(null);

  const changingCluster = (id) => {
    setCluster(id);
  };

  const changingDistrictPlan = (id) => {
    console.log("district plan...", id);
    setDistrictPlan(id);
  };

  const changeDistanceMeasure = (e) => {
    var k = e.target.text;
    console.log(k);
    setDistanceMeasure(k);
    setCluster(null);
  };

  const changeEnsemble = (e) => {
    var k = e.target.text;
    setEnsemble(k);
    setCluster(null);
  };

  const changeDistrict = (e) => {
    console.log("District:", e);
    setDistrict(e);
  };

  const clickClusterButton = () => {
    setCluster(null);
    setDistrictPlan(null);
  };

  const changeState = (e) => {
    var k = e?.target?.text;
    if (e.target.text === "Default") {
      setState(null);
      setCenter([40, -96]);
      setZoom(4.6);
      setEnsemble(null);
      setDistanceMeasure(null);
    } else if (k === "Colorado") {
      if (state !== k) {
        setDistrict(null);
        setEnsemble(null);
        setDistanceMeasure(null);
        setCluster(null);
      }
      setState("Colorado");
      setCenter([39.4, -106]);
      setZoom(6.5);
    } else if (k === "Ohio") {
      if (state !== k) {
        setDistrict(null);
        setEnsemble(null);
        setDistanceMeasure(null);
        setCluster(null);
      }
      setState("Ohio");
      setCenter([40, -83]);
      setZoom(6.5);
    } else if (k === "Illinois") {
      if (state !== k) {
        setDistrict(null);
        setEnsemble(null);
        setDistanceMeasure(null);
        setCluster(null);
      }
      setState("Illinois");
      setCenter([40, -89.5]);
      setZoom(6.5);
    } else if (k === "Reset Map") {
      setState(null);
      console.log("RESETMAP");
      setCenter([40, -96]);
      setZoom(4.6);
      setDistrict(null);
      setEnsemble(null);
      setDistanceMeasure(null);
      setCluster(null);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    document.getElementById("map")?.click();
    document.getElementById("map2")?.click();
  }, [state, zoom, center]);

  if (state) {
    return (
      <main>
        <div className="flex min-h-screen max-h-screen flex-col justify-between p-0 pb-0 pt-0">
          <Navbar
            changeState={changeState}
            changeEnsemble={changeEnsemble}
            changeDistanceMeasure={changeDistanceMeasure}
          >
            HEY
          </Navbar>
          <div className="flex flex-row flex-1">
            <div className="aspect-square">
              <Map2
                state={state}
                center={center}
                zoom={zoom}
                ensemble={ensemble}
                district={district}
                changeDistrict={changeDistrict}
                changeState={changeState}
              ></Map2>
            </div>
            <div className="flex flex-col text-center max-h-full lg:w-full lg:mb-0  lg:text-left overflow-scroll">

              {ensemble && distanceMeasure && !cluster && !districtPlan ? (
                <Table data={data1} settingSomething={changingCluster} />
              ) : null}
              {ensemble && distanceMeasure && cluster ? (
                <div>
                  <h2>Cluster {cluster}</h2>
                  <button
                    className="btn btn-ghost"
                    onClick={clickClusterButton}
                  >
                    View Clusters
                  </button>
                  <Table data={data2} settingSomething={changingDistrictPlan} />
                </div>
              ) : null}

              {false ? (
                <Scatterplot data={data} width={400} height={300} />
              ) : null}
            </div>
            <div> <SimpleBoxPlot /> </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="flex min-h-screen max-h-screen flex flex-col justify-between p-0 pb-0 pt-0">
        <Navbar
          changeState={changeState}
          changeEnsemble={changeEnsemble}
          changeDistanceMeasure={changeDistanceMeasure}
        >
          HEY
        </Navbar>
        <Map
          state={state}
          center={center}
          zoom={zoom}
          ensemble={ensemble}
          district={district}
          changeDistrict={changeDistrict}
          changeState={changeState}
        ></Map>
      </div>
    </main>
  );
}
