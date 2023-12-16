import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";

const CommentCard = ({ username, comment, timestamp, avatarSrc }) => (
    <Card className="border border-gray-300 rounded-lg p-3 mb-2 bg-transparent">
        <div className='flex items-start space-x-2'>

            <Avatar className="shrink-0">
                <AvatarImage src={avatarSrc || "https://github.com/shadcn.png"} />
                <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-center w-full">
                    <div>
                        <span className="font-semibold text-white">{username}</span>
                        <span className="text-gray-500 text-xs ml-2">
                            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500 cursor-pointer hover:underline">
                        REPLY
                    </div>
                </div>
                <p className="text-white mt-1">{comment}</p>
            </div>
        </div>
    </Card>
);

export default CommentCard;

