"use client"

import { motion } from 'framer-motion'
import styles from './Comment.module.css'

type CommentProps = {
    id: string
    author: {
        image: string
        name: string
    }
    content: string
    createdAt: string
}

export default function Comment ({id, author, createdAt, content}: CommentProps) {

    return (
        <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ ease: "easeOut" }}
            className={styles.container}
            key={id}
        >
            <div className={styles.info}>
                <img src={author.image} alt="Users img" className="rounded-full" />
                <h3 className="font-bold">{author?.name}</h3>
                <h2 className="text-sm">{createdAt}</h2>
            </div>
            <div className={styles.content}>{content}</div>
        </motion.div>
    )
}