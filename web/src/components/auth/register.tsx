import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod/v4";

import { authClient } from "@/lib/authClient";
import type { RegisterFormValues } from "@/types/auth";

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

const registerSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(8, { message: "Password is too short" }),
});

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const form = useForm<RegisterFormValues>({
        resolver: standardSchemaResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setIsPending(true);
        try {
            const result = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (result.error) {
                toast.error(result.error.message || "Failed to register");
                return;
            }

            toast.success("Account created successfully");
            setTimeout(() => navigate("/dashboard/home"), 500);
        } catch (err) {
            toast.error(
                err instanceof Error ? err.message : "Failed to register",
            );
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="John Doe"
                                    type="text"
                                    autoComplete="name"
                                    className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs font-bold" />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="hello@example.com"
                                    type="email"
                                    autoComplete="email"
                                    className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs font-bold" />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                Password
                            </FormLabel>
                            <FormControl>
                                <div className="relative group">
                                    <Input
                                        placeholder="••••••••"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        autoComplete="password"
                                        className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all pr-12"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((state) => !state)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeIcon className="w-4 h-4" />
                                        ) : (
                                            <EyeClosedIcon className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage className="text-xs font-bold" />
                        </FormItem>
                    )}
                />

                {/* Submit btn */}
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 rounded-full font-bold shadow-lg shadow-foreground/10 transition-all active:scale-95 mt-2"
                >
                    {isPending ? "Creating account..." : "Create account"}
                </Button>
            </form>
        </Form>
    );
}
