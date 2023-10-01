import Image from "next/image";
import Map from "./components/Map";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
          <h2 className={`mb-3 text-6xl font-semibold pb-6`}>
            CHIEFS LIKE SWIFTIES{" "}
          </h2>
          <div className="hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <p className={`m-0 h-24 max-w-[30ch] text-sm opacity-50 `}>
              Find in-depth information about Next.js features and API.
            </p>
          </div>
          <div className="hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <p className={`m-0 h-24 max-w-[30ch] text-sm opacity-50 `}>
              Find in-depth information about Next.js features and API.
            </p>
          </div>
          <div className="hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <p className={`m-0 h-24 max-w-[30ch] text-sm opacity-50 `}>
              Find in-depth information about Next.js features and API.
            </p>
          </div>
          <div className="hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <p className={`m-0 h-24 max-w-[30ch] text-sm opacity-50 `}>
              Find in-depth information about Next.js features and API.
            </p>
          </div>
          <div className="hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <p className={`m-0 h-24 max-w-[30ch] text-sm opacity-50 `}>
              Find in-depth information about Next.js features and API.
            </p>
          </div>
          <div className="hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <p className={`m-0 h-24 max-w-[30ch] text-sm opacity-50 `}>
              Find in-depth information about Next.js features and API.
            </p>
          </div>
        </div>
        <Map></Map>
      </div>
    </main>
  );
}
