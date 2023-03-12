"use client"

import {useMultistepForm} from "@/components/hooks/useMultistepForm";
import styles from './CreateRecipe.module.css'
import React, {useState} from "react";
import FormCategory from "@/components/CreatePage/FormCategory";
import FormTitle from "@/components/CreatePage/FormTitle";
import FormContent from "@/components/CreatePage/FormContent";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios, {AxiosError} from "axios";


export type FormData = {
    title: string
    content: string
    image: string
    categories: string[]
    inImage: string
}

const INITIAL_DATA: FormData = {
    title: "",
    content: "",
    image: "",
    categories: [],
    inImage: "",
}

export default function CreateRecipe() {
    const [data, setData] = useState(INITIAL_DATA);
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let toastPostID : string

    const { mutate } = useMutation(
        async (data: FormData) => await axios.post("/api/recipes/addRecipe", data),
        {
            onError: (error) => {
                if(error instanceof AxiosError){
                    toast.error(error?.response?.data.message, { id: toastPostID })
                }
            },
            onSuccess: (data) => {
                toast.success("Post has been made !", { id: toastPostID })

            }
        }
    )

    function updateFields(fields: Partial<FormData>) {
        setData((prev) => {
            return {...prev, ...fields}
        })
    }

    const {step, steps, currentStepIndex, isLastStep, isFirstStep, back, next, goTo} = useMultistepForm([
        <FormTitle {...data} updateFields={updateFields} />,
        <FormCategory updateFields={updateFields} />,
        <FormContent {...data} updateFields={updateFields} />
    ])

    function submitHandler(e: React.FormEvent) {
        e.preventDefault()
        if(!isLastStep) return next()

        toastPostID = toast.loading("Creating your post", { id: toastPostID })
        queryClient.invalidateQueries(["recipes"]).then(r => null)
        setIsDisabled(true);
        mutate(data);
    }

    return (
        <div className={styles.outerBox}>
            <div className={styles.container}>
                <form onSubmit={submitHandler}>
                    <div className={styles.pageCounter}>{currentStepIndex + 1} / {steps.length}</div>
                    {step}
                    <div className={styles.BTNContainer}>
                        {!isFirstStep && <button disabled={isDisabled} className={styles.backBTN} onClick={back} type="button">Back</button>}
                        {isFirstStep && <button className={styles.fillBTN} type="button"></button>}
                        <button disabled={isDisabled} className={styles.nextBTN} type="submit">{isLastStep ? "Finish" : "Next"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}