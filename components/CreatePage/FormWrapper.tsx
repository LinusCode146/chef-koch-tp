import React from "react";
import styles from './FormWrapper.module.css'

type FormWrapperProps = {
    title: string
    children: React.ReactNode
}

export default function FormWrapper ({title, children}: FormWrapperProps) {
    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </>
    )
}