
import styles from './FormTitle.module.css'
import FormWrapper from "@/components/CreatePage/FormWrapper";
import {FormData} from "@/app/create/page";

type FormTitleProps = {
    title: string
    image: string
    updateFields: (fields: Partial<FormData>) => void
}
export default function FormTitle ({title, image, updateFields}: FormTitleProps) {
    return (
        <FormWrapper title={"Title and Image Form"}>
            <div className={styles.container}>
                <input required value={title} onChange={e => updateFields({title: e.target.value})} type="text" placeholder={"Please enter your recipe's name"} />
                <input required onChange={e => updateFields({image: e.target.value})} value={image} type="url" placeholder={"Please enter your recipe's image url"} />
            </div>
        </FormWrapper>
    )
}