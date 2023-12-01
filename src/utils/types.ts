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
    avatar: string
}

export type Comment = {
    _id: string
    author: string
    comment: string
}
