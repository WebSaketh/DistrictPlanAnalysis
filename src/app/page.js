import Map from "./components/Map";
import Tile from "./components/Tile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:w-full lg:mb-0 lg:grid-cols-11 lg:text-left">
        <div className="col-span-6">
          <Map></Map>
        </div>
        <div className="col-span-5 group rounded-lg border border-transparent px-5 py-4 transition-colors">
          <h2 className={`mb-3 text-6xl font-semibold pb-6`}>
            CHIEFS LIKE SWIFTIES{" "}
          </h2>
          <Tile></Tile>
          <Tile></Tile>
          <Tile></Tile>
          <Tile></Tile>
          <Tile></Tile>
          <Tile></Tile>
        </div>
      </div>
    </main>
  );
}
