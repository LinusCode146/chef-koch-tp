

export type RecipeType = {
    id: string
    authorId: string
    categories: string[]
    content: string
    image: string
    inImage: string
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
            categories: string[]
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
    comments: Comment[],
}

export type Comment= {
    id: string
    authorId: string
    content: string
    createdAt: string
    updatedAt: string
    author: {
        id: string
        name: string
        email: string
        image: string
    },
    recipe: RecipeType
}