"use client"
import { loginAction } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { error } from "console";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
type SignInPayload = {
    email: string,
    password: string
}
export function SignInForm() {
    const form = useForm<SignInPayload>({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const onSubmit = async (payload:SignInPayload ) => {
      const res = await loginAction( payload.email,payload.password);
      if ("error" in res) {
        toast(res.error);
        return;
      }
      window.location.reload() ;
     }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-96">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="johndoe@email.com" {...field} required className="h-12" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" {...field} type="password" required className="h-12" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full h-12 disabled">Sign In</Button>
            </form>
        </Form>
    )
}