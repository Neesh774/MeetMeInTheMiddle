import { Images, Location } from "../../utils/types";
import Image from "next/future/image";
import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import hexDataURL from "../../utils/rgbDataURL";
import { toBase64, shimmer } from "../../utils/shimmer";
import { useTheme } from "next-themes";

export default function ResultCard({ location }: { location: Location }) {
  const { theme } = useTheme();
  const [image, setImage] = useState<string>(location.icon);

  useEffect(() => {
    if (location.photos && location.photos.length > 0) {
      fetch(
        `/api/photos/${location.photos[0].photo_reference}?maxwidth=${location.photos[0].width}`
      )
        .then((res) => res.json())
        .then((res) => {
          setImage(res.image);
        })
        .catch(() => {
          setImage(location.icon);
        });
    } else {
      setImage(location.icon);
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full gap-2 bg-white dark:bg-zinc-800 rounded-lg p-2">
      <Image
        src={image}
        alt={location.name}
        width={location.photos ? location.photos[0].width : "800"}
        height={location.photos ? location.photos[0].height : "400"}
        className="object-cover max-h-48 max-w-full rounded-md"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(
            location.photos ? location.photos[0].width : "12rem",
            location.photos ? location.photos[0].height : "12rem",
            theme == "dark"
          )
        )}`}
      />
      <div className="flex flex-col gap-1">
        <div>
          {location.opening_hours && (
            <span
              className={`font-semibold text-sm ${
                location.opening_hours.open_now
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {location.opening_hours.open_now ? "Open Now" : "Closed"}
            </span>
          )}
          <div className="text-lg font-semibold">{location.name}</div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {location.vicinity}
        </div>
        <div className="flex flex-row gap-2 items-center">
          {location.price_level && (
            <>
              <div className="flex flex-row gap-0">
                {[...Array(location.price_level)].map((_, i) => {
                  return (
                    <span className="text-emerald-600" key={i}>
                      {"$"}
                    </span>
                  );
                })}
                {[...Array(5 - location.price_level)].map((_, i) => {
                  return (
                    <span className="text-gray-300 dark:text-gray-600" key={i}>
                      {"$"}
                    </span>
                  );
                })}
              </div>
              •
            </>
          )}
          <span className="flex flex-row gap-1 items-center">
            {location.rating} <BsFillStarFill className="text-amber-500" />
          </span>
          •
          <span className="text-gray-500 dark:text-gray-400">
            {location.user_ratings_total} reviews
          </span>
        </div>
      </div>
    </div>
  );
}
