import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { ref, maxwidth } = req.query
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${ref}&key=${process.env.GOOGLE_API_KEY}`

    await fetch(url)
        .then((response) => {
            res.status(200).json({ image: response.url })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
}