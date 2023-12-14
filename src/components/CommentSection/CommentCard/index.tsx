import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const CommentCard = ({ username, comment, timestamp, avatarSrc }) => (
    <Card>
        <CardHeader>
            <div className="flex items-center space-x-3">
                <Avatar>
                    <AvatarImage src={avatarSrc || "https://github.com/shadcn.png"} />
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{username}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <CardDescription>{comment}</CardDescription>
        </CardContent>
        <CardFooter>
            <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
            </p>
        </CardFooter>
    </Card>
);

export default CommentCard;
