import { useEffect, useState } from "react";
import { Location, SpotTypes, spots, Images, Filters } from "../../utils/types";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
} from "react-icons/fi";
import Image from "next/image";
import ResultCard from "./ResultCard";
import Chip from "../base/Chip";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import { useSwipeable } from "react-swipeable";
import { weave } from "../../utils/weave";
import AdBanner from "../base/AdBanner";

export default function Results({
  locations,
  setLocations,
  filters,
  resultsRef,
  closed,
  setClosed,
  detailsClosed,
  setDetailsClosed,
}: {
  locations: Location[];
  setLocations: (locations: Location[]) => void;
  filters: Filters;
  resultsRef: React.RefObject<HTMLDivElement>;
  closed: boolean;
  setClosed: (closed: boolean) => void;
  detailsClosed: boolean;
  setDetailsClosed: (closed: boolean) => void;
}) {
  const types = [...new Set(locations.map((location) => location.type))];
  const [show, setShow] = useState<SpotTypes[]>(types);
  const handlers = useSwipeable({
    onSwipedUp: () => setClosed(true),
    onSwipedDown: () => setClosed(false),
    preventScrollOnSwipe: true,
  });

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
      className={`absolute w-full lg:max-w-[24rem] flex items-center top-0 lg:left-0 z-10 pt-2 lg:pt-0 lg:h-full bg-white dark:bg-black lg:bg-gray-200 lg:dark:bg-zinc-900 transition-all duration-300 border-b-2 lg:border-b-0 border-gray-200 dark:border-gray-600 ${
        closed && detailsClosed
          ? "top-12 lg:top-0 lg:left-0 -translate-y-full lg:translate-y-0"
          : !closed && detailsClosed
          ? "translate-y-0 -top-2 lg:top-0 lg:translate-x-96"
          : "-top-64 -translate-y-full lg:translate-y-0 lg:translate-x-0"
      }`}
      {...handlers}
    >
      <div
        className="relative flex flex-col-reverse lg:justify-start lg:flex-col w-full h-full overflow-y-auto pt-6 lg:py-6 px-4 gap-2"
        ref={resultsRef}
      >
        <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-200 mb-3 lg:mb-0">
          Results
        </div>
        <div className="flex flex-row gap-2 lg:flex-wrap max-w-full overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
          {types.length > 1 &&
            types.map((key, i) => (
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
        <div className="flex flex-row lg:flex-col snap-mandatory gap-2 snap-x w-full overflow-x-auto lg:snap-none">
          {weave(
            Object.values(locations)
              .filter((location) => show.includes(location.type))
              .flat()
              .map((location, i) => (
                <ResultCard location={location} key={i} day={filters.day} />
              )),
            Array(
              Math.floor(
                Object.values(locations).filter((location) =>
                  show.includes(location.type)
                ).length / 5
              )
            ).map((_, i) => <AdBanner key={i} />)
          )}
        </div>
      </div>
      <div className="absolute -bottom-6 w-full flex justify-center lg:w-auto lg:bottom-auto lg:-right-6">
        <button
          className="w-full pb-6 lg:pb-0 h-6 lg:h-20 lg:w-6 bg-white dark:bg-black lg:bg-gray-200 lg:dark:bg-zinc-900 flex justify-center items-center rounded-b-lg lg:rounded-b-none lg:rounded-r-lg border-b-2 lg:border-0 border-gray-200 dark:border-gray-600"
          onClick={() => setClosed(!closed)}
        >
          {closed ? (
            <>
              <FiChevronRight className="hidden lg:block" />
              <BsChevronCompactDown className="block lg:hidden" />
            </>
          ) : (
            <>
              <FiChevronLeft className="hidden lg:block" />
              <BsChevronCompactUp className="block lg:hidden" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
