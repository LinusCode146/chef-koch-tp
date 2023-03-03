

export type RecipeType = {
    id: string
    authorId: string
    category: string
    content: string
    image: string
    title: string
    createdAt: string
    updatedAt: string
    likes: number
    dislikes: number
    author: {
        id: string
        name: string
        email: string
        image: string
    }
}