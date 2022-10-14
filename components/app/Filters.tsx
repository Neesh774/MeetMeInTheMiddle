import { IoIosCafe } from "react-icons/io";
import {
  MdRestaurant,
  MdOutlinePark,
  MdAttractions,
  MdTrain,
  MdTour,
} from "react-icons/md";
import { BiChevronLeft, BiChevronRight, BiDrink } from "react-icons/bi";
import Icon from "../base/Icon";
import { Filters as FiltersType, SpotTypes } from "../../utils/types";
import Slider from "../base/Slider";
import { TbMovie } from "react-icons/tb";
import { FaBowlingBall } from "react-icons/fa";
import { useState } from "react";
import IconButton from "../base/IconButton";
import TimePicker from "../base/TimePicker";

export default function Filters({
  filters,
  setFilters,
}: {
  filters: FiltersType;
  setFilters: (types: FiltersType) => void;
}) {
  const [filtersPage, setFiltersPage] = useState(0);
  const [showTime, setShowTime] = useState(
    filters.day != undefined && filters.time != undefined
  );
  const map = {
    cafe: <IoIosCafe />,
    dining: <MdRestaurant />,
    park: <MdOutlinePark />,
    bar: <BiDrink />,
    movies: <TbMovie />,
    landmark: <MdTour />,
    bowling: <FaBowlingBall />,
    station: <MdTrain />,
  };
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="flex flex-col items-center">
      <h6 className="uppercase flex items-center gap-2 text-zinc-400 dark:text-zinc-600 font-semibold text-sm">
        Day/Time{" "}
        <input
          type="checkbox"
          checked={showTime}
          onChange={() => {
            if (showTime) {
              setFilters({ ...filters, time: undefined, day: undefined });
            } else {
              setFilters({ ...filters, time: "1200", day: 0 });
            }
            setShowTime(!showTime);
          }}
          className="w-4 h-4 accent-primary-400 rounded-lg"
        />
      </h6>
      <div className="flex flex-row justify-center gap-4 w-full">
        {showTime && (
          <>
            <select
              onChange={(e) => {
                setFilters({
                  ...filters,
                  day: Number((e.target as HTMLSelectElement).value),
                });
              }}
              className="px-2 w-32 rounded-md"
            >
              {days.map((day, i) => (
                <option label={day} value={i} key={i} />
              ))}
            </select>
            <TimePicker
              time={filters.time as string}
              setTime={(time) => setFilters({ ...filters, time })}
            />
          </>
        )}
      </div>
      <h6 className="uppercase text-zinc-400 dark:text-zinc-600 font-semibold text-sm">
        Radius
      </h6>
      <div className="flex flex-row justify-center gap-2 w-full">
        <Slider
          value={filters.radius}
          setValue={(value) => {
            setFilters({
              ...filters,
              radius: value,
            });
          }}
          min={1}
          max={9}
        />
      </div>
      <h6 className="uppercase text-zinc-400 dark:text-zinc-600 font-semibold text-sm mt-2">
        Search For
      </h6>
      <div className="flex flex-row items-center gap-2">
        <IconButton
          className="h-8 w-8"
          onClick={() => {
            const newPage = filtersPage - 1;
            if (newPage < 0) {
              setFiltersPage(0);
            } else {
              setFiltersPage(newPage);
            }
          }}
          disabled={filtersPage == 0}
        >
          <BiChevronLeft />
        </IconButton>
        {Object.keys(map)
          .slice(filtersPage * 4, (filtersPage + 1) * 4)
          .map((type) => (
            <button
              key={type}
              className={`border-2 border-transparent hover:border-gray-300 transition-all duration-150 rounded-lg cursor-pointer ${
                filters.spotTypes[type as SpotTypes]
                  ? "bg-tertiary-400 hover:bg-tertiary-600 hover:border-tertiary-600"
                  : ""
              }`}
              onClick={() => {
                setFilters({
                  ...filters,
                  spotTypes: {
                    ...filters.spotTypes,
                    [type]: !filters.spotTypes[type as SpotTypes],
                  },
                });
              }}
            >
              <div
                className={`flex flex-col items-center ${
                  filters.spotTypes[type as SpotTypes]
                    ? "text-white"
                    : "text-zinc-800 dark:text-zinc-500"
                }`}
              >
                <Icon width="12">{map[type as SpotTypes]}</Icon>
                <span className="text-xs mb-1">{type}</span>
              </div>
            </button>
          ))}
        <IconButton
          className="h-8 w-8"
          onClick={() => {
            const newPage = filtersPage + 1;
            if (newPage > Object.keys(map).length / 4 - 1) {
              setFiltersPage(Object.keys(map).length / 4 - 1);
            } else {
              setFiltersPage(newPage);
            }
          }}
          disabled={filtersPage >= Object.keys(map).length / 4 - 1}
        >
          <BiChevronRight />
        </IconButton>
      </div>
    </div>
  );
}
