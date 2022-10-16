import { TbPlus, TbTrash } from "react-icons/tb";
import Autocomplete from "./Autocomplete";
import Button from "../base/Button";
import IconButton from "../base/IconButton";
import Input from "../base/Input";
import { Address, Location } from "../../utils/types";
import { useEffect } from "react";

export default function Addresses({
  setAddresses,
  addresses,
  setLocations,
}: {
  setAddresses: (addresses: Address[]) => void;
  addresses: Address[];
  setLocations: (locations: Location[]) => void;
}) {
  const getLatLng = async (
    placeId: string,
    setValue: (lat: number, lng: number, addr: string) => void
  ) => {
    const response = await fetch("/api/geocode/" + placeId);
    const data = await response.json();
    const { lat, lng } = data.results[0].geometry.location;
    const { formatted_address } = data.results[0];
    setValue(lat, lng, formatted_address);
  };

  const clearLocations = () => {
    setLocations([]);
  };

  useEffect(() => {
    addresses.forEach((a) => {
      if (a.place_id && !a.coords) {
        getLatLng(a.place_id, (lat, lng, addr) => {
          const newAddresses = [...addresses];
          const index = newAddresses.findIndex(
            (addr) => a.place_id == addr.place_id
          );
          newAddresses[index].coords = { lat, lng };
          newAddresses[index].formatted_address = addr;
          setAddresses(newAddresses);
        });
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 h-[80%]">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg font-semibold text-zinc-600 dark:text-zinc-400">
          Addresses
        </h1>
        <Button
          size="sm"
          onClick={() => {
            setAddresses([
              ...addresses,
              {
                formatted_address: "",
              },
            ]);
          }}
          style={addresses.length >= 10 ? "disabled" : "white"}
        >
          <div className="flex flex-row items-center gap-1">
            <TbPlus />
            Add
          </div>
        </Button>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto lg:overflow-y-visible h-[100%]">
        {addresses.map((address, i) => (
          <div key={i} className="flex flex-row justify-between gap-2">
            <Autocomplete
              clearLocations={clearLocations}
              isFull={addresses.length == 1}
              value={{
                value: address.place_id,
                label:
                  address.formatted_address == ""
                    ? "Address"
                    : address.formatted_address,
              }}
              setValue={(label, value) => {
                getLatLng(value, (lat, lng) => {
                  const newAddresses = [...addresses];
                  const index = newAddresses.findIndex(
                    (addr) => address.place_id == addr.place_id
                  );
                  newAddresses[index].coords = { lat, lng };
                  newAddresses[index].formatted_address = label;
                  newAddresses[index].place_id = value;
                  setAddresses(newAddresses);
                });
              }}
              placeholder="Address"
            />
            <IconButton
              iconStyles="text-red-500"
              className={`hover:bg-red-500/20 w-10 flex justify-center items-center border-none dark:hover:bg-red-500/40 ${
                addresses.length > 1 ? "" : "hidden"
              }`}
              onClick={() => {
                setAddresses(addresses.filter((_, j) => j !== i));
                clearLocations();
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
