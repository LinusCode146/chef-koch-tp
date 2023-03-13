import type { NextApiRequest, NextApiResponse} from "next";

import prisma from '../../../prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== 'GET') {
        return res.status(401).json({error: "contacted wrong api route"})
    }

    try{
        const data = await prisma.UserAccessPassword.findMany();
        console.log(data)
        res.status(200).json(data)
    } catch (err) {
        res.status(403).json({error: "Error fetching posts"})
    }
}