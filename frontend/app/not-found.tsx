"use client";

import { useRouter } from "next/navigation";
import { IoIosWarning } from "react-icons/io";

export default function Custom404() {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(0,2%,12%)] text-[hsl(0,0%,98%)] perspective">
      <div className=" fixed inset-0 overflow-hidden">
        <div className=" absolute top-1/2 left-1/2 h-[250vmax] w-[250vmax] -translate-x-1/2 -translate-y-1/2">
          <div className=" h-full w-full bg-[radial-gradient(circle_at_center,transparent,black_35%)] "></div>
        </div>
      </div>

      <h1 className="relative text-transparent bg-clip-text text-[clamp(5rem,40vmin,20rem)] font-bold tracking-[1rem] mb-4 bg-[radial-gradient(circle, hsl(53,0%,90%), hsl(53,0%,48%)_45%)] text-border-black">
        404
        <span className="absolute inset-0 text-[hsl(0,0%,0%)] blur-[1.5vmin] scale-105 transform -translate-y-[12%] animate-shadowSwing">
          404
        </span>
      </h1>

      <div className="info text-center max-w-[clamp(16rem,90vmin,30rem)] leading-[1.5]">
        <h2 className="text-4xl font-extrabold mb-4 text-border-black items-center  justify-center flex flex-col gap-5">
          <span>We can't find that page</span>
          <IoIosWarning />
        </h2>
        <p className="font-light mb-8 text-border-black text-base">
          We're fairly sure that page used to be here, but seems to have gone
          missing. We do apologize on its behalf.
        </p>
        <button
          onClick={handleOnClick}
          className="py-2 px-8 text-xl sm:text-base font-semibold rounded-full border-2 border-white text-white bg-black hover:bg-white hover:text-black transition duration-300 transform hover:scale-105"
        >
          HOME
        </button>
      </div>
    </div>
  );
}
