"use client";
import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Tile from "./components/Tile";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState(null);
  const [center, setCenter] = useState([40, -96]);
  const [zoom, setZoom] = useState(4.6);
  const [district, setDistrict] = useState(null);
  const [year, setYear] = useState(null);

  const changeYear = (e) => {
    var k = e.target.text;
    console.log(k);
    if (k === "2020") {
      setYear(k);
    } else if (k === "2023") {
      setYear(k);
    }
  };

  const changeDistrict = (e) => {
    console.log("District:", e);
    setDistrict(e);
  };

  const changeState = (e) => {
    var k = e.target.text;
    console.log(e.target.text);
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
    document.getElementById("map")?.click();
  }, [state, zoom, center]);

  return (
    <main>
      <Navbar>HEY</Navbar>
      <div className="flex min-h-screen flex-col items-center justify-between p-0 pb-36 pt-0">
        <div className="mb-32 grid text-center lg:w-full lg:mb-0 lg:grid-cols-11 lg:text-left">
          <div className="col-span-7">
            <Map
              state={state}
              center={center}
              zoom={zoom}
              year={year}
              district={district}
              changeDistrict={changeDistrict}
            ></Map>
          </div>
          <div className="aspect-square bg-slate-50 col-span-4 group border border-transparent px-5 py-4 transition-colors ">
            <div className="h-full overflow-scroll">
              <Tile
                state={state}
                district={district}
                year={year}
                title="Thing 1"
              >
                null
              </Tile>
              <Tile
                state={state}
                district={district}
                year={year}
                title="Thing 2"
              >
                null
              </Tile>
              <Tile
                state={state}
                district={district}
                year={year}
                title="Thing 3"
              >
                null
              </Tile>
              <Tile
                state={state}
                district={district}
                year={year}
                title="Thing 4"
              >
                null
              </Tile>
              <Tile
                state={state}
                district={district}
                year={year}
                title="Thing 5"
              >
                null
              </Tile>
              <Tile
                state={state}
                district={district}
                year={year}
                title="Thing 6"
              >
                null
              </Tile>
              <Tile
                state={state}
                district={district}
                year={year}
                title="Thing 7"
              >
                null
              </Tile>
              <Tile
                state={state}
                district={district}
                year={year}
                title="Thing 8"
              >
                null
              </Tile>
            </div>
            <div className="grid grid-cols-12 mt-4">
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
                  items={["2020", "2023"]}
                  changeState={changeYear}
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
