import Dropdown from "./components/Dropdown";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Tile from "./components/Tile";

export default function Home() {
  return (
    <main>
      <Navbar>HEY</Navbar>
      <div className="flex min-h-screen flex-col items-center justify-between p-36 pt-0">
        <div className="mb-32 grid text-center lg:w-full lg:mb-0 lg:grid-cols-11 lg:text-left">
          <div className="col-span-6">
            <Map></Map>
          </div>
          <div className="aspect-square bg-slate-50 col-span-5 group border border-transparent px-5 py-4 transition-colors ">
            <div className="grid grid-cols-12 mb-4">
              <div className="col-span-3">
                <Dropdown
                  title="Select State"
                  items={["Colorado", "Illinois", "Ohio"]}
                ></Dropdown>
              </div>
              <div className="col-span-3">
                <Dropdown
                  title="District Plans"
                  items={["2022", "2023"]}
                ></Dropdown>
              </div>
              <div className="col-span-2"></div>
              <button className="col-span-2 m-1 btn btn-error self-end">
                Reset State
              </button>
              <button className="col-span-2 m-1 btn btn-error self-end">
                Reset Map{" "}
              </button>
            </div>

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
          </div>
        </div>
      </div>
    </main>
  );
}
