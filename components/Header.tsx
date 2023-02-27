
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth].js';

import styles from './Header.module.css';
import Link from "next/link";
import LoginBTN from "@/components/LoginBTN";
import NavLinks from "@/components/NavLinks";
import LogoutBTN from "./LogoutBTN";

export default async function Header (): Promise<JSX.Element> {
    const session = await getServerSession(authOptions);

    return (
        <main className={styles.container}>
            <div className={styles.logo}>
                <Link href={'/'}>ChefKoch</Link>
            </div>
            <NavLinks />
            <div className={styles.authLinks}>
                {!session?.user && <LoginBTN />}
                {session?.user && <LogoutBTN image={session.user?.image || ""}/>}
            </div>
        </main>
    )
}