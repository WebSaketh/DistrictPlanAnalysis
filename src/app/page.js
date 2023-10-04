"use client";
import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import Table from "./components/Table/table";
import Navbar from "./components/Navbar";
import Tile from "./components/Tile";
import React, { useEffect, useState } from "react";
import Map2 from "./components/Map2";

export default function Home() {
  const [state, setState] = useState(null);
  const [center, setCenter] = useState([40, -96]);
  const [zoom, setZoom] = useState(4.6);
  const [district, setDistrict] = useState(null);
  const [ensemble, setEnsemble] = useState("2020");

  const changeEnsemble = (e) => {
    var k = e.target.text;
    console.log(k);
    setEnsemble(k);
  };

  const changeDistrict = (e) => {
    console.log("District:", e);
    setDistrict(e);
  };

  const changeState = (e) => {
    var k = e?.target?.text;
    if (e.target.text === "Default") {
      setState(null);
      setCenter([40, -96]);
      setZoom(4.6);
    } else if (k === "Colorado") {
      if (state !== k) {
        setDistrict(null);
      }
      setState("Colorado");
      setCenter([39.4, -106]);
      setZoom(6.5);
    } else if (k === "Ohio") {
      if (state !== k) {
        setDistrict(null);
      }
      setState("Ohio");
      setCenter([40, -83]);
      setZoom(6.5);
    } else if (k === "Illinois") {
      if (state !== k) {
        setDistrict(null);
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
    }
  };

  useEffect(() => {
    document.getElementById("map")?.click();
    document.getElementById("map2")?.click();
  }, [state, zoom, center]);

  if (state) {
    return (
      <main>
        <div className="flex min-h-screen max-h-screen flex-col justify-between p-0 pb-0 pt-0">
          <Navbar changeState={changeState} changeEnsemble={changeEnsemble}>
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
              <Table />
              <Table />
              <Table />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="flex min-h-screen  flex flex-col justify-between p-0 pb-0 pt-0">
        <Navbar changeState={changeState} changeEnsemble={changeEnsemble}>
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
