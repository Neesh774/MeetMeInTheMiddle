import { useEffect, useState } from "react";
import { Location, SpotTypes, spots, Images, Filters } from "../../utils/types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import ResultCard from "./ResultCard";
import Chip from "../base/Chip";

export default function Results({
  locations,
  setLocations,
  filters,
  resultsRef,
  closed,
  setClosed,
}: {
  locations: Location[];
  setLocations: (locations: Location[]) => void;
  filters: Filters;
  resultsRef: React.RefObject<HTMLDivElement>;
  closed: boolean;
  setClosed: (closed: boolean) => void;
}) {
  const [show, setShow] = useState<SpotTypes[]>(
    [...Object.entries(filters?.spotTypes || {})]
      .filter(([_, v]) => v)
      .map(([k, _]) => k as SpotTypes)
  );

  useEffect(() => {
    if (locations && Object.values(locations).flat().length > 0) {
      setClosed(false);
    } else {
      setClosed(true);
    }
  }, [locations, setClosed]);

  useEffect(() => {
    setShow(
      Object.entries(filters?.spotTypes || {})
        .filter(([_, v]) => v)
        .map(([k, _]) => k as SpotTypes)
    );
  }, [filters]);

  return (
    <div
      className={`absolute max-w-[24rem] xl:w-[32rem] flex items-center left-0 z-10 h-full bg-gray-200 dark:bg-zinc-900 transition-all duration-300 ${
        closed ? "-translate-x-0" : "translate-x-96 xl:-translate-x-[32rem]"
      }`}
    >
      <div
        className="relative flex flex-col w-full h-full overflow-y-auto py-6 px-4 gap-2"
        ref={resultsRef}
      >
        <div className="text-3xl font-semibold mb-3">Results</div>
        <div className="flex flex-row gap-2 flex-wrap">
          {spots.map((key, i) => (
            <Chip
              key={i}
              checked={show.includes(key)}
              toggle={() => {
                if (show.includes(key)) {
                  setShow(show.filter((item) => item !== key));
                } else {
                  setShow([...show, key]);
                }
              }}
            >
              {key}
            </Chip>
          ))}
        </div>
        {Object.values(locations)
          .filter((location) => show.includes(location.type))
          .flat()
          .map((location, i) => (
            <ResultCard location={location} key={i} />
          ))}
      </div>
      <div className="absolute -right-6">
        <button
          className="h-20 w-6 bg-zinc-200 dark:bg-zinc-900 rounded-r-lg"
          onClick={() => setClosed(!closed)}
        >
          {closed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>
    </div>
  );
}
