"use client"
import {ChangeEvent, FormEvent, useState} from "react";
import styles from './addComment.module.css'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";

type CommentData = {
    content: string
    recipeId: string
}

export default function AddComment ({recipeId}: {recipeId: string}) {
    const [content, setContent] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient();
    let commentToastID: string

    const { mutate } = useMutation(
        async ( data: CommentData) => axios.post('/api/recipes/addComment', data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['detail-recipe']).then(r => null)
                setContent("")
                setIsDisabled(false)
                toast.success("Added your comment", {id: commentToastID})
            },
            onError: (error) => {
                setIsDisabled(false)
                if (error instanceof AxiosError) toast.error(error?.response?.data.message, { id: commentToastID })
            }
        }
    )

    async function submitHandler(e: FormEvent) {
        e.preventDefault()
        setIsDisabled(true)
        commentToastID = toast.loading("Adding your comment", { id: commentToastID })
        mutate({content, recipeId})

    }

    return (
        <div className={styles.container}>
            <form className="my-8" onSubmit={submitHandler}>
                <h3 className="text-lg">Add a Comment</h3>
                <div className="flex flex-col my-8">
                    <textarea
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                        value={content}
                        name="title"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button
                        disabled={isDisabled}
                        className=" text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
                        type="submit"
                    >
                        Add Comment 🚀
                    </button>
                    <p
                        className={`font-bold  ${
                            content.length > 300 ? "text-red-700" : "text-gray-700"
                        } `}
                    >{`${content.length}/300`}</p>
                </div>
            </form>
        </div>
    )
}