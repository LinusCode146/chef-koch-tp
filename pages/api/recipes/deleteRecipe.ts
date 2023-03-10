import type { NextApiRequest, NextApiResponse} from "next";

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

import prisma from '../../../prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === 'DELETE') {
        const session = await getServerSession(req, res, authOptions);

        if(!session) return res.status(401).json({ message: "Please sign in!" });

        //Delete a post
        try {
            const recipeId = req.body
            console.log(recipeId)
            const result = await prisma.recipe.delete({
                where: {
                    id: recipeId,
                }
            })
            res.status(200).json(result);
        } catch(err) {
            res.status(403).json({message: "Error occurred while deleting the recipe"})
        }
    }
}