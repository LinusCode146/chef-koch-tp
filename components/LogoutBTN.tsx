"use client"

import {signOut} from "next-auth/react";
import styles from './LoginBTN.module.css'
import Image from "next/image";

export default function LoginBTN ({image}: {image: string}) {


    return (
        <div className="flex justify-between items-center">
            <button onClick={() => signOut()} className={styles.btn}>Sign Out</button>
            <Image src={image} width={50} height={50} alt="avatar" priority className='rounded-full mx-5'/>
        </div>
    )
}