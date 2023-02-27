"use client"

import {signIn} from "next-auth/react";
import styles from './LoginBTN.module.css'

export default function LoginBTN () {
    return (
        <button onClick={() => signIn()} className={styles.btn}>Sign In</button>
    )
}