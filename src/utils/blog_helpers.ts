import { Post } from './types'

type Blogs = Post[]

export async function getBlogs() {
    try {
        const response = await fetch('/api/get_data')
        const data = await response.json()

        const [blogs] = await Promise.all([
            data.posts
        ])

        return blogs as Blogs

    } catch (error) {
        console.log(error)
    }
}