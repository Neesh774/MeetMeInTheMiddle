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
    cafe: <IoIosCafe />,
    dining: <MdRestaurant />,
    park: <MdOutlinePark />,
    bar: <BiDrink />,
  };

  return (
    <div className="flex flex-row justify-between">
      {Object.keys(map).map((type) => (
        <button
          key={type}
          className={`border-2 border-transparent hover:border-gray-300 transition-all duration-300 rounded-lg cursor-pointer ${
            types[type]
              ? "bg-tertiary-400 hover:bg-tertiary-600 hover:border-tertiary-600"
              : ""
          }`}
          onClick={() => {
            setTypes({ ...types, [type]: !types[type] });
          }}
        >
          <div className="flex flex-col items-center">
            <Icon className="w-9">
              {map[type as "cafe" | "dining" | "park" | "bar"]}
            </Icon>
            <span className="text-xs mb-1">{type}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
