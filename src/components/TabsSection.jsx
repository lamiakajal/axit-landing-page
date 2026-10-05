"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * TabsSection Component
 * Balanced layout for desktop bounds while ensuring compact, natural spacing
 * between text, CTA button, and illustration on mobile screens.
 */
export default function TabsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Tab Dataset referencing assets
  const tabsData = [
    {
      id: "tab1",
      label: "TAB 1",
      title: "Tabs with soft transitioning effect.",
      description1:
        "Streamline your entire creative prototype workflow with modular structural components and flexible layout systems designed specifically for scalable web applications.",
      description2:
        "Every interaction state is crafted to deliver immediate tactile feedback, ensuring seamless consistency across all modern browser engines and mobile interfaces.",
      image: "/assets/tab-img-1.png",
      altText: "City Skyline Illustration - Concept 1",
    },
    {
      id: "tab2",
      label: "TAB 2",
      title: "Optimized for speed and rapid iteration.",
      description1:
        "Accelerate every iterative development phase with atomic class architecture and reusable interface blocks built to adapt seamlessly across multiple platform viewports.",
      description2:
        "Maximize cross-browser performance and eliminate interface regressions with precision-crafted styles that preserve visual integrity on every handheld and desktop device.",
      image: "/assets/tab-img-2.png",
      altText: "City Skyline Illustration - Concept 2",
    },
    {
      id: "tab3",
      label: "TAB 3",
      title: "Production ready design architecture.",
      description1:
        "Deliver polished enterprise-grade web layouts with predictable typography scales, strict vertical alignment constraints, and smooth hardware-accelerated user animations.",
      description2:
        "Maintain clean visual boundaries throughout the entire user journey while reducing front-end bundle overhead through streamlined semantic markup and modern utilities.",
      image: "/assets/tab-img-3.png",
      altText: "City Skyline Illustration - Concept 3",
    },
  ];

  // Silky smooth auto-loop interval (3s), pauses on hover/touch
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabsData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, tabsData.length]);

  return (
    <section
      id="features"
      className="w-full bg-light-gray py-14 sm:py-20 lg:py-28 overflow-hidden border-b border-gray-200 select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-14"
        >
          {/* Left + Middle Combined Container */}
          <div className="w-full lg:w-7/12 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-10 md:gap-14">
            {/* Left Vertical Tab Strip */}
            <div className="w-full sm:w-28 shrink-0 flex flex-row sm:flex-col gap-0 rounded-xs overflow-hidden shadow-md divide-x sm:divide-x-0 sm:divide-y divide-gray-600 bg-dark-700">
              {tabsData.map((tab, index) => {
                const isActive = activeTab === index;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    role="tab"
                    aria-selected={isActive}
                    className={`relative flex-1 py-3 sm:py-0 sm:h-24 md:h-28 flex items-center justify-center font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-500 cursor-pointer px-2 active:scale-98 ${
                      isActive
                        ? "bg-primary text-white shadow-inner"
                        : "bg-dark-700 text-gray-300 hover:bg-neutral-700 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span
                        className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-white/40 hidden sm:block transition-all duration-300"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Middle Content Column: Mobile-e button text-er kache thakbe, desktop-e height bounded thakbe */}
            <div className="flex-1 flex flex-col justify-start sm:justify-between text-center sm:text-left py-0.5 sm:min-h-70">
              <div className="relative">
                {tabsData.map((tab, index) => {
                  const isCurrent = activeTab === index;
                  return (
                    <div
                      key={tab.id}
                      className={`transition-all duration-500 ease-in-out ${
                        isCurrent
                          ? "opacity-100 translate-y-0 relative pointer-events-auto"
                          : "opacity-0 translate-y-2 absolute inset-0 pointer-events-none"
                      }`}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-dark-900 tracking-tight leading-snug mb-3 sm:mb-4">
                        {tab.title}
                      </h3>
                      <div className="space-y-3 sm:space-y-4 text-light-subtle text-xs sm:text-sm leading-relaxed font-light">
                        <p>{tab.description1}</p>
                        <p className="hidden sm:block">{tab.description2}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Download CTA Button: Mobile-e mt-6 diye text-er thik niche thakbe */}
              <div className="mt-6 sm:mt-4 flex justify-center sm:justify-start">
                <a
                  href="#download"
                  className="relative overflow-hidden inline-block bg-primary text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-xs shadow-sm transition-colors duration-300 group active:scale-95 cursor-pointer"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-primary-hover -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-active:translate-x-0"
                  />
                  <span className="relative z-10">Download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Artwork with balanced responsive gap */}
          <div className="w-full lg:w-5/12 flex justify-center items-center relative h-55 sm:h-70 lg:h-80 mt-2 sm:mt-0">
            {tabsData.map((tab, index) => {
              const isCurrent = activeTab === index;
              return (
                <div
                  key={tab.id}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                    isCurrent
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full max-w-105 h-50 sm:h-65 lg:h-75">
                    <Image
                      src={tab.image}
                      alt={tab.altText}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 420px"
                      className="object-contain drop-shadow-xs"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
