import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { input } = req.query;
    if (!input) {
        res.status(400).json({ error: 'Missing input' });
        return;
    }
    const url = "https://maps.googleapis.com/maps/api/place/queryautocomplete/json";
    const key = process.env.GOOGLE_API_KEY;
    const query = `${url}?input=${input}&key=${key}`;
    fetch(query)
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