"use client"

import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import { RecipeType } from "@/types/Recipe";
import RecipesGrid from "@/components/RecipesGrid";
import React, { useState } from "react";
import styles from './page.module.css'


export default function Home() {
  const [categories, setCategories] = useState<string[]>(["Fisch", "Fleisch", "Vegan", "Andere", "Vegetarisch", "Dessert"])



  let { data, error, isLoading } = useQuery<RecipeType[]>({
    queryFn: allRecipes,
    queryKey: ["recipes"]
  })

  if (error) return error
  if (isLoading) return 'Loading...'

  let currentRecipes = data?.filter((recipe: RecipeType) => categories.includes(recipe.category));

  return (
    <main>
      <div className={styles.container}>
        <button onClick={() => setCategories(["Fisch", "Fleisch", "Vegan", "Andere", "Vegetarisch", "Dessert"])}>Alle</button>
        <button onClick={() => setCategories(['Fleisch'])}>Fleisch</button>
        <button onClick={() => setCategories(['Fisch'])}>Fisch</button>
        <button onClick={() => setCategories(['Vegan'])}>Vegan</button>
        <button onClick={() => setCategories(['Vegetarisch'])}>Vegetarisch</button>
        <button onClick={() => setCategories(['Andere'])}>Andere</button>
        <button onClick={() => setCategories(['Dessert'])}>Dessert</button>
      </div>
      <RecipesGrid recipes={currentRecipes} />
    </main>
  )
}

async function allRecipes () {
  const response = await axios.get("/api/recipes/getRecipes")
  return response.data;
}
