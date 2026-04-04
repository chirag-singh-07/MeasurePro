"use client";

import { Ruler } from "lucide-react";

interface LoadingProps {
  fullScreen?: boolean;
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function Loading({
  fullScreen = true,
  text = "Loading...",
  size = "md",
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const dotSizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const container = fullScreen ? (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <LoadingContent
        sizeClasses={sizeClasses}
        dotSizeClasses={dotSizeClasses}
        size={size}
        text={text}
      />
    </div>
  ) : (
    <LoadingContent
      sizeClasses={sizeClasses}
      dotSizeClasses={dotSizeClasses}
      size={size}
      text={text}
    />
  );

  return container;
}

function LoadingContent({
  sizeClasses,
  dotSizeClasses,
  size,
  text,
}: {
  sizeClasses: Record<string, string>;
  dotSizeClasses: Record<string, string>;
  size: "sm" | "md" | "lg";
  text: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Logo with animated pulse */}
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-300 opacity-20 blur-lg animate-pulse"></div>
        <div
          className={`${sizeClasses[size]} bg-black text-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative z-10 animate-bounce`}
        >
          <Ruler className="h-2/3 w-2/3" />
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex gap-3 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${dotSizeClasses[size]} bg-black rounded-full animate-pulse`}
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Loading text */}
      {text && (
        <div className="text-center">
          <p className="font-bold text-black uppercase tracking-wide text-sm md:text-base">
            {text}
          </p>
          <div className="h-1 w-20 bg-black mt-2 mx-auto animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
