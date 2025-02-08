"use client";

import { useRouter } from "next/navigation";
import { IoIosWarning } from "react-icons/io";

export default function ErrorPage() {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(0,2%,12%)] text-[hsl(0,0%,98%)] w-full overflow-hidden">
      {/* Background Effect */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 h-[250vmax] w-[250vmax] -translate-x-1/2 -translate-y-1/2">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,transparent,black_35%)]"></div>
        </div>
      </div>

      {/* Main Content */}
      <h1 className="relative text-transparent bg-clip-text text-[clamp(1rem,12vmin,4rem)] font-bold tracking-wide sm:tracking-[1rem] mb-4 bg-[radial-gradient(circle, hsl(53,0%,90%), hsl(53,0%,48%)_45%)] text-border-black text-center w-full px-4">
        Something went wrong
        <span className="absolute inset-0 text-[hsl(0,0%,0%)] blur-[1.5vmin] scale-105 transform -translate-y-[12%] animate-shadowSwing">
          Something went wrong
        </span>
      </h1>

      <div className="info text-center max-w-[clamp(18rem,85vw,40rem)] w-full leading-[1.5] px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 flex flex-col items-center gap-3 text-border-black">
          <span>We are unable to process your request</span>
          <IoIosWarning className="text-yellow-400 text-5xl sm:text-6xl animate-pulse" />
        </h2>
        <p className="font-light mb-6 text-sm sm:text-base text-gray-300">
          Please try again later. Thank you for your patience.
        </p>

        {/* Back Home Button */}
        <button
          onClick={handleOnClick}
          className="py-2 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-full border-2 border-white text-white bg-black hover:bg-white hover:text-black transition duration-300 transform hover:scale-105 focus:ring focus:ring-white/50"
        >
          GO HOME
        </button>
      </div>
    </div>
  );
}
