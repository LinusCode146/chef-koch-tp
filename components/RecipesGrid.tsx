import styles from './RecipesGrid.module.css'
import Recipe from './Recipe'
import {RecipeType} from "@/types/Recipe";
import { motion, AnimatePresence } from "framer-motion";
import AuthRecipe from "@/components/AuthRecipe";

export default function RecipesGrid ({recipes, auth}: {recipes: RecipeType[] | undefined, auth: boolean}) {

    return (
        <motion.div layout className={styles.container}>
            <AnimatePresence>
                {!auth && recipes?.map((recipe: RecipeType) => (
                    <Recipe id={recipe.id} key={recipe.id} title={recipe.title} content={recipe.content} image={recipe.image} categories={recipe.categories} hearts={recipe.hearts} />
                ))}
                {auth && recipes?.map((recipe: RecipeType) => (
                    <AuthRecipe id={recipe.id} key={recipe.id} title={recipe.title} content={recipe.content} image={recipe.image} categories={recipe.categories} hearts={recipe.hearts} />
                ))}
            </AnimatePresence>
        </motion.div>
    )
}