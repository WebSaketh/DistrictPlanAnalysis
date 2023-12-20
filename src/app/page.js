"use client";
import Map from "./components/Maps/Map";
import Table from "./components/Table";
import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import Map2 from "./components/Maps/Map2";
import SimpleLineChart from "./components/SimpleLineChart.js";
import InfoPanel from "./components/InfoPanel";
import InfoTabs from "./components/InfoTabs.js";
import EnsembleTable from "./components/EnsembleTable";
import DistanceMeasureTable from "./components/DistanceMeasureTable";
import apis from "./Api/index.js";
import Button from "@mui/material/Button";
import StateTable from "./components/StateTable";

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
  const [view, setView] = useState("Ensemble & Cluster Analysis");
  const [about, setAbout] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [districtPlanInfo, setDistrictPlanInfo] = useState([]);
  const [responses, setResponses] = useState([]);
  const [clusterADP, setClusterADP] = useState(null);
  const [ensembleTableInfo, setEnsembleTableInfo] = useState([]);
  const [distanceMeasureDropDown, setDistanceMeasureDropDown] = useState([]);

  const changeView = (e) => {
    var k = e?.target?.innerHTML;
    if (k == "Ensemble & Cluster Analysis") {
      setView(k);
    } else if (k == "Distance Measure Analysis") {
      setView(k);
    }
  };
  const goToAbout = () => {
    if (about) setAbout(false);
    else setAbout(true);
  };
  const viewEnsembles = () => {
    setDistrict(null);
    setEnsemble(null);
    setDistanceMeasure(null);
    setCluster(null);
    setClusterADP(null);
    setDistrictPlan([]);
    setClusters([]);
    setResponses([]);
  };
  const getClusterInfo = async (clusterId) => {
    try {
      let json = await apis.getDistrictPlanInformationForSelectedCluster(
        clusterId
      );
      return json.data;
    } catch (error) {
      return "Error";
    }
  };
  const getClusterADP = async (clusterId) => {
    try {
      let json = await apis.getAverageDistrictPlanGeoJson(clusterId);
      if (json.data === "Error") throw new Error("error getting cluster ADP");

      setClusterADP(json.data);
    } catch (error) {
      setClusterADP([]);
      return "Error";
    }
  };
  const changeCluster = (id) => {
    getClusterInfo(id).then((res) => {
      if (res !== "Error") {
        setCluster(id);
        setDistrictPlanInfo(res);
      }
    });

    // getClusterADP(id).then((res) => setClusterADP(res));
  };

  const changeDistanceMeasure = (e) => {
    var k = e;

    if (k !== distanceMeasure) {
      try {
        apis.getClusters(state, ensemble, k).then((res) => {
          if (res.data === "Error")
            throw new Error("error getting clusters...");
          setClusters(res.data);
          setDistanceMeasure(k);
          setCluster(null);
          setClusterADP(null);
          setDistrictPlan([]);
          setResponses([]);
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const changeDistrictPlan = (newList) => {
    setDistrictPlan(newList);
  };
  const changeEnsemble = (e) => {
    var k = e;
    if (k !== ensemble) {
      setEnsemble(k);
      setDistanceMeasure(null);
      setCluster(null);
      setClusterADP(null);
      setDistrictPlan([]);
      setClusters([]);
      setResponses([]);

      let index = parseInt(k.slice(-1)) - 1;
      setDistanceMeasureDropDown(ensembleTableInfo[index].distanceMeasureArray);
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
      setEnsembleTableInfo([]);
      setDistanceMeasureDropDown([]);
      setResponses([]);
    } else if (k === "Colorado") {
      if (state !== k) {
        setDistrict(null);
        setEnsemble(null);
        setDistanceMeasure(null);
        setCluster(null);
        setClusterADP(null);
        setDistrictPlan([]);
        setStateDistrictMap(null);
        setEnsembleList([]);
        setClusters([]);
        setEnsembleTableInfo([]);
        setDistanceMeasureDropDown([]);
        setResponses([]);
      }
      getStateInfo("Colorado").then((res) => {
        if (res !== "Error") {
          setStateDistrictMap(res[0].colo2020);
          setEnsembleList(res[0].ensembles);
          setState("Colorado");
          setCenter([39.4, -106]);
          setZoom(6.0);
          setEnsembleTableInfo(res[1]);
        }
      });
    } else if (k === "Ohio") {
      if (state !== k) {
        setDistrict(null);
        setEnsemble(null);
        setDistanceMeasure(null);
        setCluster(null);
        setClusterADP(null);
        setDistrictPlan([]);
        setStateDistrictMap(null);
        setEnsembleList([]);
        setClusters([]);
        setEnsembleTableInfo([]);
        setDistanceMeasureDropDown([]);
        setResponses([]);
      }
      getStateInfo("Ohio").then((res) => {
        if (res !== "Error") {
          setStateDistrictMap(res[0].ohio2020);
          setEnsembleList(res[0].ensembles);
          setState("Ohio");
          setCenter([41.5, -83]);
          setZoom(6.0);
          setEnsembleTableInfo(res[1]);
        }
      });
    } else if (k === "Illinois") {
      if (state !== k) {
        setDistrict(null);
        setEnsemble(null);
        setDistanceMeasure(null);
        setCluster(null);
        setClusterADP(null);
        setDistrictPlan([]);
        setStateDistrictMap(null);
        setEnsembleList([]);
        setClusters([]);
        setEnsembleTableInfo([]);
        setDistanceMeasureDropDown([]);
        setResponses([]);
      }
      getStateInfo("Illinois").then((res) => {
        if (res !== "Error") {
          setStateDistrictMap(res[0].ill2020);
          setEnsembleList(res[0].ensembles);
          setState("Illinois");
          setCenter([40, -89.5]);
          setZoom(6.0);
          setEnsembleTableInfo(res[1]);
        }
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
      setEnsembleTableInfo([]);
      setDistanceMeasureDropDown([]);
      setResponses([]);
    }
  };
  const getStateInfo = async (state) => {
    let res = [];
    try {
      let json = await apis.getState(state);
      if (json.data === "Error")
        throw new Error("error getting state information...");
      let json2 = await apis.getEnsemble(state);
      if (json2.data === "Error")
        throw new Error("error getting ensemble informaation...");

      res.push(json.data);
      res.push(json2.data);
      return res;
    } catch (error) {
      return "Error";
    }
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
        if (allResponses === "error")
          throw new Error("error with getting district plan geo json");
        setResponses(allResponses);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [districtPlan]);

  if (state && view == "Ensemble & Cluster Analysis") {
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
            dmList={distanceMeasureDropDown}
            cluster={cluster}
            districtPlan={districtPlan}
          >
            HEY
          </Navbar>
          <div className="flex flex-row flex-1">
            <div className="aspect-square">
              <h1></h1>
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
                clusterADP={clusterADP}
              ></Map2>

              <center>
                <h2>StateTable</h2>
              </center>

              <StateTable state={state} />
              {!ensemble && (
                <EnsembleTable
                  changeEnsemble={changeEnsemble}
                  ensembleTableInfo={ensembleTableInfo}
                />
              )}

              {ensemble && (
                <div>
                  <DistanceMeasureTable
                    distanceMeasureInfo={ensembleTableInfo}
                    ensembleName={ensemble}
                    changeDistanceMeasure={changeDistanceMeasure}
                    distanceMeasure={distanceMeasure}
                  />
                  <br />
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: "#990001",
                      color: "white",
                      fontSize: "12px",
                      marginLeft: "5px", // Adjust the margin as needed
                    }}
                    onClick={viewEnsembles}
                  >
                    View Ensembles
                  </Button>
                </div>
              )}
            </div>

            <InfoPanel
              view={view}
              changeView={changeView}
              distanceMeasure={distanceMeasure}
              setCluster={setCluster}
              clusters={clusters}
              cluster={cluster}
              districtPlanInfo={districtPlanInfo}
              changeCluster={changeCluster}
              clickClusterButton={clickClusterButton}
              changeDistrictPlan={changeDistrictPlan}
              getClusterADP={getClusterADP}
              setClusterADP={setClusterADP}
              responses={responses}
              setResponses={setResponses}
              districtPlan={districtPlan}
              state={state}
              ensembleTableInfo={ensembleTableInfo}
              ensemble={ensemble}
            />
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
          dmList={distanceMeasureDropDown}
          cluster={cluster}
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
