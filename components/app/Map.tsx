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
import { Location, SpotTypes } from "../../utils/types";
import React from "react";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Map({
  addresses,
  locations,
}: {
  addresses: string[];
  locations: Location[];
}) {
  const { data, error } = useSWR("/api/mapURL", fetcher);
  const { theme } = useTheme();
  const mapRef = useRef(null);
  const hasMounted = useHasMounted();
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (
      addresses.length > 0 &&
      addresses.every((a) => a.length > 0) &&
      hasMounted &&
      data
    ) {
      setShown(true);
    }
  }, [addresses, hasMounted, data]);

  useEffect(() => {
    const addrs = addresses.filter((a) => a.length > 0);
    if (
      ((locations && locations.length > 0) || addrs.length > 0) &&
      hasMounted &&
      data
    ) {
      const allLocations = locations.map((l: Location) => l.geometry.location);
      const coords = addrs.map((a) => ({
        lat: parseFloat(a.split(",")[0]),
        lng: parseFloat(a.split(",")[1]),
      }));
      allLocations.push(...coords);

      if (allLocations.length == 0) {
        return;
      }

      const latMin = Math.min(...allLocations.map((l) => l.lat));
      const latMax = Math.max(...allLocations.map((l) => l.lat));
      const lngMin = Math.min(...allLocations.map((l) => l.lng));
      const lngMax = Math.max(...allLocations.map((l) => l.lng));

      if (latMin == latMax && lngMin == lngMax && mapRef.current) {
        // @ts-ignore
        mapRef.current.map_.setCenter({ lat: latMin, lng: lngMin });
        // @ts-ignore
        mapRef.current.map_.setZoom(16);
      } else if (mapRef.current) {
        // @ts-ignore
        mapRef.current.map_.fitBounds(
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

  const map = {
    cafe: {
      icon: IoIosCafe,
      light: "#b45309",
      dark: "#92400e",
    },
    dining: {
      icon: MdRestaurant,
      light: "#000",
      dark: "#000",
    },
    park: {
      icon: MdOutlinePark,
      light: "#065f46",
      dark: "#15803d",
    },
    bar: {
      icon: BiDrink,
      light: "#4338ca",
      dark: "#312e81",
    },
    movies: {
      icon: TbMovie,
      light: "#ef4444",
      dark: "#b91c1c",
    },
    landmark: {
      icon: MdTour,
      light: "#86198f",
      dark: "#a21caf",
    },
    bowling: {
      icon: FaBowlingBall,
      light: "#15803d",
      dark: "#166534",
    },
    station: {
      icon: MdTrain,
      light: "#6366f1",
      dark: "#4338ca",
    },
  };

  return (
    <div className="w-full">
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
          }}
          defaultCenter={{
            lat: parseFloat(addresses[0].split(",")[0]),
            lng: parseFloat(addresses[0].split(",")[1]),
          }}
          defaultZoom={15}
        >
          {addresses
            .filter((a) => a.length > 0)
            .map((a, i) => {
              const lat = parseFloat(a.split(",")[0]);
              const lng = parseFloat(a.split(",")[1]);
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
                // @ts-ignore
                <div key={i} lat={loc.lat} lng={loc.lng}>
                  <FaMapMarker
                    className="w-12 h-12 text-tertiary-600 dark:text-tertiary-400"
                    style={{ transform: "translate(-50%, -100%)" }}
                  />
                  <div
                    className="absolute w-7 h-7 text-tertiary-600 dark:text-tertiary-400"
                    style={{
                      transform: "translate(-50%, -320%)",
                      color:
                        theme == "dark" ? map[l.type].dark : map[l.type].light,
                    }}
                  >
                    {React.createElement(map[l.type].icon, {
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
