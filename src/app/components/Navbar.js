import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";

const Navbar = (props) => {
  const [header, setHeader] = useState("");

  useEffect(() => {
    let temp = "";
    if (props.state !== null) {
      temp += props.state;
    }
    if (props.ensemble !== null) {
      temp += " > " + props.ensemble;
    }
    if (props.distanceMeasure !== null) {
      temp += " > " + props.distanceMeasure;
    }
    if (props.cluster !== null) {
      temp += " > Cluster " + props.cluster;
    }
    setHeader(temp);
  }, [props]);
  return (
    <nav className="w-full flex items-center justify-between flex-wrap bg-[#990000] p-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="50.000000pt"
          height="40.000000pt"
          viewBox="0 0 300.000000 184.000000"
          preserveAspectRatio="xMidYMid meet"
          onClick={props.goToAbout}
          className="cursor-pointer"
        >
          <g
            transform="translate(0.000000,184.000000) scale(0.050000,-0.050000)"
            fill="#fafafa"
            stroke="none"
          >
            <path
              d="M1174 3567 c-85 -24 -83 -145 9 -423 93 -285 -16 -431 -266 -355 -343 104 -627 -52 -578 -316 l23 -123 -90 -200 c-138 -304 -147 -366 -91 -603 36 -151 47 -257 48 -452 1 -203 7 -255 29 -255 15 0 82 9 150 19 715 112 742 98 663 -347 -56 -311 -54 -358 14 -395 50 -26 297 -25 463 2 64 11 213 14 330 8 201 -12 219 -10 342 42 82 35 204 65 330 80 234 29 253 34 450 121 83 37 216 76 296 89 81 12 190 43 242 70 52 26 130 54 173 62 148 28 282 84 417 177 74 50 152 92 173 92 72 0 298 98 440 191 79 51 190 114 247 139 68 30 157 99 253 196 145 145 364 254 510 254 49 0 109 77 109 138 0 76 -61 146 -243 280 -81 59 -165 136 -187 170 -44 67 -119 110 -290 163 -90 29 -136 62 -250 179 -172 177 -190 187 -394 210 -167 20 -175 23 -389 183 -68 50 -107 63 -220 72 -111 8 -167 26 -297 95 -136 73 -184 87 -320 99 -160 13 -256 48 -490 180 -97 55 -207 65 -355 30 -74 -17 -102 -12 -205 31 -166 70 -901 138 -1046 97z m516 -127 c319 -19 401 -33 506 -88 75 -39 115 -41 324 -22 l150 14 160 -93 c181 -104 240 -123 446 -142 121 -12 168 -28 280 -95 116 -71 155 -83 284 -93 141 -10 158 -17 270 -104 155 -120 182 -132 312 -147 239 -27 235 -25 382 -180 127 -135 154 -153 329 -220 139 -55 194 -86 207 -119 9 -25 103 -110 208 -191 216 -164 228 -189 107 -220 -268 -69 -315 -95 -486 -263 -91 -89 -185 -159 -265 -197 -69 -32 -163 -85 -210 -117 -128 -87 -273 -156 -402 -190 -64 -17 -163 -61 -219 -99 -152 -100 -219 -132 -337 -156 -58 -12 -164 -47 -236 -78 -71 -31 -196 -66 -276 -78 -86 -14 -207 -51 -291 -91 -141 -67 -328 -111 -476 -111 -41 0 -144 -28 -230 -62 -147 -59 -167 -62 -347 -53 -111 7 -288 -1 -427 -18 -286 -35 -322 -28 -305 60 107 534 103 621 -33 720 -57 42 -63 42 -670 -19 l-105 -11 0 191 c0 121 -16 262 -43 386 -51 232 -44 270 98 572 l92 195 -25 132 c-40 218 138 298 468 212 331 -87 470 139 350 568 -33 118 -60 216 -60 219 0 12 93 23 130 15 22 -5 175 -17 340 -27z"
              fill="#fafafa"
            />
            <path
              d="M1408 2786 c-65 -70 -61 -173 7 -182 45 -7 45 -7 45 -402 l0 -395 -60 -57 c-52 -50 -60 -72 -60 -164 l0 -106 396 0 c450 0 444 -2 444 153 0 99 -3 105 -55 111 -141 16 -86 98 165 245 279 163 335 158 175 -18 -362 -396 -167 -882 418 -1044 194 -53 748 -48 971 9 351 90 633 315 678 540 l13 64 -145 0 -145 0 -105 -108 c-346 -354 -1266 -280 -1371 110 -22 82 5 238 41 238 31 0 45 -43 22 -66 -12 -12 -22 -70 -22 -128 l0 -106 382 0 382 0 42 53 c83 105 54 183 -139 371 -208 203 -199 217 124 181 303 -34 395 -83 532 -280 58 -84 61 -85 176 -85 177 0 193 34 185 398 l-6 282 -80 0 c-44 0 -108 -14 -141 -32 -57 -29 -77 -28 -274 13 -301 61 -533 71 -753 30 -240 -44 -235 -44 -243 -21 -18 51 324 230 438 230 128 0 161 27 151 124 l-6 66 -364 5 -364 6 -6 -73 c-6 -72 -11 -76 -393 -300 -213 -126 -390 -228 -395 -228 -4 0 -8 80 -8 178 l0 178 70 41 c64 38 70 50 70 132 l0 91 -371 0 -371 0 -50 -54z"
              fill="#fafafa"
            />
          </g>
        </svg>
        <span
          className="font-semibold text-xl tracking-tight cursor-pointer"
          onClick={props.goToAbout}
        >
          CHIEFS
        </span>
        {/*<button
          text="Cluster Analysis"
          onClick={props.changeView}
          className={
            props.view == "Cluster Analysis"
              ? "col-span-2 m-1 ml-4 btn btn-error self-end bg-red-200"
              : "col-span-2 m-1 ml-4 btn btn-error self-end"
          }
        >
          <a>Cluster Analysis</a>
        </button>
        <button
          text="Distance Measure Analysis"
          onClick={props.changeView}
          className={
            props.view == "Distance Measure Analysis"
              ? "col-span-2 m-1 ml-4 btn btn-error self-end bg-red-200"
              : "col-span-2 m-1 ml-4 btn btn-error self-end"
          }
        >
          <a>Distance Measure Analysis</a>
        </button>*/}
        <div>
          <h1 className="header-navbar">{header}</h1>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="col-span-2">
          {props.state === null ? (
            <Dropdown
              title="▼ Select State"
              items={["Colorado", "Illinois", "Ohio"]}
              changeState={props.changeState}
            ></Dropdown>
          ) : (
            <Dropdown
              title="Select State"
              items={["Colorado", "Illinois", "Ohio"]}
              changeState={props.changeState}
              itemName={"▼ " + props.state}
            ></Dropdown>
          )}
        </div>

        {props.state && (
          <button
            text="Reset Map"
            onClick={props.changeState}
            className="col-span-2 m-1 btn btn-error self-end"
          >
            <a>Reset Map</a>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
