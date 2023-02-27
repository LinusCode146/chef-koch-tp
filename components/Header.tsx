import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default function Header () {
    const session = getServerSession(authOptions);

    return (
        <div>Header</div>
    )
}