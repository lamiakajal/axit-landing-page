"use client";

import { useState, useEffect, useRef } from "react";
import { FaLightbulb, FaKeyboard, FaBolt } from "react-icons/fa";

/**
 * AwesomeFeatures Component ("WHY THIS IS AWESOME")
 * Matches scroll-entrance animation across the site,
 * features header line auto-expansion and contraction,
 * infinite gentle floating loop with soft glow ripples on icons,
 * canonical Tailwind v4 styling, and full responsiveness.
 */
export default function AwesomeFeatures() {
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

          // Contract line smoothly back after expanding to text bounds
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

  const featuresList = [
    {
      id: "thoughtful-design",
      icon: FaLightbulb,
      title: "Thoughtful Design",
      description:
        "Every single layout element is crafted with modular rhythm, precise baseline grids, and cohesive visual hierarchy to deliver intuitive user navigation.",
    },
    {
      id: "well-crafted",
      icon: FaKeyboard,
      title: "Well Crafted",
      description:
        "Engineered with clean architectural patterns, maintainable utility tokens, and robust components designed to scale effortlessly without design debt.",
    },
    {
      id: "easy-to-customize",
      icon: FaBolt,
      title: "Easy to Customize",
      description:
        "Effortlessly modify brand variables, typography scales, dynamic color palettes, and motion timings through centralized configuration files.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features-awesome"
      className="w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-gray-200 select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header with Dynamic Line Animation */}
        <div
          className={`flex flex-col items-center text-center max-w-2xl mx-auto mb-14 sm:mb-18 lg:mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <div className="inline-block group/title cursor-default">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light uppercase tracking-wider text-dark-900 leading-snug">
              WHY THIS IS AWESOME
            </h2>

            {/* Accent Line: Expands to full text width upon scroll into view, then returns to canonical size */}
            <div className="w-full mt-4 flex justify-center">
              <span
                className={`h-0.5 bg-primary rounded-full transition-all duration-700 ease-out group-hover/title:w-full ${
                  isLineExpanded ? "w-full" : "w-16"
                }`}
              />
            </div>
          </div>

          <p className="text-light-subtle text-xs sm:text-sm leading-relaxed font-light mt-4">
            Discover the foundational principles that empower seamless digital
            experiences and agile product iterations.
          </p>
        </div>

        {/* 3-Column Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-14">
          {featuresList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`flex flex-col items-center text-center p-4 rounded-xl transition-all duration-700 ease-out group cursor-pointer hover:bg-neutral-50/70 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Floating Icon Wrapper with Soft Loop Ripple */}
                <div className="relative mb-6">
                  {/* Gentle Expanding Ripple Loop */}
                  <span
                    className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-30 pointer-events-none group-hover:opacity-0"
                    style={{
                      animationDuration: "3.2s",
                      animationDelay: `${index * 1.1}s`,
                    }}
                  />

                  {/* Smooth Floating Badge */}
                  <div
                    style={{
                      animation: `floatSmooth ${4.2 + index * 0.4}s ease-in-out infinite`,
                      animationDelay: `${index * 0.6}s`,
                    }}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-primary/80 flex items-center justify-center text-primary bg-primary/5 transition-all duration-300 ease-out group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:shadow-[0_10px_25px_rgba(255,139,56,0.35)] group-hover:[animation-play-state:paused]"
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-105" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-dark-900 tracking-tight leading-snug mb-3 transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-light-subtle text-xs sm:text-sm leading-relaxed font-light max-w-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
