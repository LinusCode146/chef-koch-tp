"use client"

import styles from "@/components/Header.module.css";
import Link from "next/link";

export default function NavLinks () {
    return (
        <div className={styles.links}>
            <Link className={styles.pageLink} href={'/create'}>Create</Link>
            <Link className={styles.pageLink} href={'/dashboard'}>Dashboard</Link>
        </div>
    )
}