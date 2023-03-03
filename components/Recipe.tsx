import {FormData} from "@/app/create/page";

import styles from './Recipe.module.css'

export default function Recipe ({title, content, category, image} : FormData) {
    return (
        <div className={styles.container}>
        <img src={image} alt="Recipes image" />

            <h3>{title}</h3>
        </div>
    )
}