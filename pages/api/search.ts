import type { NextApiRequest, NextApiResponse } from 'next'
import { Address, Coord, Filters, SpotTypes } from '../../utils/types';
import { Location } from '../../utils/types';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { addresses, filters }: { addresses: Address[], filters: Filters } = req.body;
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    const key = process.env.GOOGLE_API_KEY;
    const coords = addresses.map((addr: Address) => addr.coords as Coord);
    const coordsAverage = coords.reduce((acc: Coord, curr: Coord) => {
        acc.lat += curr.lat;
        acc.lng += curr.lng;
        return acc;
    }, { lat: 0, lng: 0 });
    coordsAverage.lat /= coords.length;
    coordsAverage.lng /= coords.length;

    const spotTypes = Object.entries(filters.spotTypes).filter((type) => type[1]).map((type) => type[0]);
    const language = "en"
    const location = `${coordsAverage.lat}%2C${coordsAverage.lng}`
    const radius = (Math.min(...coords.map((coord: Coord) => {
        return Math.sqrt(Math.pow(coord.lat - coordsAverage.lat, 2) + Math.pow(coord.lng - coordsAverage.lng, 2))
    })) * (filters.radius) * 12000).toFixed(0)

    const results: Location[] = [];
    await Promise.all(spotTypes.map(async (type) => {
        const map = {
            "park": "park",
            "cafe": "cafe",
            "dining": "restaurant",
            "bar": "bar",
            "movies": "movie_theater",
            "landmark": "tourist_attraction",
            "bowling": "bowling_alley",
            "station": "train_station"
        }
        const query = `${url}?location=${location}&language=${language}&radius=${radius}&key=${key}&type=${map[type as "park" | "cafe" | "dining" | "bar"]}`
        await fetch(query)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                const locs = data.results.map((r: Location) => ({ ...r, type: type as SpotTypes }))
                results.push(...locs)
            })
    }))
    res.status(200).json(results);
}