import { motion } from "framer-motion";

import styles from './Recipe.module.css'

type RecipeProps = {
    title: string
    content: string
    image: string
    category: string
    likes: number
}


export default function Recipe ({title, content, category, image, likes} : RecipeProps) {
    return (
        <motion.div layout animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} className={styles.container}>
        <img src={image} alt="Recipes image" />

            <h3>{title} ({likes < 100 ? likes : '>100'})</h3>
        </motion.div>
    )
}