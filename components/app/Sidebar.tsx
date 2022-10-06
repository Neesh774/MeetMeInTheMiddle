import { useState } from "react";
import Addresses from "./Addresses";
import SpotTypes from "./SpotTypes";

export default function Sidebar() {
  const [addresses, setAddresses] = useState<string[]>([""]);
  const [spotTypes, setSpotTypes] = useState({
    cafe: true,
    dining: false,
    park: false,
    bar: false,
  });
  return (
    <div className="flex flex-col md:w-72 xl:w-96 min-h-[92%] border-r-2 border-gray-200 dark:border-gray-600 px-4 py-6 justify-between">
      <Addresses addresses={addresses} setAddresses={setAddresses} />
      <SpotTypes types={spotTypes} setTypes={setSpotTypes} />
    </div>
  );
}
