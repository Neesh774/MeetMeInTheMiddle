import type { NextApiRequest, NextApiResponse } from 'next'
import { Address, Coord, Filters, SpotTypes, typesMap } from '../../utils/types';
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
        const query = `${url}?location=${location}&language=${language}&radius=${radius}&key=${key}&type=${typesMap[type].type}`
        await fetch(query)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                const locs = data.results.map((r: Location) => ({ ...r, type: type as SpotTypes }))
                results.push(...locs)
            })
    }))

    await Promise.all(results.map((loc) => new Promise(async (resolve, reject) => {
        try {
            const id = loc.place_id;
            if (loc.photos && loc.photos.length > 0) {
                const maxwidth = loc.photos[0].width;
                const ref = loc.photos[0].photo_reference;
                const imagesUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${ref}&key=${key}`
                await fetch(imagesUrl).then((response) => {
                    loc.image = response.url;
                }).catch((err) => console.log(err))
            }
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&place_id=${id}&fields=website,url,opening_hours`
            const detailsData = await fetch(detailsUrl)
            const detailsJson = await detailsData.json()
            loc.website = detailsJson.result.website
            loc.url = detailsJson.result.url
            if (filters.day && loc.opening_hours) {
                loc.opening_hours.periods = detailsJson.result.opening_hours.periods;
                loc.opening_hours.open_now = detailsJson.result.opening_hours.open_now;
                loc.opening_hours.weekday_text = loc.opening_hours.weekday_text ? loc.opening_hours.weekday_text[filters.day].split(": ")[1] : loc.opening_hours.open_now ? "Open now" : "Closed";
            }
            else if (loc.opening_hours) {
                loc.opening_hours.open_now = detailsJson.result.opening_hours.open_now;
            }
            resolve(loc)
        }
        catch (err) {
            console.error(err)
            reject(err)
        }
    })))

    if (filters.day != undefined && filters.time != undefined) {
        res.status(200).json(results.filter((loc) => {
            if (loc.opening_hours) {
                const day = filters.day as number;
                const time = filters.time as string;
                const periods = loc.opening_hours.periods;
                const open = periods.filter((period) => period.open.day == day);
                const openNow = open.some((period) => {
                    return period.open?.time <= time && period.close?.time >= time
                })
                return openNow;
            }
        }))
    }
    else { res.status(200).json(results); }
}