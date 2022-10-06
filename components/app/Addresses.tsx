import { Dispatch, SetStateAction } from "react";
import { TbPlus, TbTrash } from "react-icons/tb";
import Autocomplete from "./Autocomplete";
import Button from "../base/Button";
import IconButton from "../base/IconButton";
import Input from "../base/Input";

export default function Addresses({
  setAddresses,
  addresses,
}: {
  setAddresses: Dispatch<SetStateAction<string[]>>;
  addresses: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold">Addresses</h1>
        <Button
          size="sm"
          onClick={() => {
            setAddresses([...addresses, ""]);
          }}
          style={addresses.length >= 10 ? "disabled" : "primary"}
        >
          <div className="flex flex-row items-center gap-1">
            <TbPlus />
            Add
          </div>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {addresses.map((address, i) => (
          <div key={i} className="flex flex-row gap-2">
            <Autocomplete
              value={address}
              setValue={(value) => {
                const newAddresses = [...addresses];
                newAddresses[i] = value;
                setAddresses(newAddresses);
              }}
              placeholder="Address"
            />
            <IconButton
              iconStyles="text-red-500"
              className={`hover:bg-red-500/20 border-none dark:hover:bg-red-500/40 ${
                addresses.length > 1 ? "" : "hidden"
              }`}
              onClick={() => {
                setAddresses(addresses.filter((_, j) => j !== i));
              }}
            >
              <TbTrash />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}
