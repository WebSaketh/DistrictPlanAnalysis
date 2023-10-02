"use client";
import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Tile from "./components/Tile";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState("Default");
  const [center, setCenter] = useState([40, -96]);
  const [zoom, setZoom] = useState(4.6);

  const changeState = (e) => {
    var k = e.target.text;
    console.log(e.target.text);
    if (e.target.text === "Default") {
      setState("Default");
      setCenter([40, -96]);
      setZoom(4.6);
    } else if (k === "Colorado") {
      setState("Colorado");
      setCenter([39.4, -106]);
      setZoom(6.5);
    } else if (k === "Ohio") {
      setState("Ohio");
      setCenter([40, -83]);
      setZoom(6.5);
    } else if (k === "Illinois") {
      setState("Illinois");
      setCenter([40, -89.5]);
      setZoom(6.5);
    } else if (k === "Reset Map") {
      setState("Default");
      console.log("RESETMAP");
      setCenter([40, -96]);
      setZoom(4.6);
    }
  };

  useEffect(() => {
    console.log("useEffect", state, zoom, center);
    document.getElementById("map")?.click();
    document.getElementById("map")?.click();
  }, [state, zoom, center]);

  return (
    <main>
      <Navbar>HEY</Navbar>
      <div className="flex min-h-screen flex-col items-center justify-between p-36 pt-0">
        <div className="mb-32 grid text-center lg:w-full lg:mb-0 lg:grid-cols-11 lg:text-left">
          <div className="col-span-6">
            <Map state={state} center={center} zoom={zoom}></Map>
          </div>
          <div className="aspect-square bg-slate-50 col-span-5 group border border-transparent px-5 py-4 transition-colors ">
            <div className="h-full overflow-scroll">
              <Tile title="Thing 1">null</Tile>
              <Tile title="Thing 2">null</Tile>
              <Tile title="Thing 3">null</Tile>
              <Tile title="Thing 4">null</Tile>
              <Tile title="Thing 5">null</Tile>
              <Tile title="Thing 6">null</Tile>
              <Tile title="Thing 7">null</Tile>
              <Tile title="Thing 8">null</Tile>
            </div>
            <div className="grid grid-cols-12 mb-4">
              <div className="col-span-3">
                <Dropdown
                  title="Select State"
                  items={["Colorado", "Illinois", "Ohio"]}
                  changeState={changeState}
                ></Dropdown>
              </div>
              <div className="col-span-3">
                <Dropdown
                  title="District Plans"
                  items={["2022", "2023"]}
                ></Dropdown>
              </div>
              <div className="col-span-4"></div>
              <button
                text="Reset Map"
                onClick={changeState}
                className="col-span-2 m-1 btn btn-error self-end"
              >
                <a>Reset Map</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
