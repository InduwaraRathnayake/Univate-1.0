"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import Button from "./ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/login");
  };

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  return (
    <nav className="fixed w-full z-50">
      <div className=" mx-auto">
        <div className="backdrop-blur-3xl bg-white/10 pr-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="hidden md:block h-[76px] w-[250px]"
              />
              <img
                src="/logo.png"
                alt="Logo"
                className="md:hidden h-[46px] w-[150px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/courses"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Courses
              </Link>
              <Link
                href="/resources"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Resources
              </Link>
              <Link
                href="/community"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Community
              </Link>
              <div className="flex items-center space-x-2">
                <Button
                  title="Sign In"
                  otherClasses="text-white hover:text-gray-200"
                  handleClick={handleSignInClick}
                />
                <Button
                  title="Sign Up"
                  otherClasses="text-white hover:text-gray-200"
                  handleClick={handleSignUpClick}
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white py-6"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-4 right-4 md:hidden"
            >
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 shadow-lg">
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/courses"
                    className="text-white hover:text-gray-200 transition-colors px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Courses
                  </Link>
                  <Link
                    href="/resources"
                    className="text-white hover:text-gray-200 transition-colors px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Resources
                  </Link>
                  <Link
                    href="/community"
                    className="text-white hover:text-gray-200 transition-colors px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Community
                  </Link>
                  <hr className="border-white/20" />

                  <Button
                    title="Sign In"
                    otherClasses="text-white hover:text-gray-200 justify-center"
                    handleClick={() => { handleSignInClick(); setIsOpen(false); }}
                  />
                  <Button
                    title="Sign Up"
                    otherClasses="text-white hover:text-gray-200 justify-center"
                    handleClick={() => { handleSignInClick(); setIsOpen(false); }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
