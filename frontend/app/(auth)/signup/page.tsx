"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth.service";
import { toast } from "sonner";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";


const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const handleGoogleResponse = async (response: CredentialResponse) => {
    setIsLoading(true);
    console.log("Full Google response:", response);
    console.log("Google credential response:", response.credential);

    try {
      const result = await authService.loginWithGoogle(response.credential);
      console.log("Backend response:", result); // Debug log

      if (result?.success) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(result?.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error); // Debug log
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data: SignupFormData) => {
    console.log("Form submitted with data:", data); // Debug log
    setIsLoading(true);

    try {
      const result = await authService.register({
        username: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      console.log("Registration result:", result); // Debug log

      if (result.success) {
        toast.success("Registration successful!");
        router.push("/login");
      } else {
        toast.error(result.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error); // Debug log
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden animate-gradient bg-gradient-to-r from-[#000] to-[#FFF] bg-[length:200%_200%]">
      {/* Left side - Image and tagline */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="./signupCover.png"
          alt="Computer Science Students"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center pb-44"
          >
            <img src="/logo.png" alt="Logo" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Your Personalized Guide to Success in Computer Science and
            Engineering!
          </motion.h1>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg space-y-8 bg-white backdrop-blur-xl p-8 rounded-2xl shadow-xl"
        >
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="sm:text-3xl text-2xl font-bold text-[#000] flex items-center justify-center space-x-2"
            >
              <span>Create an account</span>
              <img
                src="/logoBadge.png"
                alt="Logo"
                className="h-[40px] w-[40px] bg-black rounded-full p-1"
              />
            </motion.h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-gray-600 hover:text-[#000] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username")}
                  className="mt-1"
                  placeholder="johndoe"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message as string}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    className="mt-1"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    className="mt-1"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1"
                  placeholder="you@university.edu"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="mt-1"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className="mt-1"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message as string}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Button
                variant="submit"
                disabled={isLoading}
                title={isLoading ? "Creating account..." : "Create account"}
                otherClasses="w-full justify-center"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/50 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleOAuthProvider clientId="453733820138-s7krehi0k2gt3tvv20mp9qkjetpnki9e.apps.googleusercontent.com">
              <div className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full bg-[linear-gradient(110deg,black,45%,gray,55%,black)] bg-[length:200%_100%] object-fill w-full">
                <GoogleLogin
                  onSuccess={handleGoogleResponse}
                  onError={() => {
                    toast.error("Google login failed");
                  }}
                  theme="filled_black"
                  size="large"
                  shape="pill"
                  text="signup_with"
                  width={300}
                />
              </div>
            </GoogleOAuthProvider>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
