import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { User } from '@utils/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';

interface LikeCounterProps {
    postId: string;
    currentUser: User;
    likes: number;
}

const LikeCounter = ({ postId, currentUser, likes }: LikeCounterProps) => {
    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(currentUser.likedPosts?.includes(postId) || false);
    const [isDisliked, setIsDisliked] = useState(currentUser.dislikedPosts?.includes(postId) || false);

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
                <button disabled={isDisliked} onClick={() => likeOrDislikePost(false)} suppressHydrationWarning={true}>
                    <ArrowBigDown className={isDisliked ? 'text-gray-400' : 'hover:text-red-600 text-slate-700'} />
                </button>
                <span className='text-sm text-slate-800 font-bold flex justify-center items-center'>{likeCount}</span>
                <button disabled={isLiked} onClick={() => likeOrDislikePost(true)} suppressHydrationWarning={true}>
                    <ArrowBigUp className={isLiked ? 'text-gray-400' : 'hover:text-green-600 text-slate-700'} />
                </button>
            </div>
        </div>
    );
};

export default React.memo(LikeCounter);