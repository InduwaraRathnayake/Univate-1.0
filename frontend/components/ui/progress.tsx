import React from 'react'

interface ProgressProps {
  value: number;
  className?: string;
}

const progress = () => {
    return (
    <div>progress</div>
  )
}

export default progress

export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={`relative w-full h-2 bg-gray-200 rounded ${className}`}>
      <div
        className="absolute animate-shimmer bg-[linear-gradient(110deg,black,45%,gray,55%,black)] bg-[length:200%_100%] top-0 left-0 h-full bg-black rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}