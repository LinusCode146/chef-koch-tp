"use client"

import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import { RecipeType } from "@/types/Recipe";
import RecipesGrid from "@/components/RecipesGrid";



export default function Home() {
  const { data, error, isLoading } = useQuery<RecipeType[]>({
    queryFn: allRecipes,
    queryKey: ["recipes"]
  })

  if (error) return error
  if (isLoading) return 'Loading...'


  // @ts-ignore
  return (
    <main>
      <RecipesGrid recipes={data} />
    </main>
  )
}

async function allRecipes () {
  const response = await axios.get("/api/recipes/getRecipes")
  return response.data;
}