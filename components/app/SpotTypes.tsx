import { IoIosCafe } from "react-icons/io";
import { MdRestaurant, MdOutlinePark } from "react-icons/md";
import { BiDrink } from "react-icons/bi";
import Icon from "../base/Icon";

export default function SpotTypes({
  types,
  setTypes,
}: {
  types: { [key: string]: boolean };
  setTypes: (types: any) => void;
}) {
  const map = {
    cafe: <IoIosCafe className="w-10" />,
    dining: <MdRestaurant className="w-10" />,
    park: <MdOutlinePark className="w-10" />,
    bar: <BiDrink className="w-10" />,
  };

  return (
    <div className="flex flex-col items-center">
      <h6 className="uppercase text-zinc-400 dark:text-zinc-600 font-semibold text-sm">
        Search For
      </h6>
      <div className="flex flex-row justify-between gap-2 w-full">
        {Object.keys(map).map((type) => (
          <button
            key={type}
            className={`border-2 border-transparent hover:border-gray-300 transition-all duration-150 rounded-lg cursor-pointer ${
              types[type]
                ? "bg-tertiary-400 hover:bg-tertiary-600 hover:border-tertiary-600"
                : ""
            }`}
            onClick={() => {
              setTypes({ ...types, [type]: !types[type] });
            }}
          >
            <div
              className={`flex flex-col items-center ${
                types[type] ? "text-white" : "text-zinc-800 dark:text-zinc-500"
              }`}
            >
              <Icon>{map[type as "cafe" | "dining" | "park" | "bar"]}</Icon>
              <span className="text-xs mb-1">{type}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
