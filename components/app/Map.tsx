import GoogleMapReact from "google-map-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import useHasMounted from "../../utils/useHasMounted";
import { FaMapMarkerAlt, FaMapMarker, FaBowlingBall } from "react-icons/fa";
import { TbMapSearch, TbMovie } from "react-icons/tb";
import { IoIosCafe } from "react-icons/io";
import {
  MdRestaurant,
  MdOutlinePark,
  MdAttractions,
  MdTrain,
  MdTour,
} from "react-icons/md";
import { BiDrink } from "react-icons/bi";
import { Toaster } from "react-hot-toast";
import {
  Address,
  Coord,
  Location,
  SpotTypes,
  typesMap,
} from "../../utils/types";
import React from "react";
import Button from "../base/Button";
import { FiPlus } from "react-icons/fi";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Map({
  addresses,
  locations,
  resultsRef,
  setClosed,
  openDetails,
}: {
  addresses: Address[];
  locations: Location[];
  resultsRef: React.MutableRefObject<HTMLDivElement | null>;
  setClosed: (closed: boolean) => void;
  openDetails: () => void;
}) {
  const { data, error } = useSWR("/api/mapURL", fetcher);
  const { theme } = useTheme();
  const mapRef = useRef(null);
  const hasMounted = useHasMounted();
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (
      addresses.length > 0 &&
      addresses.some((a) => a.coords != undefined) &&
      hasMounted &&
      data
    ) {
      setShown(true);
    }
  }, [addresses, hasMounted, data]);

  useEffect(() => {
    const addrs = addresses.filter((a) => !!a.coords);

    if (
      ((locations && locations.length > 0) || addrs.length > 0) &&
      hasMounted &&
      data
    ) {
      const allLocations = locations.map((l: Location) => l.geometry.location);
      const coords = addrs
        .filter((a) => a.coords)
        .map((a) => ({
          lat: (a.coords as Coord).lat,
          lng: (a.coords as Coord).lng,
        }));
      allLocations.push(...coords);

      if (allLocations.length == 0) {
        return;
      }

      const latMin = Math.min(...allLocations.map((l) => l.lat));
      const latMax = Math.max(...allLocations.map((l) => l.lat));
      const lngMin = Math.min(...allLocations.map((l) => l.lng));
      const lngMax = Math.max(...allLocations.map((l) => l.lng));

      if (addrs.length == 1 && mapRef.current) {
        // @ts-ignore
        mapRef.current.map_?.setCenter({ lat: latMin, lng: lngMin });
        // @ts-ignore
        mapRef.current.map_?.setZoom(16);
      } else if (mapRef.current) {
        // @ts-ignore
        mapRef.current.map_?.fitBounds(
          {
            north: latMax,
            south: latMin,
            east: lngMax,
            west: lngMin,
          },
          100
        );
      }
    }
  }, [locations, addresses, data, hasMounted]);

  return (
    <div className="absolute left-0 lg:left-96 right-0 top-0 bottom-0">
      <Toaster />
      {shown ? (
        <GoogleMapReact
          ref={mapRef}
          bootstrapURLKeys={{
            key: data.key,
            language: "en",
            region: "US",
          }}
          options={{
            styles:
              theme == "dark"
                ? [...darkModeStyles, ...defaultStyles]
                : defaultStyles,
            fullscreenControl: false,
            clickableIcons: false,
            zoomControl: false,
          }}
          defaultCenter={{
            lat: addresses[0].coords?.lat || 0,
            lng: addresses[0].coords?.lng || 0,
          }}
          defaultZoom={15}
        >
          {addresses
            .filter((a) => a.coords)
            .map((a, i) => {
              const lat = a.coords?.lat;
              const lng = a.coords?.lng;
              return (
                // @ts-ignore
                <div key={i} lat={lat} lng={lng}>
                  <FaMapMarkerAlt
                    className="w-12 h-12 text-primary-600 dark:text-primary-400"
                    style={{
                      transform: "translate(-50%, -100%) rotateZ(15deg)",
                    }}
                  />
                </div>
              );
            })}
          {locations &&
            locations.map((l: Location, i: number) => {
              const loc = l.geometry.location;
              return (
                <div
                  key={i}
                  // @ts-ignore
                  lat={loc.lat}
                  lng={loc.lng}
                  onClick={() => {
                    if (resultsRef.current) {
                      const div = resultsRef.current.querySelector(
                        `div#${l.place_id}`
                      );
                      div?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                      setClosed(false);
                      div?.setAttribute(
                        "style",
                        `background: ${
                          theme == "dark" ? "#E09F7D40" : "#DB926B30"
                        } `
                      );
                      setTimeout(() => {
                        div?.setAttribute("style", "");
                      }, 2000);
                    }
                  }}
                >
                  <FaMapMarker
                    className="w-12 h-12 text-tertiary-600 dark:text-tertiary-400"
                    style={{ transform: "translate(-50%, -100%)" }}
                  />
                  <div
                    className="absolute w-7 h-7 text-tertiary-600 dark:text-tertiary-400"
                    style={{
                      transform: "translate(-50%, -320%)",
                      color:
                        theme == "dark"
                          ? typesMap[l.type].dark
                          : typesMap[l.type].light,
                    }}
                  >
                    {React.createElement(typesMap[l.type].icon, {
                      className: "w-full h-full",
                    })}
                  </div>
                </div>
              );
            })}
        </GoogleMapReact>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 text-gray-400 font-medium gap-2 text-xl">
          <TbMapSearch className="w-16 h-16" />
          <span>Add an address to get started.</span>
          <Button
            onClick={openDetails}
            className="lg:hidden gap-2 mt-2"
            style="white"
            size="sm"
          >
            View Details
          </Button>
        </div>
      )}
    </div>
  );
}

const darkModeStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

const defaultStyles = [
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
