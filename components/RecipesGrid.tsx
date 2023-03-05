import styles from './RecipesGrid.module.css'
import Recipe from './Recipe'
import {RecipeType} from "@/types/Recipe";
import { motion, AnimatePresence } from "framer-motion";

export default function RecipesGrid ({recipes}: {recipes: RecipeType[] | undefined}) {

    return (
        <motion.div layout className={styles.container}>
            <AnimatePresence>
                {recipes?.map((recipe: RecipeType) => (
                    <Recipe key={recipe.id} title={recipe.title} content={recipe.content} image={recipe.image} category={recipe.category} likes={recipe.likes} />
                ))}
            </AnimatePresence>
        </motion.div>
    )
}