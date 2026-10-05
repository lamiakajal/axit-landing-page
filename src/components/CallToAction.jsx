"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * CallToAction Component ("STYLISH AXURE DESIGN")
 * - Stable bi-directional viewport observers eliminating layout jitter
 * - Fixed trigger boundary avoiding position-shift feedback loops on CTA button
 * - Expanding and contracting white line animation on header
 * - Pure natural background image with zero dark overlay
 * - Full responsive layout matching canonical template standards
 */
export default function CallToAction() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLineExpanded, setIsLineExpanded] = useState(false);

  // Unified stable viewport intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsLineExpanded(true);

          const timer = setTimeout(() => {
            setIsLineExpanded(false);
          }, 900);
          return () => clearTimeout(timer);
        } else {
          // Reset states when exiting viewport for repeatable scroll playback
          setIsVisible(false);
          setIsLineExpanded(false);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="download"
      className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-gray-800 select-none flex items-center justify-center"
    >
      {/* Background Graphic Asset - Clean presentation with zero dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/banner2.png"
          alt="Urban Streetscape Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Primary Viewport Content Boundary */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center text-white">
        {/* Section Heading & Expanding Underline */}
        <div
          className={`flex flex-col items-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="inline-block group/title cursor-default">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light uppercase tracking-widest text-white leading-snug drop-shadow-md">
              STYLISH AXURE DESIGN
            </h2>

            {/* Accent Underline: Expands upon scroll into view, then contracts */}
            <div className="w-full mt-4 flex justify-center">
              <span
                className={`h-0.5 bg-white rounded-full transition-all duration-700 ease-out group-hover/title:w-full drop-shadow-sm ${
                  isLineExpanded ? "w-full" : "w-16"
                }`}
              />
            </div>
          </div>

          {/* Subtitle / Descriptive Copy */}
          <p className="text-white text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto mt-6 mb-8 sm:mb-10 drop-shadow-md">
            Use the sections you need, remove the ones you don&apos;t. Create
            gorgeous prototypes faster than ever!
          </p>
        </div>

        {/* Download Ghost Action Button (Jitter-free smooth fade & slide) */}
        <div
          className={`transition-all duration-700 delay-150 ease-out transform-gpu ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="#download"
            className="relative overflow-hidden inline-block border-2 border-white text-white font-medium text-xs sm:text-sm uppercase tracking-wider px-8 sm:px-10 py-3 sm:py-3.5 transition-colors duration-300 group cursor-pointer active:scale-95 shadow-lg backdrop-blur-xs"
          >
            {/* Hover Background Sweep */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-primary -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-active:translate-x-0"
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Download
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
