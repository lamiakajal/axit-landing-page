"use client";

import { useState, useEffect, useRef } from "react";

/**
 * PricingSection Component ("PRICING OPTIONS")
 * - Desktop: Smooth hover-triggered slide-down for all cards
 * - Mobile / Touch: Tap/click on a card to expand/collapse the orange button
 * - Gentle floating motion across all boxes
 * - Zero linter warnings with Tailwind CSS v4 standards
 */
export default function PricingSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLineExpanded, setIsLineExpanded] = useState(false);

  // Track which card is tapped/active on mobile screens
  const [activeTouchCard, setActiveTouchCard] = useState(null);

  // Trigger entrance animations and line expand/contract on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsLineExpanded(true);

          // Contract line smoothly back after expanding to title bounds
          const timer = setTimeout(() => {
            setIsLineExpanded(false);
          }, 900);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardTouch = (planId) => {
    // Mobile-e tap korle toggle hobe
    setActiveTouchCard((prev) => (prev === planId ? null : planId));
  };

  const pricingPlans = [
    {
      id: "basic",
      name: "Basic",
      price: "0",
      period: "Free for Life",
      ctaText: "TRY TO USE",
      floatDuration: "5.5s",
      floatDelay: "0s",
      features: [
        "1 GB OF SPACE",
        "10 GB OF BANDWIDTH",
        "3 WEBSITES",
        "BASIC CUSTOMIZATION",
        "WORDPRESS INTEGRATION",
        "EMAIL SUPPORT",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: "19",
      period: "Monthly Payment",
      ctaText: "OUR MOST POPULAR",
      floatDuration: "6s",
      floatDelay: "0.8s",
      features: [
        "5 GB OF SPACE",
        "50 GB OF BANDWIDTH",
        "12 WEBSITES",
        "ADVANCED CUSTOMIZATION",
        "WORDPRESS INTEGRATION",
        "EMAIL SUPPORT",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "70",
      period: "Monthly Payment",
      ctaText: "CONTACT SALES",
      floatDuration: "5.8s",
      floatDelay: "1.6s",
      features: [
        "UNLIMITED SPACE",
        "UNLIMITED BANDWIDTH",
        "100 WEBSITES",
        "ADVANCED CUSTOMIZATION",
        "WORDPRESS INTEGRATION",
        "24/7 CUSTOMER SUPPORT",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="w-full bg-light-gray py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-gray-200 select-none"
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
              PRICING OPTIONS
            </h2>

            <div className="w-full mt-4 flex justify-center">
              <span
                className={`h-0.5 bg-primary rounded-full transition-all duration-700 ease-out group-hover/title:w-full ${
                  isLineExpanded ? "w-full" : "w-16"
                }`}
              />
            </div>
          </div>

          <p className="text-light-subtle text-xs sm:text-sm leading-relaxed font-light mt-4">
            Select the optimal subscription package tailored to your design
            architecture and prototyping velocity.
          </p>
        </div>

        {/* 3-Column Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-8 items-start max-w-5xl mx-auto pt-4">
          {pricingPlans.map((plan, index) => {
            const isTapped = activeTouchCard === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => handleCardTouch(plan.id)}
                style={{
                  animation: `floatSmooth ${plan.floatDuration} ease-in-out infinite`,
                  animationDelay: plan.floatDelay,
                  transitionDelay: `${index * 150}ms`,
                }}
                className={`relative flex flex-col bg-white rounded-xs shadow-md border border-gray-200 overflow-hidden transition-all duration-500 ease-out group cursor-pointer hover:[animation-play-state:paused] hover:-translate-y-3 hover:shadow-2xl hover:border-primary/50 ${
                  isTapped ? "-translate-y-3 shadow-2xl border-primary/50" : ""
                } ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                {/* Dark Top Header: Title */}
                <div className="bg-dark-700 py-4 px-6 text-center border-b border-white/10 transition-colors duration-300 group-hover:bg-[#222222]">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    {plan.name}
                  </h3>
                </div>

                {/* Dark Header: Pricing Display */}
                <div className="relative bg-dark-700 py-7 px-6 text-center text-white flex flex-col items-center justify-center transition-colors duration-300 group-hover:bg-[#252525] border-b-4 border-primary">
                  <div className="flex items-baseline justify-center">
                    <span className="text-2xl sm:text-3xl font-light text-white/90 mr-1">
                      $
                    </span>
                    <span className="text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400 italic mt-2 font-light tracking-wide">
                    {plan.period}
                  </span>
                </div>

                {/* Slide-Down Orange Button: Works on Desktop Hover AND Mobile Tap */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isTapped
                      ? "max-h-16 opacity-100"
                      : "max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100"
                  }`}
                >
                  <a
                    href="#contact"
                    onClick={(e) => e.stopPropagation()} // Card click theke link click alada rakhe
                    className="relative overflow-hidden w-full bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm tracking-wider uppercase py-3.5 text-center cursor-pointer block shadow-inner transition-colors duration-300 active:scale-98"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full pointer-events-none animate-[shimmerSweep_3.5s_infinite]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent)",
                        animationDelay: `${index * 1.2}s`,
                      }}
                    />
                    <span className="relative z-10">{plan.ctaText}</span>
                  </a>
                </div>

                {/* Features List Breakdown */}
                <div className="flex-1 flex flex-col divide-y divide-gray-100 bg-white">
                  {plan.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="py-3.5 px-4 text-center text-[11px] sm:text-xs text-light-subtle tracking-wider font-light transition-colors duration-200 hover:bg-neutral-50 hover:text-dark-900"
                    >
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Card Bottom Accent Border */}
                <div
                  className={`h-1.5 w-full bg-transparent transition-colors duration-300 ${
                    isTapped ? "bg-primary" : "group-hover:bg-primary"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
