import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/authClient";
import type { LoginFormValues } from "@/types/auth";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(8, { message: "Password is too short" }),
});

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const navigate = useNavigate();

	const form = useForm<LoginFormValues>({
		resolver: standardSchemaResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormValues) => {
		setIsPending(true);
		try {
			const result = await authClient.signIn.email({
				email: data.email,
				password: data.password,
			});

			if (result.error) {
				toast.error(result.error.message || "Failed to authenticate");
				return;
			}

			console.log(result);

			toast.success("Authenticated successfully");
			setTimeout(() => navigate("/dashboard/home"), 500);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to authenticate");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel className="text-sm font-medium">Email</FormLabel>
							<FormControl>
								<Input placeholder="email@example.com" type="email" autoComplete="email" {...field} />
							</FormControl>
							<FormMessage>{fieldState.error?.message}</FormMessage>
						</FormItem>
					)}
				/>

				{/* Password */}
				<FormField
					control={form.control}
					name="password"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormLabel className="text-sm font-medium">Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										placeholder="secret-password"
										type={showPassword ? "text" : "password"}
										autoComplete="password"
										{...field}
									/>
									<button
										type="button" // if not mentioned, treated as type submit
										onClick={() => setShowPassword((state) => !state)}
										className="absolute right-3"
									>
										{showPassword ? <EyeIcon /> : <EyeClosedIcon />}
									</button>
								</div>
							</FormControl>
							<FormMessage>{fieldState.error?.message}</FormMessage>
						</FormItem>
					)}
				/>

				{/* Submit btn */}
				<Button type="submit" disabled={isPending} className="w-full mt-4">
					{isPending ? "Logging in..." : "Login"}
				</Button>
			</form>
		</Form>
	);
}
