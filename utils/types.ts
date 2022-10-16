import { BiDrink, BiLibrary } from "react-icons/bi"
import { FaBowlingBall } from "react-icons/fa"
import { IoIosCafe } from "react-icons/io"
import { MdRestaurant, MdOutlinePark, MdTour, MdTrain } from "react-icons/md"
import { TbMovie } from "react-icons/tb"
import { RiHotelBedFill } from "react-icons/ri"
import { CgGym } from "react-icons/cg"
import { HiShoppingBag } from "react-icons/hi"
import { IconType } from "react-icons"

export type Coord = {
    lat: number,
    lng: number
}

export const spots = ["cafe", "dining", "bar", "park",
    "movies", "landmark", "bowling", "station", "library", "hotel", "gym", "mall"] as const

export type SpotTypes = typeof spots[number]

export type Filters = {
    spotTypes: {
        [key in SpotTypes]: boolean
    },
    radius: number,
    time: string;
    day: number;
}

export type Geometry = {
    location: Coord;
}

export type Address = {
    formatted_address: string,
    coords?: Coord,
    place_id?: string,
}

export type Location = {
    place_id: string;
    icon: string;
    photos: Image[];
    image: string;
    rating: number;
    name: string;
    vicinity: string;
    geometry: Geometry;
    icon_background_color: string;
    user_ratings_total: number;
    price_level: number;
    opening_hours: {
        open_now: boolean;
        periods: {
            close: {
                day: number;
                time: string;
            };
            open: {
                day: number;
                time: string;
            };
        }[];
        weekday_text: string;
    }
    type: SpotTypes;
    website?: string;
    url?: string;
}

export type Image = {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}

export type Images = {
    [key: string]: string;
}

export const typesMap: { [key: string]: { icon: IconType, light: string, dark: string, type: string } } = {
    cafe: {
        icon: IoIosCafe,
        light: "#a86634",
        dark: "#92400e",
        type: "cafe"
    },
    dining: {
        icon: MdRestaurant,
        light: "#000",
        dark: "#000",
        type: "restaurant"
    },
    park: {
        icon: MdOutlinePark,
        light: "#065f46",
        dark: "#15803d",
        type: "park"
    },
    bar: {
        icon: BiDrink,
        light: "#4338ca",
        dark: "#312e81",
        type: "bar"
    },
    movies: {
        icon: TbMovie,
        light: "#ef4444",
        dark: "#b91c1c",
        type: "movie_theater"
    },
    landmark: {
        icon: MdTour,
        light: "#86198f",
        dark: "#a21caf",
        type: "tourist_attraction"
    },
    bowling: {
        icon: FaBowlingBall,
        light: "#15803d",
        dark: "#166534",
        type: "bowling_alley"
    },
    station: {
        icon: MdTrain,
        light: "#6366f1",
        dark: "#4338ca",
        type: "train_station"
    },
    library: {
        icon: BiLibrary,
        light: "#7BA8F1",
        dark: "#2D486F",
        type: "library"
    },
    hotel: {
        icon: RiHotelBedFill,
        light: "#374151",
        dark: "#1f2937",
        type: "lodging"
    },
    gym: {
        icon: CgGym,
        light: "#0B6135",
        dark: "#228753",
        type: "gym"
    },
    mall: {
        icon: HiShoppingBag,
        light: "#967823",
        dark: "#CDAB54",
        type: "shopping_mall"
    },
};