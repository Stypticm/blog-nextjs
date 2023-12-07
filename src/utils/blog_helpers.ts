import axios from 'axios'
import { Post } from './types'

type Blogs = Post[]

export async function getBlogs() {
    try {
        const response = await axios.get('/api/get_data')
        const data = response.data

        const [blogs] = await Promise.all([data.posts])

        return blogs as Blogs

    } catch (error) {
        console.log(error)
    }
}