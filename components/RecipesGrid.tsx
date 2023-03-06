import styles from './RecipesGrid.module.css'
import Recipe from './Recipe'
import {RecipeType} from "@/types/Recipe";
import { motion, AnimatePresence } from "framer-motion";

export default function RecipesGrid ({recipes}: {recipes: RecipeType[] | undefined}) {

    return (
        <motion.div layout className={styles.container}>
            <AnimatePresence>
                {recipes?.map((recipe: RecipeType) => (
                    <Recipe id={recipe.id} key={recipe.id} title={recipe.title} content={recipe.content} image={recipe.image} category={recipe.category} hearts={recipe.hearts} />
                ))}
            </AnimatePresence>
        </motion.div>
    )
}