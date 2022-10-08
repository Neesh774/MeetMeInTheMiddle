export type Coord = {
    lat: number,
    lng: number
}

export type SpotTypes = "cafe" | "dining" | "bar" | "park" |
    "movies" | "landmark" | "bowling" | "station"

export type Filters = {
    spotTypes: {
        [key in SpotTypes]: boolean
    },
    radius: number,
}