import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { User } from '@utils/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import useHasMounted from '@hooks/use-has-mounted';

interface LikeCounterProps {
    postId: string;
    currentUser: User;
    likes: number;
}

const LikeCounter = ({ postId, currentUser, likes }: LikeCounterProps) => {
    const hasMounted = useHasMounted()

    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(currentUser.likedPosts?.includes(postId) || false);
    const [isDisliked, setIsDisliked] = useState(currentUser.dislikedPosts?.includes(postId) || false);

    if (!hasMounted) {
        return null
    }

    const likeOrDislikePost = useCallback(async (liked: boolean) => {
        try {
            await axios.put('/api/like_dislike_posts', {
                blog_id: postId,
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
    }, [currentUser, postId, likeCount, postId]);

    useEffect(() => {
        setIsLiked(currentUser.likedPosts?.includes(postId) || false);
        setIsDisliked(currentUser.dislikedPosts?.includes(postId) || false);
    }, [currentUser, postId]);


    return (
        <div className='flex justify-between m-6'>
            <div className='flex justify-between gap-2'>
                <button aria-label='Dislike' disabled={isDisliked} onClick={() => likeOrDislikePost(false)}>
                    <ArrowBigDown className={isDisliked ? 'text-gray-400' : 'hover:text-red-600 text-slate-700'} />
                </button>
                <span className='text-sm text-slate-800 font-bold flex justify-center items-center'>{likeCount}</span>
                <button aria-label='Like' disabled={isLiked} onClick={() => likeOrDislikePost(true)}>
                    <ArrowBigUp className={isLiked ? 'text-gray-400' : 'hover:text-green-600 text-slate-700'} />
                </button>
            </div>
        </div>
    );
};

export default React.memo(LikeCounter);