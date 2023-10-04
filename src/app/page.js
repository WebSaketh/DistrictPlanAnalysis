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
import SimpleLineChart from "src/app/components/SimpleLineChart.js";
import Scatterplot from "./components/Scatterplot/Scatterplot"; // Update the path to your Scatterplot component
import { Encode_Sans } from "next/font/google";

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

const data3 = {
  columns: [
    "Cluster Purity", //Cluster purity measures the proportion of data points in a cluster that belong to the majority class. Higher purity indicates more homogeneous clusters.
    "Execution Time",
    "Resource Utilization",
    "Silhouette Score", //The silhouette score quantifies how similar each data point is to its own cluster compared to other clusters. Higher scores indicate better-defined clusters.
    "Inertia", //Inertia measures the total distance between data points and their cluster centroids. Lower inertia indicates tighter clusters.
  ],
  rows: [
    [
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      getRandomInt(1000),
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
  const [view, setView] = useState("Cluster Analysis");

  const changeView = (e) => {
    var k = e?.target?.innerHTML;
    if (k == "Cluster Analysis") {
      setView(k);
    } else if (k == "Distance Measure Analysis") {
      setView(k);
    }
  };

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
    if (k !== distanceMeasure) {
      setDistanceMeasure(k);
      setCluster(null);
      setDistrictPlan(null);
    }
  };

  const changeEnsemble = (e) => {
    var k = e.target.text;
    if (k !== ensemble) {
      setEnsemble(k);
      setCluster(null);
      setDistrictPlan(null);
    }
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
        setDistrictPlan(null);
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
        setDistrictPlan(null);
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
        setDistrictPlan(null);
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
      setDistrictPlan(null);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    document.getElementById("map")?.click();
    document.getElementById("map2")?.click();
  }, [state, zoom, center]);

  if (state && view == "Cluster Analysis") {
    return (
      <main>
        <div className="flex min-h-screen max-h-screen flex-col justify-between p-0 pb-0 pt-0">
          <Navbar
            view={view}
            state={state}
            ensemble={ensemble}
            distanceMeasure={distanceMeasure}
            changeView={changeView}
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
                districtPlan={districtPlan}
                changeDistrict={changeDistrict}
                changeState={changeState}
              ></Map2>
            </div>
            <div className="flex flex-col text-center max-h-full lg:w-full lg:mb-0  lg:text-left overflow-scroll">
              {ensemble && distanceMeasure && !cluster && !districtPlan ? (
                <Table
                  data={data1}
                  settingSomething={changingCluster}
                  headerStyle={{ "background-color": "#CD5C5C" }}
                />
              ) : null}
              {ensemble && distanceMeasure && cluster ? (
                <div className="flex flex-col">
                  <div className="grid grid-cols-8 items-center">
                    <span
                      className="badge m-4 col-span-1 bg-[#CD5C5C] border-[#CD5C5C] text-white"
                      // style={{ "background-color": "IndianRed" }}
                    >
                      Cluster {cluster}
                    </span>
                    <div className="col-span-6"></div>
                    <button
                      className="btn btn-ghost col-span-1"
                      onClick={clickClusterButton}
                    >
                      <p className="m-2 text-[#CD5C5C]">View Clusters</p>
                    </button>
                  </div>
                  <Table
                    data={data2}
                    settingSomething={changingDistrictPlan}
                    districtPlan={districtPlan}
                    headerStyle={{ "background-color": "#DAA520" }}
                  />
                </div>
              ) : null}

              {false ? (
                <Scatterplot data={data} width={400} height={300} />
              ) : null}
            </div>
            <div>
              {/* {" "}
              <SimpleLineChart />{" "} */}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (state && view == "Distance Measure Analysis") {
    return (
      <main>
        <div className="flex min-h-screen max-h-screen flex-col justify-between p-0 pb-0 pt-0">
          <Navbar
            view={view}
            state={state}
            ensemble={ensemble}
            distanceMeasure={distanceMeasure}
            changeView={changeView}
            changeState={changeState}
            changeEnsemble={changeEnsemble}
            changeDistanceMeasure={changeDistanceMeasure}
          >
            HEY
          </Navbar>
          <div className="flex flex-row flex-1">
            <div>
              <Map2
                state={state}
                center={center}
                zoom={zoom}
                ensemble={ensemble}
                district={district}
                districtPlan={districtPlan}
                changeDistrict={changeDistrict}
                changeState={changeState}
              ></Map2>
            </div>

            <div className="flex flex-1 justify-center items-center">
              <div className="flex flex-col">
                <div className="m-5">
                  <SimpleLineChart />
                </div>
                <div className="m-5">
                  <Table data={data3} settingSomething={changingCluster} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="flex min-h-screen max-h-screen flex flex-col justify-between p-0 pb-0 pt-0">
        <Navbar
          view={view}
          state={state}
          ensemble={ensemble}
          distanceMeasure={distanceMeasure}
          changeView={changeView}
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
