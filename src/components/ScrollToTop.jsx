"use client";

import { useState, useEffect } from "react";
import { HiChevronDoubleUp } from "react-icons/hi2";

/**
 * ScrollToTop Component
 * - Fixed persistent back-to-top floating action trigger matching canonical UI
 * - Viewport scroll listener managing entrance visibility thresholds
 * - Continuous sinusoidal float physics loop with paused state upon user hover
 * - Specular shimmer beam sweep loop across button curvature
 * - Hardware-accelerated smooth scrolling sequence to document apex
 * - Conforms strictly to canonical Tailwind CSS v4 design tokens
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Monitor scroll distance to manage entrance visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll sequence to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        animation: isVisible ? "floatSmooth 4s ease-in-out infinite" : "none",
      }}
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 transition-all duration-500 ease-out transform-gpu hover:[animation-play-state:paused] ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-75 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top of page"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#c0682b] hover:bg-primary-hover text-white/90 hover:text-white shadow-[0_6px_20px_rgba(192,104,43,0.45)] hover:shadow-[0_8px_28px_rgba(255,139,56,0.65)] cursor-pointer overflow-hidden transition-all duration-300 transform-gpu active:scale-90 hover:scale-110"
      >
        {/* Continuous looping shimmer specular gleam */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full pointer-events-none animate-[shimmerSweep_3.5s_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.45), transparent)",
          }}
        />

        {/* Directional hover background sweep overlay */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-primary-hover -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-active:translate-y-0"
        />

        {/* Centered Double Chevron Up Icon */}
        <HiChevronDoubleUp className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:-translate-y-1" />
      </button>
    </div>
  );
}
