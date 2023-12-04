"use client";
import Map from "./components/Maps/Map";
import Table from "./components/Table/Table";
import Navbar from "./components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Map2 from "./components/Maps/Map2";
import SimpleBoxPlot from "src/app/components/SimpleBoxPlot/SimpleBoxPlot.js";
import SimpleLineChart from "src/app/components/SimpleLineChart/SimpleLineChart.js";
import Scatterplot from "./components/Scatterplot/Scatterplot";
import About from "./components/About";
import { ApiError } from "next/dist/server/api-utils";
import apis from "./Api/index.js";

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

var total = 0;
for (var x = 0; x < data1.rows.length; x++) {
  total += data1.rows[x][1];
}

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
    "Metric Name",
    "Cluster Purity", //Cluster purity measures the proportion of data points in a cluster that belong to the majority class. Higher purity indicates more homogeneous clusters.
    "Execution Time",
    "Resource Utilization",
    "Silhouette Score", //The silhouette score quantifies how similar each data point is to its own cluster compared to other clusters. Higher scores indicate better-defined clusters.
    "Inertia", //Inertia measures the total distance between data points and their cluster centroids. Lower inertia indicates tighter clusters.
  ],
  rows: [
    [
      "Optimal Transport",
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      "Hamming Distance",
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      "Total Variation",
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
    [
      "Another Measure",
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
  const [stateDistrictMap, setStateDistrictMap] = useState(null);
  const [center, setCenter] = useState([40, -96]);
  const [zoom, setZoom] = useState(4.6);
  const [district, setDistrict] = useState(null);
  const [ensemble, setEnsemble] = useState(null);
  const [ensembleList, setEnsembleList] = useState([]);
  const [distanceMeasure, setDistanceMeasure] = useState(null);
  const [cluster, setCluster] = useState(null);
  const [districtPlan, setDistrictPlan] = useState(new Set());
  const [view, setView] = useState("Cluster Analysis");
  const [about, setAbout] = useState(false);
  const [clusters, setClusters] = useState([]);

  const changeView = (e) => {
    var k = e?.target?.innerHTML;
    if (k == "Cluster Analysis") {
      setView(k);
    } else if (k == "Distance Measure Analysis") {
      setView(k);
    }
  };

  const goToAbout = () => {
    if (about) setAbout(false);
    else setAbout(true);
  };

  const changingCluster = (id) => {
    setCluster(id);
  };

  const changingDistrictPlan = (id) => {
    const a = new Set();
  };

  const changeDistanceMeasure = (e) => {
    var k = e.target.text;

    if (k !== distanceMeasure) {
      setDistanceMeasure(k);
      setCluster(null);
      setDistrictPlan(null);
      apis.getClusters(state, ensemble, k).then((res) => {
        setClusters(res);
      });
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
      setStateDistrictMap([]);
      setCenter([40, -96]);
      setZoom(4.6);
      setEnsemble(null);
      setDistanceMeasure(null);
      setEnsembleList([]);
    } else if (k === "Colorado") {
      if (state !== k) {
        setDistrict(null);
        setEnsemble(null);
        setDistanceMeasure(null);
        setCluster(null);
        setDistrictPlan(null);
      }
      getStateInfo("Colorado").then((res) => {
        setStateDistrictMap(res.colo2020);
        setEnsembleList(res.ensembles);
      });
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
      getStateInfo("Ohio").then((res) => {
        setStateDistrictMap(res.ohio2020);
        setEnsembleList(res.ensembles);
      });
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
      getStateInfo("Illinois").then((res) => {
        setStateDistrictMap(res.ill2020);
        setEnsembleList(res.ensembles);
      });
      setState("Illinois");
      setCenter([40, -89.5]);
      setZoom(6.5);
    } else if (k === "Reset Map") {
      setState(null);
      setCenter([40, -96]);
      setZoom(4.6);
      setDistrict(null);
      setEnsemble(null);
      setDistanceMeasure(null);
      setCluster(null);
      setDistrictPlan(null);
      setStateDistrictMap(null);
      setEnsembleList([]);
    }
  };

  const getStateInfo = async (state) => {
    let json = await apis.getState(state);
    return json.data;
  };

  useEffect(() => {
    document.getElementById("map")?.click();
    document.getElementById("map2")?.click();
  }, [state, zoom, center]);

  if (about) {
    return (
      <main>
        <div className="flex min-h-screen max-h-screen flex-col justify-between p-0 pb-0 pt-0">
          <Navbar
            total={total}
            view={view}
            state={state}
            ensemble={ensemble}
            distanceMeasure={distanceMeasure}
            changeView={changeView}
            changeState={changeState}
            changeEnsemble={changeEnsemble}
            changeDistanceMeasure={changeDistanceMeasure}
            goToAbout={goToAbout}
            ensembleList={ensembleList}
          >
            HEY
          </Navbar>
          <div className="flex flex-row flex-1">
            <div className="flex flex-1">
              <About goBack={goToAbout} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (state && view == "Cluster Analysis") {
    return (
      <main>
        <div className="flex min-h-screen max-h-screen flex-col justify-between p-0 pb-0 pt-0">
          <Navbar
            total={total}
            view={view}
            state={state}
            ensemble={ensemble}
            distanceMeasure={distanceMeasure}
            changeView={changeView}
            changeState={changeState}
            changeEnsemble={changeEnsemble}
            changeDistanceMeasure={changeDistanceMeasure}
            goToAbout={goToAbout}
            ensembleList={ensembleList}
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
                stateDistrictMap={stateDistrictMap}
              ></Map2>
            </div>
            <div className="flex flex-col text-center max-h-full lg:w-full lg:mb-0  lg:text-left flex-1">
              {ensemble && distanceMeasure && state ? null : (
                <div
                  className="flex flex-1 text-center w-full"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh", // 100% of the viewport height
                    width: "100%", // 100% of the parent container width
                    textAlign: "center",
                    color: "grey", // Change text color to grey
                    fontFamily: "Helvetica-Bold", // Use Roboto font
                    fontSize: "24px", // Set font size to 24 pixels
                  }}
                >
                  <p>Please Select State, Ensemble, and DM</p>
                </div>
              )}
              {ensemble && distanceMeasure && !cluster && !districtPlan ? (
                <div className="flex flex-col flex-1">
                  <Table
                    data={data1}
                    settingSomething={changingCluster}
                    headerStyle={{ backgroundColor: "#CD5C5C" }}
                  />
                  <div className="flex flex-row overflow-hidden">
                    <div className="ml-5">
                      <Scatterplot
                        data={data}
                        width={600}
                        height={400}
                        settingDistrictPlan={setCluster}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
              {ensemble && distanceMeasure && cluster ? (
                <div className="flex flex-col flex-1">
                  <div className="grid grid-cols-8 items-center">
                    <span
                      className="badge m-4 col-span-1 bg-[#DAA520] border-[#DAA520] text-white"
                      // style={{ "background-color": "IndianRed" }}
                    >
                      Cluster {cluster}
                    </span>
                    <div className="col-span-6"></div>
                    <button
                      className="btn btn-ghost col-span-1"
                      onClick={clickClusterButton}
                    >
                      <p className="m-2 text-[#DAA520]">View Clusters</p>
                    </button>
                  </div>
                  <Table
                    data={data2}
                    settingSomething={changingDistrictPlan}
                    districtPlan={districtPlan}
                    headerStyle={{ backgroundColor: "#DAA520" }}
                  />
                  <div className="flex flex-row overflow-hidden">
                    <div className="ml-5">
                      <Scatterplot
                        data={data}
                        width={600}
                        height={400}
                        settingDistrictPlan={setDistrictPlan}
                      />
                    </div>
                    <div>
                      <SimpleBoxPlot />
                    </div>
                  </div>
                </div>
              ) : null}
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
            total={total}
            view={view}
            state={state}
            ensemble={ensemble}
            distanceMeasure={distanceMeasure}
            changeView={changeView}
            changeState={changeState}
            changeEnsemble={changeEnsemble}
            changeDistanceMeasure={changeDistanceMeasure}
            goToAbout={goToAbout}
            ensembleList={ensembleList}
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
              <div className="flex flex-1 flex-col ">
                <div className="m-5 flex flex-row">
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
          total={total}
          view={view}
          state={state}
          ensemble={ensemble}
          distanceMeasure={distanceMeasure}
          changeView={changeView}
          changeState={changeState}
          changeEnsemble={changeEnsemble}
          changeDistanceMeasure={changeDistanceMeasure}
          goToAbout={goToAbout}
          ensembleList={ensembleList}
        ></Navbar>
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
