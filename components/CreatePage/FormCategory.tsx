import FormWrapper from "@/components/CreatePage/FormWrapper";
import Image from "next/image";
import {FormData} from "@/app/create/page";

import styles from "./FormCategory.module.css"

type FormCategoryProps = {
    updateFields: (fields: Partial<FormData>) => void
}
export default function FormCategory ({updateFields}: FormCategoryProps) {
    return (
        <FormWrapper title={"Choose your recipe's category"}>
            <div className={styles.positioner}>
                <div className={styles.wrapper}>
                    <Image onClick={() => updateFields({category: "Fleisch"})} src={'/foodCategories/FleischLogo.jpg'} alt={'Fleisch Logo'} width={450} height={450} />
                    <Image onClick={() => updateFields({category: "Fleisch"})} src={'/foodCategories/VeganLogo.jpg'} alt={'Vegan Logo'} width={450} height={450} />
                    <Image onClick={() => updateFields({category: "Fleisch"})} src={'/foodCategories/VegetarischLogo.jpg'} alt={'Vegetarisch Logo'} width={450} height={450} />
                    <Image onClick={() => updateFields({category: "Fleisch"})} src={'/foodCategories/FischLogo.jpg'} alt={'Fisch Logo'} width={450} height={450} />
                    <Image onClick={() => updateFields({category: "Fleisch"})} src={'/foodCategories/AndereLogo.jpg'} alt={'Fisch Logo'} width={450} height={450} />
                    <Image onClick={() => updateFields({category: "Fleisch"})} src={'/foodCategories/DessertLogo.jpg'} alt={'Fisch Logo'} width={450} height={450} />
                </div>
            </div>
        </FormWrapper>
    )
}