import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import { useSwipeable } from "react-swipeable";
import { Address, Filters as FiltersType, Location } from "../../utils/types";
import Button from "../base/Button";
import Addresses from "./Addresses";
import Filters from "./Filters";
import ShareButton from "./ShareButton";

export default function Sidebar({
  addresses,
  setAddresses,
  setLocations,
  filters,
  setFilters,
  closed,
  setClosed,
  resultsClosed,
  setResultsClosed,
}: {
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  setLocations: (locations: Location[]) => void;
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
  closed: boolean;
  setClosed: (closed: boolean) => void;
  resultsClosed: boolean;
  setResultsClosed: (resultsClosed: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [canSearch, setCanSearch] = useState(false);
  const { theme } = useTheme();
  const handlers = useSwipeable({
    onSwipedUp: () => setClosed(false),
    onSwipedDown: () => setClosed(true),
    preventScrollOnSwipe: true,
  });

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
    if (results) {
      setLocations(results);
    } else {
      toast.error("Something went wrong");
    }
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
    setClosed(true);
  };

  useEffect(() => {
    setCanSearch(
      addresses.length > 1 &&
        addresses.every((a) => a.coords && a.formatted_address) &&
        Object.entries(filters.spotTypes).some(([, v]) => v)
    );
  }, [addresses, filters]);

  return (
    <div
      className={`absolute lg:static flex flex-col left-0 right-0 lg:w-full overflow-y-visible rounded-t-lg lg:rounded-t-none lg:max-w-[24rem] h-[95%] border-t-2 lg:border-t-0 lg:h-full lg:border-r-2 border-gray-200 dark:border-gray-600 px-4 pb-12 lg:pb-6 lg:pt-6 justify-between z-20 bg-white dark:bg-black transition-all duration-300 ${
        closed && resultsClosed
          ? "-bottom-[83%] lg:bottom-0"
          : closed && !resultsClosed
          ? "-bottom-[90%] lg:bottom-0"
          : "bottom-0"
      }`}
      {...handlers}
    >
      <div className="h-[70%]">
        <div
          className="flex justify-center lg:hidden cursor-pointer pt-6 lg:pt-0"
          onClick={() => setClosed(!closed)}
        >
          {closed ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
        </div>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-200">
            Details
          </h1>
        </div>
        <Addresses
          addresses={addresses}
          setAddresses={setAddresses}
          setLocations={setLocations}
        />
      </div>
      <div className="h-[30%] flex flex-col justify-end">
        <Filters filters={filters} setFilters={setFilters} />
        <div className="flex justify-between mt-4">
          <ShareButton />
          <Button
            size="md"
            style={canSearch ? "primary" : "disabled"}
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
