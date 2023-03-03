import {FormData} from "@/app/create/page";



export default function Recipe ({title, content, category, image} : FormData) {
    return (
        <div>
            {title}
        </div>
    )
}