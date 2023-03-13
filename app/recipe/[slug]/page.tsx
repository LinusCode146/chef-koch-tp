"use client"

import styles from './page.module.css'
import axios, {AxiosError} from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {RecipeType} from "@/types/Recipe";
import toast from "react-hot-toast";
import AddComment from "@/components/AddComment";
import useCopyToClipboard from "@/components/hooks/useCopyToClipboard";
import Comment from "@/components/Comment";
import {useContext, useMemo, useRef} from "react";
import {isNewLine} from "acorn";
import {UserAccessContext} from "@/components/CreatePage/contexts/UserAccessContext";
import AccessForm from "@/components/AccessForm";


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
    const {access, setAccess} = useContext(UserAccessContext);
    const [value, copy] = useCopyToClipboard()
    const { data, isLoading } = useQuery<RecipeType>({
        queryFn: () => fetchDetails(url.params.slug),
        queryKey: ["detail-recipe"],
    })
    console.log(data)
    const queryClient = useQueryClient();
    let toastPostID : string

    const { mutate } = useMutation(
        async (data: addLikeProps) => axios.post('/api/recipes/addLike', data),
        {
        onError: (error) => {
            if(error instanceof AxiosError){
                toast.error(error?.response?.data.message, { id: toastPostID })
            }
        }, onSuccess: (data) => {
            queryClient.invalidateQueries(["detail-recipe"]).then(r => null)
            toast.success("Like has been published !", { id: toastPostID })
        }
    }
    )

    if(isLoading) return <h1>Loading ...</h1>

    function addLikeHandler() {
        toastPostID = toast.loading("Liking recipe...", { id: toastPostID })
        mutate({recipeId: data?.id})
    }

    return (
        <>
            {!access && <AccessForm />}
            {access &&
                <div className={styles.container}>
                    <div className={styles.info}>
                        <h1>{data?.title}     ❤️{data?.hearts.length}</h1>
                        <button onClick={addLikeHandler}>👍</button>
                    </div>
                    <div className={styles.instructions}>
                        <div className='flex flex-col gap-10 items-center'>
                            <img src={data?.image} alt="Recipes image" className={styles.recipeImg} />
                            <div className='flex relative'>
                                <div className={styles.recipeContent}>{data?.content}
                                    <img onClick={() => copy(data?.content || "")} src={'/copy.png'} alt="copy" className={styles.copyIcon} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.insImage}><img src={data?.inImage} alt="instruction image"/></div>
                    </div>
                    <div className={styles.commentSection}>
                        <AddComment recipeId={data?.id || ""} />
                        {data?.comments.map((comment) => (
                            <Comment key={comment.id} id={comment.id} content={comment.content} author={comment.author} createdAt={comment.createdAt} />
                        ))}
                    </div>
                </div>
            }

        </>
    )
}