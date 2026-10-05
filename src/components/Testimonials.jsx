"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Testimonials Component ("WHAT OUR CUSTOMERS ARE SAYING")
 * - Bidirectional scroll entrance transitions synchronized with IntersectionObserver
 * - Auto-advancing infinite carousel loop with pointer-enter pause mechanics
 * - Speech bubble layout rendered with profile avatars and client meta
 * - Full responsive breakpoint adaptation across viewport tiers
 * - Tailwind CSS v4 canonical class compliance with zero linter violations
 */
export default function Testimonials() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLineExpanded, setIsLineExpanded] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Susan W.",
      role: "Photographer",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus accusamus expedita repellat similique odio aspernatur ex, architecto eaque quo suscipit.",
    },
    {
      id: 2,
      name: "Jeremy H.",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus accusamus expedita repellat similique odio aspernatur ex, architecto eaque quo suscipit.",
    },
    {
      id: 3,
      name: "John D.",
      role: "Freelance Designer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus accusamus expedita repellat similique odio aspernatur ex, architecto eaque quo suscipit.",
    },
    {
      id: 4,
      name: "Elena R.",
      role: "UX Architect",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      comment:
        "The component structures and responsive layouts saved us dozens of engineering hours. Absolutely essential for high-fidelity interactive wireframes.",
    },
    {
      id: 5,
      name: "Marcus V.",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
      comment:
        "Exceptional attention to typographic hierarchy and spatial spacing. Our design team shipped customer portals in record time with zero design friction.",
    },
  ];

  // Re-executable scroll observer ensuring bi-directional trigger parity
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
          // Re-arm state vectors when scrolled out of viewport
          setIsVisible(false);
          setIsLineExpanded(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNext = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setStartIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }, [testimonials.length]);

  // Automated carousel interval with hover suspension mechanism
  useEffect(() => {
    if (isPaused) return;

    const autoSlideTimer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(autoSlideTimer);
  }, [isPaused, handleNext]);

  // Memoized window of three active sliding entities
  const visibleItems = [
    testimonials[startIndex],
    testimonials[(startIndex + 1) % testimonials.length],
    testimonials[(startIndex + 2) % testimonials.length],
  ];

  // Computes staggered directional entry transforms based on column index
  const getCardAnimationClass = (index) => {
    if (index === 0) {
      return isVisible
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-16";
    }
    if (index === 1) {
      return isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-14 scale-95";
    }
    return isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16";
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-gray-200 select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header with dynamic headline contraction */}
        <div
          className={`flex flex-col items-center text-center max-w-2xl mx-auto mb-14 sm:mb-18 lg:mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="inline-block group/title cursor-default">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light uppercase tracking-wider text-dark-900 leading-snug">
              WHAT OUR CUSTOMERS ARE SAYING
            </h2>

            {/* Accent border expands dynamically upon entering viewport */}
            <div className="w-full mt-4 flex justify-center">
              <span
                className={`h-0.5 bg-primary rounded-full transition-all duration-700 ease-out group-hover/title:w-full ${
                  isLineExpanded ? "w-full" : "w-16"
                }`}
              />
            </div>
          </div>

          <p className="text-light-subtle text-xs sm:text-sm leading-relaxed font-light mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Carousel stage with hover event listeners */}
        <div
          className="relative max-w-6xl mx-auto px-4 sm:px-10 lg:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation control: Previous */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Reviews"
            className={`absolute -left-2 sm:-left-3 lg:-left-6 top-20 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-gray-300 hover:text-primary transition-all duration-700 cursor-pointer active:scale-90 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <FaChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          {/* Navigation control: Next */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Reviews"
            className={`absolute -right-2 sm:-right-3 lg:-right-6 top-20 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center text-gray-300 hover:text-primary transition-all duration-700 cursor-pointer active:scale-90 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <FaChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          {/* Testimonial card grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {visibleItems.map((item, index) => (
              <div
                key={`${item.id}-${startIndex}`}
                style={{ transitionDelay: `${index * 120}ms` }}
                className={`flex flex-col transition-all duration-1000 ease-out ${getCardAnimationClass(index)}`}
              >
                {/* Speech bubble card */}
                <div className="relative bg-light-gray p-6 rounded-xs shadow-xs border border-gray-200/70 transition-all duration-300 hover:shadow-lg hover:border-primary/40 group">
                  <p className="text-light-subtle text-xs sm:text-[13px] italic leading-relaxed font-light select-none">
                    {item.comment}
                  </p>

                  {/* Speech bubble downward pointer */}
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-2.5 left-8 sm:left-9 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-10 border-t-light-gray"
                  />
                </div>

                {/* Profile meta: avatar and credentials */}
                <div className="flex items-center gap-4 mt-6 ml-2 sm:ml-3">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-md ring-1 ring-gray-200 shrink-0 transition-transform duration-300 hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-dark-900 tracking-tight leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-light-subtle text-xs sm:text-sm font-light mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel pagination indicators */}
          <div
            className={`flex items-center justify-center gap-2.5 mt-10 sm:mt-12 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {testimonials.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={() => setStartIndex(dotIndex)}
                aria-label={`Navigate to slide ${dotIndex + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  startIndex === dotIndex
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
