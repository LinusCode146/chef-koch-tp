"use client"

import {useMultistepForm} from "@/components/hooks/useMultistepForm";
import styles from './CreateRecipe.module.css'
import React from "react";


export default function CreateRecipe() {
    const {step, steps, currentStepIndex, isLastStep, isFirstStep, back, next} = useMultistepForm([
        <div>One</div>,
        <div>Two</div>,
        <div>Three</div>
    ])

    function submitHandler(e: React.FormEvent) {
        e.preventDefault()
        next()
    }

    return (
        <div className={styles.outerBox}>
            <div className={styles.container}>
                <form onSubmit={submitHandler}>
                    <div className={styles.pageCounter}>{currentStepIndex + 1} / {steps.length}</div>
                    {step}
                    <div className={styles.BTNContainer}>
                        {!isFirstStep && <button className={styles.backBTN} onClick={back} type="button">Back</button>}
                        {isFirstStep && <button className={styles.fillBTN} type="button"></button>}
                        <button className={styles.nextBTN} type="submit">{isLastStep ? "Finish" : "Next"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}