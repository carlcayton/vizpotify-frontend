import React from 'react';
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserProfile } from 'contexts/UserContext';

const CommentForm = ({ onSubmitComment }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const  userProfile  = useUserProfile();

    const onSubmit = data => {
        onSubmitComment(data.comment);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src={userProfile?.profilePictureUrl || '/Dashboard/user.svg'} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Input
                    className="flex-grow bg-gray-700 text-white border border-gray-600 placeholder-gray-400 rounded-md py-2 px-4"
                    placeholder="Add a comment..."
                    {...register("comment", { required: "Comment cannot be empty." })}
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                    Comment
                </Button>
            </form>
        </div>
    );
}

export default CommentForm;
