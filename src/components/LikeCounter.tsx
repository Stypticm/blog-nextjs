import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { User } from '@utils/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

interface LikeCounterProps {
    postId: string ;
    currentUser: User;
    likes: number;
}

const LikeCounter = ({ postId, currentUser, likes }: LikeCounterProps) => {
    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(currentUser.likedPosts?.includes(postId) || false);
    const [isDisliked, setIsDisliked] = useState(currentUser.dislikedPosts?.includes(postId) || false);

    const likeOrDislikePost = useCallback(async (postId: string, liked: boolean) => {
        try {
            await axios.put('/api/like_dislike_posts', {
                postId,
                liked
            });
            if (liked) {
                setIsLiked(true);
                setIsDisliked(false);
                setLikeCount(likeCount + 1);
            } else {
                setIsLiked(false);
                setIsDisliked(true);
                setLikeCount(likeCount - 1);
            }
        } catch (error) {
            console.log(error);
        }
    }, [currentUser, postId, likeCount]);

    useEffect(() => {
        setIsLiked(currentUser.likedPosts?.includes(postId) || false);
        setIsDisliked(currentUser.dislikedPosts?.includes(postId) || false);
    }, [currentUser, postId]);


    return (
        <div className='flex justify-between m-6'>
            <div className='flex justify-between gap-2'>
                <button disabled={isDisliked} onClick={() => likeOrDislikePost(postId, false)}>
                    <ArrowBigDown className={isDisliked ? 'text-gray-500' : 'hover:text-red-600'} />
                </button>
                <span className='text-sm text-gray-500 font-bold flex justify-center items-center'>{likeCount}</span>
                <button disabled={isLiked} onClick={() => likeOrDislikePost(postId, true)}>
                    <ArrowBigUp className={isLiked ? 'text-gray-500' : 'hover:text-green-600'} />
                </button>
            </div>
        </div>
    );
};

export default LikeCounter;