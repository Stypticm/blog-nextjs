import { getBlogs } from '@utils/blog_helpers';
import { Post } from '@utils/types';

export const fetchSelectedPostBySlug = async (slug: string, setSelectedPost: Function) => {
    try {
        const blogs = await getBlogs() as Post[];
        const selected = blogs.find((blog: Post) => blog._id === slug);
        setSelectedPost(selected as Post);
    } catch (error) {
        console.error(error);
    }
};