"use client"

import styles from './page.module.css'
import axios, {AxiosError} from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {RecipeType} from "@/types/Recipe";
import Image from "next/image";
import toast from "react-hot-toast";

type URL = {
    params: {
        slug: string
    }
    searchParams: string
}

type addLikeProps = {
    recipeId: string | undefined
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
    const queryClient = useQueryClient();
    let toastPostID : string

    const { mutate } = useMutation(
        async (data: addLikeProps) => axios.post('/api/recipes/addLike', data),
        {
        onError: (error) => {
            if(error instanceof AxiosError){
                toast.error(error?.response?.data.message, { id: toastPostID })
            }
        },
            onSuccess: (data) => {
            toast.success("Like has been published !", { id: toastPostID })

        }
    }
    )

    if(isLoading) return <h1>Loading ...</h1>

    function addLikeHandler() {
        toastPostID = toast.loading("Liking recipe...", { id: toastPostID })
        queryClient.invalidateQueries(["recipes"]).then(r => null)
        mutate({recipeId: data?.id})
    }


    return (
        <>
            <div className={styles.headerFiller}></div>
            <div className={styles.container}>
                <button onClick={addLikeHandler} className={styles.likeBTN}>👍</button>
                <h1 className={styles.title}>{data?.title}</h1>
                <div className={styles.card}>
                    <img src={data?.image} alt="Recipes Image" />
                    <div>{data?.content}</div>
                </div>
            </div>
        </>
    )
}