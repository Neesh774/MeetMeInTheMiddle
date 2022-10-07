import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (!id) {
        res.status(400).json({ error: 'Missing place ID' });
        return;
    }
    const url = "https://maps.googleapis.com/maps/api/geocode/json";
    const key = process.env.GOOGLE_API_KEY;
    const query = `${url}?place_id=${id}&key=${key}`;
    await fetch(query)
        .then((response) => response.json())
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
}

export const config = {
    api: {
        externalResolver: true,
    },
}