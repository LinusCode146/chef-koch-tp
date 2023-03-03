import styles from './RecipesGrid.module.css'
import Recipe from './Recipe'
import {RecipeType} from "@/types/Recipe";

export default function RecipesGrid ({recipes}: {recipes: RecipeType[] | undefined}) {

    return (
        <div className={styles.container}>
                {recipes?.map((recipe: RecipeType) => (
                    <Recipe key={recipe.id} title={recipe.title} content={recipe.content} image={recipe.image} category={recipe.category} />
                ))}
        </div>
    )
}