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
import InfoPanel from "./components/InfoPanel/InfoPanel";
import apis from "./Api/index.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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
  const [districtPlan, setDistrictPlan] = useState([]);
  const [view, setView] = useState("Cluster Analysis");
  const [about, setAbout] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [districtPlanInfo, setDistrictPlanInfo] = useState([]);
  const [responses, setResponses] = useState([]);
  const [clusterADP, setClusterADP] = useState(null);

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
  const getClusterInfo = async (clusterId) => {
    let json = await apis.getDistrictPlanInformationForSelectedCluster(
      clusterId
    );
    return json.data;
  };
  const getClusterADP = async (clusterId) => {
    let json = await apis.getAverageDistrictPlanGeoJson(clusterId);
    console.log(json);
    return json.data;
  };
  const changeCluster = (id) => {
    getClusterInfo(id).then((res) => {
      setCluster(id);
      setDistrictPlanInfo(res);
    });

    // getClusterADP(id).then((res) => setClusterADP(res));
  };
  const changeDistrictPlan = (newList) => {
    setDistrictPlan(newList);
  };
  const changeDistanceMeasure = (e) => {
    var k = e.target.text;

    if (k !== distanceMeasure) {
      setDistanceMeasure(k);
      setCluster(null);
      setClusterADP(null);
      setDistrictPlan([]);
      apis.getClusters(state, ensemble, k).then((res) => {
        setClusters(res.data);
      });
    }
  };
  const changeEnsemble = (e) => {
    var k = e.target.text;
    if (k !== ensemble) {
      setEnsemble(k);
      setDistanceMeasure(null);
      setCluster(null);
      setClusterADP(null);
      setDistrictPlan([]);
      setClusters([]);
    }
  };
  const changeDistrict = (e) => {
    setDistrict(e);
  };
  const clickClusterButton = () => {
    setCluster(null);
    setClusterADP(null);
    setDistrictPlan([]);
  };
  const changeState = (e) => {
    console.log("State Changed");
    var k = e?.target?.text;
    if (e.target.text === "Default") {
      setState(null);
      setStateDistrictMap([]);
      setCenter([40, -96]);
      setZoom(4.6);
      setEnsemble(null);
      setDistanceMeasure(null);
      setEnsembleList([]);
      setClusters([]);
    } else if (k === "Colorado") {
      if (state !== k) {
        setDistrict(null);
        setEnsemble(null);
        setDistanceMeasure(null);
        setCluster(null);
        setClusterADP(null);
        setDistrictPlan([]);
        setClusters([]);
      }
      getStateInfo("Colorado").then((res) => {
        setStateDistrictMap(res.colo2020);
        setEnsembleList(res.ensembles);
        setState("Colorado");
        setCenter([39.4, -106]);
        setZoom(6.5);
      });
    } else if (k === "Ohio") {
      if (state !== k) {
        setDistrict(null);
        setEnsemble(null);
        setDistanceMeasure(null);
        setCluster(null);
        setClusterADP(null);
        setDistrictPlan([]);
        setClusters([]);
      }
      getStateInfo("Ohio").then((res) => {
        setStateDistrictMap(res.ohio2020);
        setEnsembleList(res.ensembles);
        setState("Ohio");
        setCenter([40, -83]);
        setZoom(6.5);
      });
    } else if (k === "Illinois") {
      if (state !== k) {
        setDistrict(null);
        setEnsemble(null);
        setDistanceMeasure(null);
        setCluster(null);
        setClusterADP(null);
        setDistrictPlan([]);
        setClusters([]);
      }
      getStateInfo("Illinois").then((res) => {
        setStateDistrictMap(res.ill2020);
        setEnsembleList(res.ensembles);
        setState("Illinois");
        setCenter([40, -89.5]);
        setZoom(6.5);
      });
    } else if (k === "Reset Map") {
      setState(null);
      setCenter([40, -96]);
      setZoom(4.6);
      setDistrict(null);
      setEnsemble(null);
      setDistanceMeasure(null);
      setCluster(null);
      setClusterADP(null);
      setDistrictPlan([]);
      setStateDistrictMap(null);
      setEnsembleList([]);
      setClusters([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestPromises = districtPlan.map((id) =>
          apis.getDistrictPlanGeoJson(id)
        );
        const allResponses = await Promise.all(requestPromises);
        setResponses(allResponses);
        if (allResponses.length > 0) {
          console.log("All responses received successfully!");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [districtPlan]);

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
                responses={responses}
              ></Map2>
            </div>
            <InfoPanel
              setCluster={setCluster}
              clusters={clusters}
              cluster={cluster}
              districtPlanInfo={districtPlanInfo}
              changeCluster={changeCluster}
              distanceMeasure={distanceMeasure}
              clickClusterButton={clickClusterButton}
              changeDistrictPlan={changeDistrictPlan}
              clusterADP={clusterADP}
            />
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
                stateDistrictMap={stateDistrictMap}
                responses={responses}
              ></Map2>
            </div>
            <div className="flex flex-1 justify-center items-center">
              <div className="flex flex-1 flex-col ">
                <div className="m-5 flex flex-row">
                  <SimpleLineChart />
                </div>
                <div className="m-5">
                  <Table data={data3} settingSomething={changeCluster} />
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
      <div className="flex min-h-screen max-h-screen min-w-screen max-w-screen flex flex-col justify-between p-0 pb-0 pt-0">
        <Navbar
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
