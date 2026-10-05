"use client";

import { useState, useEffect } from "react";

/**
 * Preloader Component
 * Fully responsive full-screen loader with maximum z-index overlay to prevent
 * Navbar or other fixed elements from showing through during page load.
 * Locks body scroll during active loading.
 */
export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent background scrolling while preloader is active
    if (isLoading) {
      document.body.style.overflow = "hidden";
    }

    // Smooth progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 110);

    // Complete loading sequence
    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "unset"; // Restore scrolling
        setTimeout(() => setShouldRender(false), 700); // Remove from DOM after fade-out
      }, 350);
    };

    if (document.readyState === "complete") {
      setTimeout(handleComplete, 1100);
    } else {
      window.addEventListener("load", handleComplete);
      const fallbackTimer = setTimeout(handleComplete, 1600);
      return () => {
        window.removeEventListener("load", handleComplete);
        clearTimeout(fallbackTimer);
        clearInterval(interval);
        document.body.style.overflow = "unset";
      };
    }

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden={!isLoading}
      className={`fixed inset-0 top-0 left-0 w-screen h-dvh z-9999 flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-in-out select-none px-4 ${
        isLoading
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center text-center w-full max-w-xs sm:max-w-sm">
        {/* Brand Logo with Pulsing Effect */}
        <div className="mb-6 sm:mb-8 animate-pulse">
          <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-dark-900">
            AX<span className="text-primary font-light">IT</span>
          </span>
        </div>

        {/* Theme Orange Rotating Spinner Ring */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-6 sm:mb-8">
          {/* Subtle Outer Track Ring */}
          <div className="w-full h-full rounded-full border-4 border-primary/20" />
          {/* Animated Active Orange Spinning Arc */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin" />
        </div>

        {/* Loading Progress Bar Container */}
        <div className="w-48 sm:w-60 h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-primary rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="text-[11px] sm:text-xs font-semibold text-light-subtle tracking-widest uppercase mt-3">
          Loading {progress}%
        </span>
      </div>
    </div>
  );
}
