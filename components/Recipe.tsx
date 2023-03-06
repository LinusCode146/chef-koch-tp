import { motion } from "framer-motion";

import styles from './Recipe.module.css'
import Link from "next/link";

type RecipeProps = {
    title: string
    content: string
    image: string
    category: string
    likes: number
    id: string
}


export default function Recipe ({title, content, category, image, likes, id} : RecipeProps) {
    return (
        <motion.div layout animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} className={styles.container}>
            <Link href={`/recipe/${id}`}>
                <img src={image} alt="Recipes image" />
            </Link>

            <h3>{title} ({likes < 100 ? likes : '>100'})</h3>
        </motion.div>
    )
}