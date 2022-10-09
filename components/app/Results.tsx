import { useEffect, useState } from "react";
import { Location, SpotTypes, spots, Images } from "../../utils/types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import ResultCard from "./ResultCard";
import Chip from "../base/Chip";

export default function Results({
  locations,
  setLocations,
}: {
  locations: Location[];
  setLocations: (locations: Location[]) => void;
}) {
  const [closed, setClosed] = useState(true);
  const [show, setShow] = useState<SpotTypes[]>([...spots]);
  const [images, setImages] = useState<Images>({});

  useEffect(() => {
    if (locations && Object.values(locations).flat().length > 0) {
      setClosed(false);
    } else {
      setClosed(true);
    }
  }, [locations]);

  return (
    <div
      className={`absolute w-1/3 xl:w-1/4 flex items-center left-0 z-10 h-full bg-gray-100 dark:bg-zinc-900 transition-all duration-300 ${
        !closed
          ? "translate-x-[75%] xl:translate-x-[81%]"
          : "-translate-x-[23%] xl:-translate-x-[19%]"
      }`}
    >
      <div className="relative flex flex-col w-full h-full overflow-y-auto py-6 px-4 gap-2">
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
            <ResultCard
              location={location}
              key={i}
              images={images}
              setImages={setImages}
            />
          ))}
      </div>
      <div className="absolute -right-6">
        <button
          className="h-20 w-6 bg-zinc-100 dark:bg-zinc-800 rounded-r-lg"
          onClick={() => setClosed(!closed)}
        >
          {closed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>
    </div>
  );
}
