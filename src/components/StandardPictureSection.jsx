"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * StandardPictureSection Component
 * Clean presentation matching reference design:
 * Left column typography with scroll-triggered expanding/contracting orange line,
 * Right column framed browser mockup displaying cityscape image without zoom distortions.
 * Full responsive adaptation across mobile, tablet, and desktop viewports.
 */
export default function StandardPictureSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLineExpanded, setIsLineExpanded] = useState(false);

  // Trigger entrance animations and line expand/contract on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsLineExpanded(true);

          // Contract line smoothly back after expanding to text width
          const timer = setTimeout(() => {
            setIsLineExpanded(false);
          }, 900);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="standard-picture"
      className="w-full bg-light-gray py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-gray-200 select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, Animated Accent Line & Contextual Descriptions */}
          <div
            className={`lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Title Container with Dynamic Expanding Line */}
            <div className="inline-block mb-6 group/title cursor-default">
              <h3 className="text-2xl sm:text-3xl font-bold text-dark-900 tracking-tight leading-snug">
                Standard picture section
              </h3>

              {/* Accent Line: Expands to full text width upon scroll into view, then returns to canonical size */}
              <div className="w-full mt-3 flex justify-center lg:justify-start">
                <span
                  className={`h-0.5 bg-primary rounded-full transition-all duration-700 ease-out group-hover/title:w-full ${
                    isLineExpanded ? "w-full" : "w-16"
                  }`}
                />
              </div>
            </div>

            {/* Paragraph Text Content */}
            <div className="space-y-4 text-light-subtle text-xs sm:text-sm leading-relaxed font-light max-w-xl">
              <p>
                Experience effortless structural control with precision-crafted
                wireframes engineered to scale across diverse modern displays.
                Every component aligns with systematic spatial grids to reduce
                front-end design friction.
              </p>
              <p>
                Maintain total creative freedom through modular interface
                tokens, responsive viewport boundaries, and
                performance-optimized rendering frameworks.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Browser Frame with smooth entrance */}
          <div
            className={`lg:col-span-6 flex justify-center items-center transition-all duration-1000 delay-150 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative w-full max-w-xl group">
              {/* Browser Window Wrapper */}
              <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-200/90 bg-white transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                {/* Mock Browser Top Header Bar with 3 Colored Dots */}
                <div className="h-7 bg-[#f1f1f1] border-b border-gray-200 flex items-center px-3.5 gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-2xs" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-2xs" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-2xs" />
                  <div className="mx-auto w-1/2 h-3.5 bg-white rounded-xs border border-gray-200/70 hidden sm:block" />
                </div>

                {/* Picture Container (Static and Crisp, Zero Zoom Animation) */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100">
                  <Image
                    src="/assets/img-2.jpg"
                    alt="Metropolitan Skyline Architecture Landscape"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              {/* Ambient Underglow */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 bg-primary/10 rounded-2xl filter blur-xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
