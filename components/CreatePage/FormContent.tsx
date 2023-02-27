import FormWrapper from "@/components/CreatePage/FormWrapper";
import styles from './FormContent.module.css'
import {FormData} from "@/app/create/page";

type FormContentProps = {
    content: string
    updateFields: (fields: Partial<FormData>) => void
}

export default function FormContent ({content, updateFields}: FormContentProps) {
    return (
        <FormWrapper title={"Please enter the instructions"}>
            <div className={styles.container}>
                <textarea value={content} onChange={e => updateFields({content: e.target.value})} cols={30} rows={10}></textarea>
            </div>
        </FormWrapper>
    )
}