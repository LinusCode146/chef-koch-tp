import styles from './FilterRecipe.module.css'
import React, {MouseEventHandler} from "react";

type FilterRecipesProps = {
    changeCategory: (category: string) => MouseEventHandler<HTMLButtonElement> | undefined
}

export default function FilterRecipes ({changeCategory}: FilterRecipesProps) {
    return (
        <div className={styles.container}>
            <button onClick={changeCategory('Alle')} >Alle</button>
            <button onClick={changeCategory('Fleisch')} >Fleisch</button>
            <button onClick={changeCategory('Fisch')} >Fisch</button>
        </div>
    )
}