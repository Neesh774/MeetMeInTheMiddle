import GoogleMapReact from "google-map-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import useHasMounted from "../../utils/useHasMounted";
import { FaMapMarkerAlt, FaMapMarker } from "react-icons/fa";
import { TbMapSearch } from "react-icons/tb";
import { IoIosCafe } from "react-icons/io";
import { MdRestaurant, MdOutlinePark } from "react-icons/md";
import { BiDrink } from "react-icons/bi";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Map({
  addresses,
  locations,
}: {
  addresses: string[];
  locations: any;
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
    if (locations && Object.keys(locations).length > 0 && hasMounted && data) {
      const allLocations = Object.values(locations)
        .reduce((acc: any[], val) => acc.concat(val), [])
        .map((l: any) => l.geometry.location);

      const latCenter =
        allLocations.reduce((acc, val) => acc + val.lat, 0) /
        allLocations.length;
      const lngCenter =
        allLocations.reduce((acc, val) => acc + val.lng, 0) /
        allLocations.length;

      if (mapRef.current) {
        // @ts-ignore
        mapRef.current.map_.panTo({ lat: latCenter, lng: lngCenter });
      }
    }
  }, [locations, data, hasMounted]);

  useEffect(() => {
    const addrs = addresses.filter((a) => a.length > 0);
    if (addrs.length > 0 && hasMounted && data) {
      const coords = addrs.map((a) => ({
        lat: parseFloat(a.split(",")[0]),
        lng: parseFloat(a.split(",")[1]),
      }));

      const latMin = coords.reduce(
        (acc, val) => Math.min(acc, val.lat),
        coords[0].lat
      );
      const latMax = coords.reduce(
        (acc, val) => Math.max(acc, val.lat),
        coords[0].lat
      );
      const lngMin = coords.reduce(
        (acc, val) => Math.min(acc, val.lng),
        coords[0].lng
      );
      const lngMax = coords.reduce(
        (acc, val) => Math.max(acc, val.lng),
        coords[0].lng
      );

      if (mapRef.current) {
        // @ts-ignore
        mapRef.current.map_.panToBounds(
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
  }, [addresses, data, hasMounted]);

  return (
    <div className="w-full">
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
                    style={{ transform: "translate(-50%, -100%)" }}
                  />
                </div>
              );
            })}
          {locations &&
            Object.keys(locations).map((type: string, i: number) => {
              return locations[type].map((l: any, i: number) => {
                const loc = l.geometry.location;
                return (
                  // @ts-ignore
                  <div key={i} lat={loc.lat} lng={loc.lng}>
                    <FaMapMarker
                      className="w-12 h-12 text-tertiary-600 dark:text-tertiary-400"
                      style={{ transform: "translate(-50%, -100%)" }}
                    />
                    {type == "cafe" && (
                      <IoIosCafe
                        className="w-6 h-6 text-amber-700 dark:text-amber-800"
                        style={{ transform: "translate(-50%, -360%)" }}
                      />
                    )}
                    {type == "dining" && (
                      <MdRestaurant
                        className="w-6 h-6 text-black dark:text-black"
                        style={{ transform: "translate(-50%, -360%)" }}
                      />
                    )}
                    {type == "park" && (
                      <MdOutlinePark
                        className="w-6 h-6 text-emerald-800 dark:text-emerald-700"
                        style={{ transform: "translate(-50%, -360%)" }}
                      />
                    )}
                    {type == "bar" && (
                      <BiDrink
                        className="w-6 h-6 text-indigo-700 dark:text-indigo-900"
                        style={{ transform: "translate(-50%, -360%)" }}
                      />
                    )}
                  </div>
                );
              });
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
