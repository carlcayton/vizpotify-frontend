import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    comment: z.string().min(1, {
        message: "Comment cannot be empty.",
    }),
});

const CommentForm = ({ onCommentSubmit }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        onCommentSubmit(data);
    };

    return (
        <Form {...form} className="bg-gray-800 p-4 rounded-md">
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Input
                    className="flex-grow bg-gray-700 text-white border border-gray-600 placeholder-gray-400 rounded-md py-2 px-4"
                    placeholder="Add a comment..."
                    {...form.register("comment")}
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                    Comment
                </Button>
            </form>
        </Form>
    );


}

export default CommentForm;
