"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth.service";
import { toast } from "sonner";



import {
  GoogleLogin,
  GoogleOAuthProvider,
  CredentialResponse,
} from "@react-oauth/google";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
 ///////////////////////////////////////////////////////////////////////////////
  const handleLoginWithGoogle = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error("No token received");
      return;
    }
    setIsLoading(true);
    try {
      const result = await authService.loginWithGoogle(credentialResponse.credential);
      if (result.success) {
        toast.success("Google login successful!");
        router.push("/");
      } else {
        toast.error(result.error || "Google login failed");
      }
    } catch (error) {
      toast.error("Error with Google login");
    } finally {
      setIsLoading(false);
    }
  };
  /////////////////////////////////////////////////////////////////////////

  const onSubmit = async (data: LoginFormData) => {
    console.log("Form submitted:", data); // Debug log
    setIsLoading(true);

    try {
      const result = await authService.login(data.email, data.password);
      console.log("Login response:", result); // Debug log

      if (result.success) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error); // Debug log
      toast.error("An error occurred during login");
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
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Computer Science Student"
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
          {/* add logo to middle of the picture with animation */}
        </div>
      </div>
      {/* Right side - Login form */}
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
              className="text-3xl font-bold text-[#000] flex items-center justify-center space-x-2"
            >
              <span>Welcome back</span>
              <img
                src="/logoBadge.png"
                alt="Logo"
                className="h-[40px] w-[40px] bg-black rounded-full p-1"
              />
            </motion.h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-gray-600 hover:text-[#000] transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
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
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Button
                variant="submit"
                title={isLoading ? "Signing in..." : "Sign in"}
                otherClasses="w-full justify-center"
                disabled={isLoading}
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
            <Button
              title="Google"
              icon={<Mail className="mr-2 h-4 w-4" />}
              position="left"
              otherClasses="w-full justify-center"
            />

            <GoogleOAuthProvider clientId="331098794690-djjan66pid5h1ca1gi6p3fo31d712gj1.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
                onError={() => toast.error("Google login failed")}
              />
            </GoogleOAuthProvider>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
