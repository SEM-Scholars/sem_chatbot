import React from "react";
import { cn } from "@/lib/utils";

export default function FancyBorderBox({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-xl p-[2px] cursor-pointer transition-transform duration-200 hover:scale-[1.01]",
        className
      )}
    >
      {/* Gradient border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#d40504] to-[#a90260]" />

      {/* Soft fading shadow */}
      <div className="absolute inset-0 rounded-xl z-0 pointer-events-none shadow-[0_30px_40px_rgba(212,5,96,0.2)] blur-xl opacity-40" />

      {/* Content area */}
      <div className="relative z-10 bg-white rounded-xl p-4 sm:p-5 text-center">
        {children}
      </div>
    </div>
  );
}
