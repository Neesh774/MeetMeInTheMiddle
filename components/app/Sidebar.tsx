import { useState } from "react";
import Button from "../base/Button";
import Addresses from "./Addresses";
import SpotTypes from "./SpotTypes";

export default function Sidebar({
  addresses,
  setAddresses,
  setLocations,
}: {
  addresses: string[];
  setAddresses: (addresses: string[]) => void;
  setLocations: (locations: any[]) => void;
}) {
  const [spotTypes, setSpotTypes] = useState({
    cafe: true,
    dining: false,
    park: false,
    bar: false,
  });
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const results = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addresses,
        spotTypes,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
      });
    setLocations(results);
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:w-72 xl:w-96 min-h-[92%] border-r-2 border-gray-200 dark:border-gray-600 px-4 py-6 justify-between">
      <Addresses addresses={addresses} setAddresses={setAddresses} />
      <div>
        <div className="flex justify-end mb-4">
          <Button
            size="md"
            style={
              addresses.filter((a) => a.length > 0).length >= 2 &&
              (spotTypes.bar ||
                spotTypes.cafe ||
                spotTypes.dining ||
                spotTypes.park)
                ? "primary"
                : "disabled"
            }
            loading={loading}
            onClick={search}
          >
            Search
          </Button>
        </div>
        <SpotTypes types={spotTypes} setTypes={setSpotTypes} />
      </div>
    </div>
  );
}
