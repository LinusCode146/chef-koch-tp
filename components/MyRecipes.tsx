"use client"

import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {RecipeType} from "@/types/Recipe";
import RecipesGrid from "@/components/RecipesGrid";
import React, {useEffect, useMemo, useState} from "react";
import styles from './MyRecipes.module.css'
import {Select, SelectOption} from "@/components/SelectCategory";


const allCategories = ["Fisch", "Fleisch", "Vegan", "Andere", "Vegetarisch", "Dessert"]

const options = [
    {label: "Fleisch", value: ["Fleisch"]},
    {label: "Vegetarisch", value: ["Vegetarisch"]},
    {label: "Vegan", value: ["Vegan"]},
    {label: "Andere", value: ["Andere"]},
    {label: "Fisch", value: ["Fisch"]},
    {label: "Dessert", value: ["Dessert"]},
    {label: "Reis", value: ["Reis"]},
    {label: "Nudeln", value: ["Nudeln"]},
    {label: "Jamie Oliver", value: ["Jamie Oliver"]},
    {label: "Indisch", value: ["Indisch"]},
    {label: "Paul Hollywood", value: ["Paul Hollywood"]},
    {label: "Kartoffeln", value: ["Kartoffelnl"]},
]
export default function MyRecipes({userName, auth}: {userName?: string | undefined | null, auth: boolean | undefined | null}) : JSX.Element {const [tags, setTags] = useState<SelectOption[]>([])
    const [query, setQuery] = useState("")
    const [categories, setCategories] = useState<string[]>([])

    let { data, error, isLoading } = useQuery<RecipeType[]>({
        queryFn: getAuthRecipes,
        queryKey: ["recipes"]
    })

    useEffect(() => {
        if(tags.length === 0) return setCategories([])
        const rareTags: ((prevState: string[]) => string[]) | (string | number)[] = [];
        for(const tag of tags) {
            const value = tag.value[0]
            if(!rareTags.includes(value)) rareTags.push(value)
        }
        // @ts-ignore
        setCategories(rareTags)
    }, [tags])

    const filteredRecipes = useMemo(() => {
        let categoryItems;
        if(categories.length === 0) {
            categoryItems = data;
        }else {
            categoryItems = data?.filter((recipe: RecipeType) => categories.every(elem => recipe.categories.includes(elem)))
        }
        // @ts-ignore
        return categoryItems?.filter((queryRecipe: RecipeType) => {
            return queryRecipe.title.toLowerCase().includes(query.toLowerCase())
        })
    }, [query, data, categories]);


    return (
        <main>
            <div className={styles.container}>
                <Select options={options} onChange={setTags} multiple value={tags} />
            </div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} type="search" className={styles.search} placeholder={"Welcome back " + userName} />
            <RecipesGrid recipes={filteredRecipes} auth={true} />
        </main>
    )
}

async function getAuthRecipes () {
    const response = await axios.get("/api/recipes/getUsersRecipes")
    return response.data;
}
