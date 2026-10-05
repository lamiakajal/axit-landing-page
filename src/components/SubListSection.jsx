"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaCloudDownloadAlt } from "react-icons/fa";

/**
 * SubListSection Component
 * Scroll entrance animation via IntersectionObserver,
 * gentle looping floating micro-animations for feature icons,
 * enhanced tactile hover interaction, expanding accent line,
 * and zero linter warnings.
 */
export default function SubListSection() {
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

          // Contract line smoothly back after expanding
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

  const features = [
    {
      id: "feature-1",
      icon: FaCloudUploadAlt,
      title: "Cloud Infrastructure Sync",
      description:
        "Seamlessly synchronize design prototypes across distributed teams with automated cloud revision tracking and instant rollback capability.",
    },
    {
      id: "feature-2",
      icon: FaCloudDownloadAlt,
      title: "Production Ready Asset Export",
      description:
        "Export production-grade modular components and vector illustrations with precision layout fidelity optimized for zero runtime overhead.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="sub-list"
      className="w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-gray-200 select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Clean Browser Frame with smooth scroll entrance */}
          <div
            className={`lg:col-span-6 flex justify-center items-center transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative w-full max-w-xl group">
              {/* Browser Window Wrapper */}
              <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-200/90 bg-white transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                {/* Mock Browser Top Header Bar */}
                <div className="h-7 bg-[#f1f1f1] border-b border-gray-200 flex items-center px-3.5 gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-2xs" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-2xs" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-2xs" />
                  <div className="mx-auto w-1/2 h-3.5 bg-white rounded-xs border border-gray-200/70 hidden sm:block" />
                </div>

                {/* Picture Container (Static & Sharp) */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100">
                  <Image
                    src="/assets/img-1.jpg"
                    alt="Scenic Urban Architecture Landscape"
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

          {/* Right Column: Section Details & Animated Features */}
          <div
            className={`lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-1000 delay-200 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Title Container with Dynamic Expanding Line */}
            <div className="inline-block mb-6 group/title cursor-default">
              <h3 className="text-2xl sm:text-3xl font-bold text-dark-900 tracking-tight leading-snug">
                Sub list section
              </h3>

              {/* Accent Line: Expands to full text width upon scroll into view, then returns */}
              <div className="w-full mt-3 flex justify-center lg:justify-start">
                <span
                  className={`h-0.5 bg-primary rounded-full transition-all duration-700 ease-out group-hover/title:w-full ${
                    isLineExpanded ? "w-full" : "w-16"
                  }`}
                />
              </div>
            </div>

            {/* Introductory Description */}
            <p className="text-light-subtle text-xs sm:text-sm leading-relaxed font-light mb-8 sm:mb-10 max-w-xl">
              Establish a structured foundation for complex interfaces through
              synchronized layout components. Eliminate design discrepancies and
              accelerate frontend engineering with predictable design tokens and
              standardized hierarchies.
            </p>

            {/* Feature List Entries with Loop & Interactive Feedback */}
            <div className="w-full space-y-6 sm:space-y-8 max-w-xl">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    style={{ transitionDelay: `${index * 150}ms` }}
                    className={`p-3 -mx-3 rounded-lg sm:rounded-xl transition-all duration-300 ease-out hover:bg-neutral-50/80 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 group/item cursor-pointer ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {/* Circle Icon Badge with Continuous Floating Loop Animation */}
                    <div className="relative shrink-0">
                      {/* Ambient soft pulsating ring loop */}
                      <span
                        className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-25 pointer-events-none group-hover/item:opacity-0"
                        style={{
                          animationDuration: "3s",
                          animationDelay: `${index * 1.5}s`,
                        }}
                      />

                      <div
                        style={{
                          animation: `floatSmooth ${4 + index}s ease-in-out infinite`,
                          animationDelay: `${index * 0.7}s`,
                        }}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary/70 flex items-center justify-center text-primary bg-primary/5 transition-all duration-300 ease-out group-hover/item:bg-primary group-hover/item:text-white group-hover/item:border-primary group-hover/item:scale-105 group-hover/item:-translate-y-1 group-hover/item:shadow-[0_8px_20px_rgba(255,139,56,0.35)] group-hover/item:[animation-play-state:paused]"
                      >
                        <Icon className="w-6 h-6 transition-transform duration-300 group-hover/item:scale-110" />
                      </div>
                    </div>

                    {/* Feature Text Hierarchy */}
                    <div className="flex-1 pt-1">
                      <h4 className="text-base sm:text-lg font-bold text-dark-900 tracking-tight leading-snug mb-1 transition-colors duration-300 group-hover/item:text-primary">
                        {item.title}
                      </h4>
                      <p className="text-light-subtle text-xs sm:text-sm leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
