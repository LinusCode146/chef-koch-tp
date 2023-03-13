import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import React, {useContext, useEffect, useRef, useState} from "react";

import styles from './AccessForm.module.css'
import {UserAccessContext} from "@/components/CreatePage/contexts/UserAccessContext";
import * as trace_events from "trace_events";
import { motion } from "framer-motion";
export default function AccessForm () {
    const [password, setPassword] = useState('')
    const [userPassword, setUserPassword] = useState<string>("")
    const {access, setAccess} = useContext(UserAccessContext)
    const { error, data, isLoading } = useQuery({
        queryFn: getAccessPassword,
        queryKey: ['password']
    })

    useEffect(() => {
        if(data) setPassword(data[0].password)
    }, [data])

    function submitHandler (e: React.FormEvent) {
        e.preventDefault()
        if(!data) return;
        if(userPassword.trim() == password) setAccess(true)
    }

    if (error) return <div>error</div>;
    if(isLoading) return <h1>Loading ...</h1>

    return (
        <form onSubmit={submitHandler} className={styles.container}>
            <input onChange={(e) => setUserPassword(e.target.value)} type="password" placeholder={"Please enter the password to enter"} required className={styles.inputField}/>
            <motion.button initial={{opacity: 1}} animate={{opacity: 1}} className={styles.buttonContainer}>
                Submit
            </motion.button>
        </form>
    )
}

async function getAccessPassword() {
    const response  = await axios.get('/api/recipes/getUserAccessPassword')
    return response.data;
}