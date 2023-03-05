import type { NextApiRequest, NextApiResponse} from "next";

import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

import prisma from '../../../prisma/client';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);

    if(!session) return res.status(401).json({ message: "Please sign in to make a recipe!" });
    if( req.method !== "POST") return res.status(401).json({message: "Contacted addRecipe API Route"})

    const { image, title, content, category } = req.body;
    console.log(req.body)

    const prismaUser = await prisma.user.findUnique({
        where: { email: session?.user?.email },
    });

    try {
        const result = await prisma.Recipe.create({
            data: {
                image,
                title,
                content,
                category,
                authorId: prismaUser.id,
            }
        })
        res.status(200).json(result)
    }catch (err) {
        return res.status(403).json({error: "error has occurred while publishing the recipe"})
    }
}