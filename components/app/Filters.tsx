import { IoIosCafe } from "react-icons/io";
import {
  MdRestaurant,
  MdOutlinePark,
  MdAttractions,
  MdTrain,
  MdTour,
} from "react-icons/md";
import { BiDrink } from "react-icons/bi";
import Icon from "../base/Icon";
import { Filters as FiltersType, SpotTypes } from "../../utils/types";
import Slider from "../base/Slider";
import { TbMovie } from "react-icons/tb";
import { FaBowlingBall } from "react-icons/fa";

export default function Filters({
  filters,
  setFilters,
}: {
  filters: FiltersType;
  setFilters: (types: FiltersType) => void;
}) {
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

  return (
    <div className="flex flex-col items-center">
      <h6 className="uppercase text-zinc-400 dark:text-zinc-600 font-semibold text-sm">
        Radius
      </h6>
      <div className="flex flex-row justify-center gap-2 w-full">
        <Slider
          value={filters.radius}
          setValue={(value) =>
            setFilters({
              ...filters,
              radius: value,
            })
          }
          min={1}
          max={9}
        />
      </div>
      <h6 className="uppercase text-zinc-400 dark:text-zinc-600 font-semibold text-sm mt-2">
        Search For
      </h6>
      <div className="gap-2 w-full grid grid-cols-4">
        {Object.keys(map).map((type) => (
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
              <Icon width="10">{map[type as SpotTypes]}</Icon>
              <span className="text-xs mb-1">{type}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
