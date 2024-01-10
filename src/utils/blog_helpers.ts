import { Post } from './types'

type Blogs = Post[]

export async function getBlogs() {
    try {
        const response = await fetch('/api/get_data', {
            next: { revalidate: 10 },
        })
        const data = await response.json()

        const [blogs] = await Promise.all([data.posts])

        return blogs as Blogs

    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch blogs')
    }
}

export async function getFilteredBlogs(title: string, blogs: Post[]) {
    try {
        return blogs.filter((blog: Post) => blog.title.toLowerCase().includes(title.toLowerCase()))

    } catch (error) {
        console.log(error)
        throw new Error('Failed to filter blogs')
    }
}