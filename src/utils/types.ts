export interface Post {
    _id: string
    title: string
    description: string
    image: string
    author: string
    createdAt: Date
    likes: number
    comments: Comment[]
    email: string
}

export type Comment = {
    author: string
    comment: string
}
