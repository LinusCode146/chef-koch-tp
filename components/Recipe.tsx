import { motion } from "framer-motion";

import styles from './Recipe.module.css'
import Link from "next/link";
import {RecipeType} from "@/types/Recipe";

type RecipeProps = {
    title: string
    content: string
    image: string
    categories: string[]
    hearts: {
        id: string
    }[]
    id: string
}


export default function Recipe ({title, content, categories, image, hearts, id} : Partial<RecipeType>) {
    return (
        <motion.div layout animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} className={styles.container}>
            <Link href={`/recipe/${id}`}>
                <img src={image} alt="Recipes image" />
            </Link>

            <h3>{title} ({hearts?.length!! < 100 ? hearts?.length : '>100'})</h3>
        </motion.div>
    )
}