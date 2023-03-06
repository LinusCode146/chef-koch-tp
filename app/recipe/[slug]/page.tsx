"use client"

import styles from './page.module.css'
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {RecipeType} from "@/types/Recipe";
import Image from "next/image";

type URL = {
    params: {
        slug: string
    }
    searchParams: string
}

//Fetch all the post details
const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/recipes/${slug}`)
    return response.data;
}
export default function RecipeDetail(url: URL) {
    const { data, isLoading } = useQuery<RecipeType>({
        queryFn: () => fetchDetails(url.params.slug),
        queryKey: ['detail-recipe'],
    })

    if(isLoading) return <h1>Loading ...</h1>
    console.log(data)


    return (
        <>
            <div className={styles.headerFiller}></div>
            <div className={styles.container}>
                <h1 className={styles.title}>{data?.title}</h1>
                <div className={styles.card}>
                    <img src={data?.image} alt="Recipes Image" />
                    <div>{data?.content}</div>
                </div>
            </div>
        </>
    )
}