"use client"

import {useMultistepForm} from "@/components/hooks/useMultistepForm";
import styles from './CreateRecipe.module.css'
import React, {useState} from "react";
import FormCategory from "@/components/CreatePage/FormCategory";
import FormTitle from "@/components/CreatePage/FormTitle";
import FormContent from "@/components/CreatePage/FormContent";

export type FormData = {
    title: string
    content: string
    image: string
    category: string
}

const INITIAL_DATA: FormData = {
    title: "",
    content: "",
    image: "",
    category: "",
}

export default function CreateRecipe() {
    const [data, setData] = useState(INITIAL_DATA);
    const [isDisabled, setIsDisabled] = useState(false)

    function updateFields(fields: Partial<FormData>) {
        setData((prev) => {
            return {...prev, ...fields}
        })
    }

    const {step, steps, currentStepIndex, isLastStep, isFirstStep, back, next} = useMultistepForm([
        <FormCategory updateFields={updateFields} />,
        <FormTitle {...data} updateFields={updateFields} />,
        <FormContent {...data} updateFields={updateFields} />
    ])

    function submitHandler(e: React.FormEvent) {
        e.preventDefault()
        if(!isLastStep) return next()

        setIsDisabled(true)
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