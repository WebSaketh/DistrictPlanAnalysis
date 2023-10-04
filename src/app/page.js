"use client";
import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import Table from "./components/Table/table";
import Navbar from "./components/Navbar";
import Tile from "./components/Tile";
import React, { useEffect, useState } from "react";
import Map2 from "./components/Map2";

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

/*const data1 = {
  columns: [
    "Cluster",
    "Number of Plans",
    "Avg Distance between Plans",
    "Republican %",
    "Democratic %",
    "White %",
  ],
  rows: [
    [
      3,
      getRandomInt(1000),
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
    ],
    [
      5,
      getRandomInt(1000),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
      getRandomInt(100),
    ],
  ],
};*/

export default function Home() {
  const [state, setState] = useState(null);
  const [center, setCenter] = useState([40, -96]);
  const [zoom, setZoom] = useState(4.6);
  const [district, setDistrict] = useState(null);
  const [year, setYear] = useState("2020");

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
        <Navbar changeState={changeState} changeYear={changeYear}>
          HEY
        </Navbar>

        <div className="flex min-h-screen  justify-between p-0 pb-20 pt-0">
          <div className="flex flex-row text-center lg:w-full lg:mb-0  lg:text-left">
            <div className="aspect-square">
              <Map2
                state={state}
                center={center}
                zoom={zoom}
                year={year}
                district={district}
                changeDistrict={changeDistrict}
                changeState={changeState}
              ></Map2>
            </div>
            <div className="flex flex-row text-center lg:w-full lg:mb-0  lg:text-left">
              <Table data={data1} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar changeState={changeState} changeYear={changeYear}>
        HEY
      </Navbar>

      <div className="flex min-h-screen  justify-between p-0 pb-20 pt-0">
        <div className="flex flex-row text-center lg:w-full lg:mb-0  lg:text-left">
          <div className="aspect-square">
            <Map
              state={state}
              center={center}
              zoom={zoom}
              year={year}
              district={district}
              changeDistrict={changeDistrict}
              changeState={changeState}
            ></Map>
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /* <div className="aspect-square bg-slate-50 group border border-transparent px-5 py-4 transition-colors ">
  <div className="h-full overflow-scroll">
    <Tile state={state} district={district} year={year} title="Thing 1">
      null
    </Tile>
    <Tile state={state} district={district} year={year} title="Thing 2">
      null
    </Tile>
    <Tile state={state} district={district} year={year} title="Thing 3">
      null
    </Tile>
    <Tile state={state} district={district} year={year} title="Thing 4">
      null
    </Tile>
    <Tile state={state} district={district} year={year} title="Thing 5">
      null
    </Tile>
    <Tile state={state} district={district} year={year} title="Thing 6">
      null
    </Tile>
    <Tile state={state} district={district} year={year} title="Thing 7">
      null
    </Tile>
    <Tile state={state} district={district} year={year} title="Thing 8">
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
</div>; */
}
