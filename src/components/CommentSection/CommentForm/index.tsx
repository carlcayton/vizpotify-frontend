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
        <Form {...form} className="text-white">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-800 p-4 rounded-md">

                <Avatar>
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>{`test`}</AvatarFallback>
                </Avatar>
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white">Comment</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write your comment..." className="bg-gray-700 text-white border-gray-600 placeholder-gray-400" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Post Comment</Button>
            </form>
        </Form>
    );
}

export default CommentForm;
