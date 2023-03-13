import type { NextApiRequest, NextApiResponse} from "next";

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

import prisma from '../../../prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === 'POST') {

        const session = await getServerSession(req, res, authOptions);
        if(!session) return res.status(401).json({ message: "Please sign in!" });

        //Get user
        const prismaUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email,
            },
        })

        //Add a comment
        try {
            const { content, recipeId } = req.body;

            if(!content.trim().length) return res.status(401).json({message: "Please enter something"})

            const result = await prisma.comment.create({
                data: {
                    content,
                    authorId: prismaUser?.id,
                    recipeId,
                }
            })
            res.status(200).json(result)
        } catch(err) {
            res.status(403).json({message: "Error occurred while publishing the comment"})
        }
    }
}