import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { ref, maxwidth, place_id } = req.query
    const key = process.env.GOOGLE_API_KEY

    const imagesUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${ref}&key=${key}`
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&place_id=${place_id}&fields=website,url,opening_hours/periods`

    const details = {
        image: "",
        website: "",
        url: "",
        hours: []
    }
    try {
        const image = await fetch(imagesUrl)
        const detailsData = await fetch(detailsUrl)
        const detailsJson = await detailsData.json()
        details.image = image.url
        details.website = detailsJson.result.website
        details.url = detailsJson.result.url
        details.hours = detailsJson.result.opening_hours.periods
        res.status(200).json(details)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: err })
    }
}