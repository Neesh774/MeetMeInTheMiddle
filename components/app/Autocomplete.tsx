import Input from "../base/Input";
import { useState } from "react";
import useSWR from "swr";
import AsyncSelect from "react-select/async";
import { useTheme } from "next-themes";
import useHasMounted from "../../utils/useHasMounted";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const getAutocomplete = async (input: string) => {
  const url = "/api/autocomplete/" + input;
  const res = await fetcher(url);
  const predictions = res.predictions;
  return predictions.map((p: any) => ({
    value: p.place_id,
    label: p.description,
  }));
};

export default function Autocomplete({
  value,
  setValue,
  placeholder,
  clearLocations,
}: {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  clearLocations: () => void;
}) {
  const { theme } = useTheme();
  const hasMounted = useHasMounted();

  return (
    <>
      {hasMounted && theme && (
        <AsyncSelect
          menuPlacement="auto"
          styles={{
            container: (provided, state) => ({
              ...provided,
              width: "100%",
            }),
            menu: (provided, state) => ({
              ...provided,
              backgroundColor: theme == "dark" ? "#2B2B2B" : "#F4F4F4",
              width: "150%",
              minWidth: "100%",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor:
                theme == "dark"
                  ? state.isFocused || state.isSelected
                    ? "#E09F7D"
                    : "#2B2B2B"
                  : state.isFocused || state.isSelected
                  ? "#FFC2A2"
                  : "#F0F0F0",
              color: theme == "dark" ? "#F4F4F4" : "#2B2B2B",
              ":active": {
                ...provided[":active"],
                backgroundColor:
                  theme == "dark"
                    ? state.isFocused || state.isSelected
                      ? "#E09F7D"
                      : "#2B2B2B"
                    : state.isFocused || state.isSelected
                    ? "#FFC2A2"
                    : "#F0F0F0",
              },
            }),
            input: (provided, state) => ({
              ...provided,
              color: theme == "dark" ? "#bfbfbf" : "#2B2B2B",
              cursor: "text",
            }),
            singleValue: (provided, state) => ({
              ...provided,
              color: theme == "dark" ? "#bfbfbf" : "#2B2B2B",
            }),
            control: (provided, state) => ({
              ...provided,
              backgroundColor: theme == "dark" ? "#2B2B2B" : "#F4F4F4",
              borderColor: theme == "dark" ? "#494949" : "#DBDBDB",
              borderWidth: "2px",
            }),
            dropdownIndicator: (provided, state) => ({
              display: "none",
            }),
            indicatorSeparator: (provided, state) => ({
              display: "none",
            }),
          }}
          cacheOptions
          loadOptions={getAutocomplete}
          placeholder={placeholder}
          onChange={(e: any) => {
            setValue(e.value);
            clearLocations();
          }}
        />
      )}
    </>
  );
}
