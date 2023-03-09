import { motion } from "framer-motion";

import styles from './AuthRecipe.module.css';
import Link from "next/link";
import {RecipeType} from "@/types/Recipe";
import {useState} from "react";
import Toggle from "@/components/Toggle";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type RecipeProps = {
    title: string
    content: string
    image: string
    category: string
    hearts: {
        id: string
    }[]
    id: string
}


export default function AuthRecipe ({title, content, category, image, hearts, id} : Partial<RecipeType>) {
    const [toggle, setToggle] = useState(false)
    const queryClient = useQueryClient()
    let deleteToastID: string

    const { mutate } = useMutation(
        async (id: string | undefined) => axios.delete('/api/recipes/deleteRecipe', {data: id}),
        {
            onError: (error) => {
                toast.error("Error deleting the recipe", { id: deleteToastID })
            },
            onSuccess: (data) => {
                toast.success("Recipe has been deleted!", { id: deleteToastID })
                queryClient.invalidateQueries(["recipes"]).then(r => null)
            }
        }
    )


    function deleteRecipe () {
        deleteToastID = toast.loading('Deleting your recipe', { id: deleteToastID })
        mutate(id)
    }

    return (
        <>
        <motion.div layout animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} className={styles.container}>
                <Link href={`/recipe/${id}`}>
                    <img src={image} alt="Recipes image" />
                </Link>

                <h3>{title} ({hearts?.length!! < 100 ? hearts?.length : '>100'}) <span className="hover:cursor-pointer" onClick={e => setToggle(true)}>🗑️</span></h3>
        </motion.div>
            {toggle && <Toggle deleteRecipe={deleteRecipe} setToggle={setToggle} />}
        </>
    )
}