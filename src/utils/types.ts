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

export interface User {
    email: string
    name: string
    hashedPassword: string
    image: '',
    emailVerified: Date,
    likedPosts: string[],
    dislikedPosts: string[],
}

export interface CustomModalProps {
    isOpen: boolean;
    closeModal: () => void;
    id: string;
    onDeletePost: (id: string) => void;
}

export interface SessionUser {
    email: string
    name: string
    image: string
    id: string
}

export interface LikeCounterProps {
    postId: string;
    currentUser: User;
    likes: number;
}

export interface UserAccountNavProps {
    user: {
        name?: string | null
        image?: string | null,
        email?: string | null,
        role?: string | null
    }
}

export interface UserAvatarProps {
    user: Pick<User, 'name' | 'image'>
}

export interface UserAuthFormProps
    extends React.HTMLAttributes<HTMLDivElement> { }