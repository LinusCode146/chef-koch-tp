import FormWrapper from "@/components/CreatePage/FormWrapper";
import Image from "next/image";
import {FormData} from "@/app/create/page";

import styles from "./FormCategory.module.css"
import {useEffect, useState} from "react";

type FormCategoryProps = {
    updateFields: (fields: Partial<FormData>) => void
}
export default function FormCategory ({updateFields}: FormCategoryProps) {
    const [currentCats, setCurrentCats] = useState<string[]>([])

    useEffect(() => {
        updateFields({categories: currentCats})
    },[currentCats])
    return (
        <FormWrapper title={"Choose your recipe's category"}>
            <div className={styles.positioner}>
                <div className={styles.wrapper}>
                    <Image onClick={() => setCurrentCats(prev => ["Fleisch", ...prev])} src={'/foodCategories/FleischLogo.jpg'} alt={'Fleisch Logo'} width={450} height={450} />
                    <Image onClick={() => setCurrentCats(prev => ["Vegan", ...prev])} src={'/foodCategories/VeganLogo.jpg'} alt={'Vegan Logo'} width={450} height={450} />
                    <Image onClick={() => setCurrentCats(prev => ["Vegetarisch", ...prev])} src={'/foodCategories/VegetarischLogo.jpg'} alt={'Vegetarisch Logo'} width={450} height={450} />
                    <Image onClick={() => setCurrentCats(prev => ["Fisch", ...prev])} src={'/foodCategories/FischLogo.jpg'} alt={'Fisch Logo'} width={450} height={450} />
                    <Image onClick={() => setCurrentCats(prev => ["Andere", ...prev])} src={'/foodCategories/AndereLogo.jpg'} alt={'Andere Logo'} width={450} height={450} />
                    <Image onClick={() => setCurrentCats(prev => ["Dessert", ...prev])} src={'/foodCategories/DessertLogo.jpg'} alt={'Fisch Logo'} width={450} height={450} />
                </div>
            </div>
        </FormWrapper>
    )
}