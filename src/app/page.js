import Map from "./components/Map";
import Tile from "./components/Tile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-36 pt-20">
      <div className="mb-32 grid text-center lg:w-full lg:mb-0 lg:grid-cols-11 lg:text-left">
        <div className="col-span-6">
          <Map></Map>
        </div>
        <div className="aspect-square bg-slate-50 col-span-5 group border border-transparent px-5 py-4 transition-colors ">
          <h2
            className={`p-2 rounded-lg bg-gray-150 text-6xl font-semibold pb-6`}
          >
            <div className="dropdown dropdown-hover mt-0">
              <label
                tabIndex={0}
                className="btn m-1 bg-gray-300 border-gray-300 text-sm opacity-75 text-black"
              >
                Hover
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-gray-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
          </h2>
          <div className="h-full overflow-scroll">
            <Tile></Tile>
            <Tile></Tile>
            <Tile></Tile>
            <Tile></Tile>
            <Tile></Tile>
            <Tile></Tile>
            <Tile></Tile>
            <Tile></Tile>
          </div>
        </div>
      </div>
    </main>
  );
}
