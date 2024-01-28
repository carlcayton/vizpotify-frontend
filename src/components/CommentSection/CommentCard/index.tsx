import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FaThumbsUp } from 'react-icons/fa';


const CommentCard = ({ userName, content, createdAt, authorImageUrl }) => {

    return (
        <Card className="border border-gray-300 rounded-lg p-3 mb-2 bg-transparent">
            <div className='flex items-start space-x-2'>

                <Avatar className="shrink-0">
                    <AvatarImage src={authorImageUrl} />
                    <AvatarFallback>{userName ? userName.charAt(0) : ''}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-center w-full">
                        <div>
                            <span className="font-semibold text-white">User {userName}</span>
                            <span className="text-gray-300 text-xs ml-2">
                                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                    <p className="text-white mt-1">{content}</p>
                </div>
            </div>
        </Card>
    );
};

export default CommentCard;
