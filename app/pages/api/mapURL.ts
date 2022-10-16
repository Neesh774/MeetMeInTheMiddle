import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return res.status(200).json({ key: process.env.GOOGLE_API_KEY })
}