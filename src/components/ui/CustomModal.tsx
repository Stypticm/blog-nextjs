import { FC, useCallback } from 'react';
import { Button } from './Button';
import axios from 'axios';
import { toast } from '@hooks/use-toast'
import { CustomModalProps } from '@utils/types';

const CustomModal: FC<CustomModalProps> = ({ isOpen, closeModal, onDeletePost, id }) => {

    const handleDelete = async (id: string) => {

        try {
            await axios.delete(`/api/delete_post`, {
                data: {
                    id
                }
            })
        } catch (error) {
            toast({
                title: 'Post deletion failed',
                description: 'Please try again later',
                variant: 'destructive',
            })
        }
        onDeletePost(id)
        closeModal()
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black opacity-90" onClick={closeModal}></div>
            )}
            {isOpen && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md z-50">
                    <p className="text-lg font-bold mb-4 text-slate-700">Do you really want to delete this post {id} ?</p>
                    <div className="flex justify-center mt-4">
                        <Button className='text-slate-700 text-lg' onClick={() => handleDelete(id)}>Confirm</Button>
                        <Button className='text-slate-700 text-lg' onClick={closeModal}>Cancel</Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomModal