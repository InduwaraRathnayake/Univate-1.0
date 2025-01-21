import React from "react";

const Button = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
  disabled,
  variant,
}: {
  title?: string;
  icon?: React.ReactNode;
  position?: string;
  handleClick?: () => void;
  otherClasses?: string;
  disabled?: boolean;
  variant?: string;
}) => {
  return (
    // Button code
    <button
      className={`inline-flex h-12 animate-shimmer items-center rounded-full bg-[linear-gradient(110deg,black,45%,gray,55%,black)] bg-[length:200%_100%] px-6 font-medium text-[#EDE8F5] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 gap-2 ${otherClasses}`}
      onClick={handleClick}
      disabled={disabled}
      type={variant === "submit" ? "submit" : "button"}
    >
      {position === "left" && icon}
      {title}
      {position === "right" && icon}
    </button>
  );
};

export default Button;
