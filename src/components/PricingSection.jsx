"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Single Pricing Card Component
 * Uses an independent IntersectionObserver so every individual card
 * triggers its entrance animation exactly when it scrolls into view on mobile.
 */
function PricingCard({ plan, index, expandedCardId, onCardClick }) {
  const cardRef = useRef(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const isToggledOnMobile = expandedCardId === plan.id;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardVisible(true);
        } else {
          // Re-triggers when scrolling away and back
          setIsCardVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Directional entry transform: Alternates gracefully on mobile stacks
  const getCardTransformClass = () => {
    if (!isCardVisible) {
      if (index === 0) return "opacity-0 -translate-x-12";
      if (index === 1)
        return "opacity-0 translate-y-12 scale-95 md:translate-y-12 md:translate-x-0";
      return "opacity-0 translate-x-12";
    }
    return "opacity-100 translate-x-0 translate-y-0 scale-100";
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onCardClick(plan.id)}
      style={{
        animation: `floatSmooth ${plan.floatDuration} ease-in-out infinite`,
        animationDelay: plan.floatDelay,
      }}
      className={`relative flex flex-col bg-white rounded-xs shadow-md border border-gray-200 overflow-hidden transition-all duration-700 ease-out cursor-pointer group hover:[animation-play-state:paused] hover:-translate-y-3 hover:shadow-2xl hover:border-primary/50 ${
        isToggledOnMobile ? "-translate-y-3 shadow-2xl border-primary/50" : ""
      } ${getCardTransformClass()}`}
    >
      {/* Header: Plan Designation */}
      <div className="bg-dark-700 py-4 px-6 text-center border-b border-white/10 transition-colors duration-300 group-hover:bg-[#222222]">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
          {plan.name}
        </h3>
      </div>

      {/* Header: Price Matrix */}
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

      {/* Action Strip: Desktop hover and mobile tap enabled */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isToggledOnMobile
            ? "max-h-16 opacity-100"
            : "max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100"
        }`}
      >
        <a
          href="#contact"
          onClick={(e) => e.stopPropagation()}
          className="relative overflow-hidden w-full bg-primary hover:bg-primary-hover text-white font-bold text-xs sm:text-sm tracking-wider uppercase py-3.5 text-center cursor-pointer block shadow-inner transition-colors duration-300 active:scale-95"
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

      {/* Features List */}
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

      {/* Dynamic accent bottom border */}
      <div
        className={`h-1.5 w-full bg-transparent transition-colors duration-300 ${
          isToggledOnMobile ? "bg-primary" : "group-hover:bg-primary"
        }`}
      />
    </div>
  );
}

/**
 * PricingSection Component ("PRICING OPTIONS")
 * Features per-card viewport intersection detection for distinct mobile scroll triggers.
 */
export default function PricingSection() {
  const headerRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isLineExpanded, setIsLineExpanded] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Section header observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          setIsLineExpanded(true);

          const timer = setTimeout(() => {
            setIsLineExpanded(false);
          }, 900);
          return () => clearTimeout(timer);
        } else {
          setIsHeaderVisible(false);
          setIsLineExpanded(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (planId) => {
    setExpandedCardId((prev) => (prev === planId ? null : planId));
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
      id="pricing"
      className="w-full bg-light-gray py-16 sm:py-20 lg:py-28 overflow-hidden border-b border-gray-200 select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`flex flex-col items-center text-center max-w-2xl mx-auto mb-14 sm:mb-18 lg:mb-20 transition-all duration-1000 ease-out ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
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

        {/* 3-Column Pricing Grid with Individual Scroll Viewport Triggers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-8 items-start max-w-5xl mx-auto pt-4">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              expandedCardId={expandedCardId}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
