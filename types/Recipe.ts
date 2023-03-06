

export type RecipeType = {
    id: string
    authorId: string
    category: string
    content: string
    image: string
    title: string
    createdAt: string
    updatedAt: string
    author: {
        id: string
        name: string
        email: string
        image: string
    }
    hearts: {
        id: string
        recipeId: string
        authorId: string
        recipe: {
            id: string
            authorId: string
            category: string
            content: string
            image: string
            title: string
            createdAt: string
            updatedAt: string
            author: {
                id: string
                name: string
                email: string
                image: string
            }
        }
        author: {
            id: string
            name: string
            email: string
            image: string
        }
    }[]
}