interface IBlog {
    title: string
    description: string
    image: string
    comments: Comments,
    likes: number
    author: string
}

type Comments = [
    {
        author: string
        comment: string
    }
]

type Blogs = IBlog[]

export async function getBlogs() {
    try {
        const response = await fetch('/api/get_data')
        const data = await response.json()

        const [blogs] = await Promise.all([
            data.posts
        ])

        return blogs

    } catch (error) {
        console.log(error)
    }
}