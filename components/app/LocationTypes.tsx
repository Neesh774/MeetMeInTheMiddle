import { Filters, SpotTypes, typesMap } from "../../utils/types";
import { usePopper } from "react-popper";
import { useState } from "react";
import Button from "../base/Button";
import { FiEdit } from "react-icons/fi";
import { type } from "os";
import Icon from "../base/Icon";
import React from "react";

export default function LocationTypes({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}) {
  const [refButton, setRefButton] = useState<HTMLButtonElement | null>(null);
  const [refPopper, setRefPopper] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(refButton, refPopper, {
    placement: "right-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 15],
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top-end"],
        },
      },
    ],
  });
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        ref={setRefButton}
        size="sm"
        style="white"
        onClick={() => setOpen(!open)}
      >
        <FiEdit />
        <span className="flex flex-row items-center">
          Select ({Object.values(filters.spotTypes).filter(Boolean).length})
        </span>
      </Button>
      {open && (
        <div
          className="absolute left-0 right-0 bottom-0 top-0 z-30"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        ref={setRefPopper}
        style={styles.popper}
        {...attributes.popper}
        className={`transition-all duration-150 z-50 ${
          !open && "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-zinc-200 dark:bg-zinc-900 border-2 border-black/20 dark:border-white/20 rounded-lg shadow-lg p-4 grid grid-cols-4 lg:grid-cols-3 gap-2">
          {Object.entries(typesMap).map(([key, value]) => (
            <button
              key={key}
              className={`border-2 border-transparent transition-all duration-150 rounded-lg ${
                filters.spotTypes[key as SpotTypes]
                  ? "bg-tertiary-400 hover:bg-tertiary-600 hover:border-tertiary-600"
                  : Object.values(filters.spotTypes).filter(Boolean).length == 3
                  ? "opacity-50"
                  : "cursor-pointer hover:border-gray-300"
              }`}
              disabled={
                Object.values(filters.spotTypes).filter(Boolean).length == 3 &&
                !filters.spotTypes[key as SpotTypes]
              }
              onClick={() => {
                setFilters({
                  ...filters,
                  spotTypes: {
                    ...filters.spotTypes,
                    [key]: !filters.spotTypes[key as SpotTypes],
                  },
                });
              }}
            >
              <div
                className={`flex flex-col items-center ${
                  filters.spotTypes[key as SpotTypes]
                    ? "text-white"
                    : "text-zinc-800 dark:text-zinc-500"
                }`}
              >
                <Icon width="12">{React.createElement(value.icon)}</Icon>
                <span className="text-xs mb-1">{key}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
