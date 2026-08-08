"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Command, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Login form validation schema (Zod). Extend as needed — e.g. add
 * `rememberMe: z.boolean()` — and the form values type follows.
 */
const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginValues = z.infer<typeof loginSchema>;

/**
 * Sign-in card with react-hook-form + Zod validation.
 *
 * The submit handler is a demo stub: it simulates a request, then routes to
 * the dashboard. Replace `onSubmit` with your auth call (NextAuth, Clerk,
 * Supabase, a custom API route, …) — validation and the loading state are
 * already wired.
 */
export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    // Demo behavior: pretend to authenticate, then enter the dashboard.
    // `values` is fully validated and typed at this point.
    void values;
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="bg-primary text-primary-foreground mx-auto mb-2 flex size-10 items-center justify-center rounded-lg">
          <Command className="size-5" />
        </div>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Sign in to your {siteConfig.name} account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          className="grid gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-destructive text-xs">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-destructive text-xs">
                {errors.password.message}
              </p>
            ) : null}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button
          type="submit"
          form="login-form"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>
        <p className="text-muted-foreground text-center text-xs">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="text-foreground underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
