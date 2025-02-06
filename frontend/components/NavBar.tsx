"use client";

import { Menu, User } from "lucide-react";
import Link from "next/link";
import Button from "./ui/button";
import { useState , useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { AnimatedTooltip } from "./ui/animated-tooltip";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/login");
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setUser(localStorage.getItem("user"));
  //   }
  // }, []);

  const user = localStorage.getItem("user");

  return (
    <nav className="fixed w-full z-50 ">
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
                href="/modules"
                className="text-border-black hover:text-gray-600 transition-colors"
              >
                Modules
              </Link>
              <Link
                href="/stream-information-hub"
                className="text-border-black hover:text-gray-600 transition-colors"
              >
                Streams
              </Link>
              <Link
                href="/career-guidance"
                className="text-border-black hover:text-gray-600 transition-colors"
              >
                Career Guidance
              </Link>
              <Link
                href="/#contact"
                className="text-border-black hover:text-gray-600 transition-colors"
              >
                Contact
              </Link>
              <div className="flex items-center space-x-2">
                {user ? (
                  <>
                    <Link href="/user">
                      <AnimatedTooltip
                        items={[
                          {
                            id: 1,
                            name: `${JSON.parse(user).firstName}`,
                            designation: "Visit Your Profile",
                            icon: (
                              <User className="h-12 w-12 p-2 mr-5 text-white inline-flex animate-shimmer items-center rounded-full bg-[linear-gradient(110deg,black,45%,gray,55%,black)] bg-[length:200%_100%] hover:scale-105" />
                            ),
                          },
                        ]}
                      />
                    </Link>
                  </>
                ) : (
                  <Button
                    title="Sign In"
                    otherClasses="text-white hover:text-gray-200"
                    handleClick={handleSignInClick}
                  />
                )}
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
                    href="/modules"
                    className="text-border-black hover:text-gray-600 transition-colors px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Modules
                  </Link>
                  <Link
                    href="/stream-information-hub"
                    className="text-border-black hover:text-gray-400 transition-colors px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Streams
                  </Link>
                  <Link
                    href="/career-guidance"
                    className="text-border-black hover:text-gray-400 transition-colors px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Career Guidance
                  </Link>
                  <Link
                    href="#contact"
                    className="text-border-black hover:text-gray-400 transition-colors px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  <hr className="border-white/20" />

                  {user ? (
                    <Button
                      title={`${JSON.parse(user).firstName}`}
                      otherClasses="text-white hover:text-gray-200 justify-center gap-5"
                      handleClick={() => {
                        router.push("/user");
                        setIsOpen(false);
                      }}
                      icon={<User className="h-8 w-8" />}
                      position="left"
                    />
                  ) : (
                    <Button
                      title="Sign In"
                      otherClasses="text-white hover:text-gray-200 justify-center"
                      handleClick={() => {
                        handleSignInClick();
                        setIsOpen(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
