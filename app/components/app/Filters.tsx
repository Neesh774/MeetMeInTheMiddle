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
import {
  Filters as FiltersType,
  spots,
  SpotTypes,
  typesMap,
} from "../../utils/types";
import Slider from "../base/Slider";
import { TbMovie } from "react-icons/tb";
import { FaBowlingBall } from "react-icons/fa";
import { useState } from "react";
import IconButton from "../base/IconButton";
import TimePicker from "../base/TimePicker";
import { useSwipeable } from "react-swipeable";
import LocationTypes from "./LocationTypes";

export default function Filters({
  filters,
  setFilters,
}: {
  filters: FiltersType;
  setFilters: (types: FiltersType) => void;
}) {
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
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-semibold text-zinc-600 dark:text-zinc-500">
        Filters
      </h1>
      <div className="flex flex-row justify-between items-center">
        <h6 className="uppercase flex items-center gap-2 text-zinc-500 dark:text-zinc-600 font-semibold text-sm">
          Day/Time{" "}
        </h6>
        <div className="flex flex-row justify-center gap-4 w-full">
          <TimePicker
            time={filters.time as string}
            setTime={(time) => setFilters({ ...filters, time })}
            days={days}
            setDay={(day) => {
              setFilters({
                ...filters,
                day: day,
              });
            }}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <h6 className="uppercase text-zinc-500 dark:text-zinc-600 font-semibold text-sm">
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
      </div>
      <div className="flex flex-row justify-between items-center">
        <h6 className="uppercase text-zinc-500 dark:text-zinc-600 font-semibold text-sm mt-2">
          Search For
        </h6>
        <LocationTypes filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}
