export interface Post {
    _id: string
    title: string
    description: string
    image: string
    author: string
    createdAt: Date
    likes: number
    comments: Comments
    email: string
}

type Comments = [
    {
        author: string
        comment: string
    }
]