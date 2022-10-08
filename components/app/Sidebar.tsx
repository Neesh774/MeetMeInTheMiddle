import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Filters as FiltersType } from "../../utils/types";
import Button from "../base/Button";
import Addresses from "./Addresses";
import Filters from "./Filters";

export default function Sidebar({
  addresses,
  setAddresses,
  setLocations,
}: {
  addresses: string[];
  setAddresses: (addresses: string[]) => void;
  setLocations: (locations: any[]) => void;
}) {
  const [filters, setFilters] = useState<FiltersType>({
    spotTypes: {
      cafe: true,
      dining: false,
      park: false,
      bar: false,
      movies: false,
      landmark: false,
      bowling: false,
      station: false,
    },
    radius: 5,
  });
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
    if (results && (Object.values(results) as any[][]).flat().length === 0) {
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
    <div className="flex flex-col w-2/6 xl:w-3/12 min-h-[92%] border-r-2 border-gray-200 dark:border-gray-600 px-4 py-6 justify-between">
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
