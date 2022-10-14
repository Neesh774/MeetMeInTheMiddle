export type Coord = {
    lat: number,
    lng: number
}

export const spots = ["cafe", "dining", "bar", "park",
    "movies", "landmark", "bowling", "station"] as const

export type SpotTypes = typeof spots[number]

export type Filters = {
    spotTypes: {
        [key in SpotTypes]: boolean
    },
    radius: number,
    time?: string;
    day?: number;
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
        weekday_text: string[];
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