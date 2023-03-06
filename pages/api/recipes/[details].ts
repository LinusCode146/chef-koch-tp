import type { NextApiRequest, NextApiResponse} from "next";

import prisma from '../../../prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === 'GET') {

        try {
            const data = await prisma.Recipe.findUnique({
                where: {
                    id: req.query.details,
                },
                include: {
                    author: true,
                }
            })
            return res.status(200).json(data);
        } catch(err) {
            return res.status(403).json({message: "Error occurred while fetching recipes"})
        }
    }
}