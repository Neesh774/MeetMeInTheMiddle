import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Filters as FiltersType, Location } from "../../utils/types";
import Button from "../base/Button";
import Addresses from "./Addresses";
import Filters from "./Filters";

export default function Sidebar({
  addresses,
  setAddresses,
  setLocations,
  filters,
  setFilters,
}: {
  addresses: string[];
  setAddresses: (addresses: string[]) => void;
  setLocations: (locations: Location[]) => void;
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
}) {
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const search = async () => {
    setLoading(true);
    const results = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addresses,
        filters,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
    setLocations(results);
    if (
      results &&
      (Object.values(results) as Location[][]).flat().length === 0
    ) {
      toast.error("No results found", {
        style: {
          background: theme === "dark" ? "#2B2B2B" : "#F4F4F4",
          color: theme === "dark" ? "#bfbfbf" : "#2B2B2B",
        },
      });
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col w-96 xl:w-[32rem] h-full border-r-2 border-gray-200 dark:border-gray-600 px-4 py-6 justify-between z-20 bg-white dark:bg-black">
      <Addresses
        addresses={addresses}
        setAddresses={setAddresses}
        setLocations={setLocations}
      />
      <div>
        <Filters filters={filters} setFilters={setFilters} />
        <div className="flex justify-end mt-4">
          <Button
            size="md"
            style={
              addresses.filter((a) => a.length > 0).length >= 2 &&
              (Object.entries(filters.spotTypes)
                .map(([key, value]) => value)
                .some((v) => v) as boolean)
                ? "primary"
                : "disabled"
            }
            loading={loading}
            onClick={search}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
