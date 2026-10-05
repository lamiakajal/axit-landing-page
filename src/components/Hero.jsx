"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Hero Section Component
 * Features full-viewport responsive layout with background overlay,
 * entrance-triggered expanding line animation, butter-smooth floating form physics
 * across all screen sizes, and touch-optimized left-to-right sliding CTAs.
 */
export default function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef(null);

  // Trigger line animation when user enters the Hero section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(false);
          setTimeout(() => setIsInView(true), 60);
        }
      },
      { threshold: 0.25 },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trial Form Payload:", formData);
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Graphic Asset with Dark Tone Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/banner1.png"
          alt="Modern Architecture Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-dark-900/65 lg:bg-dark-900/55" />
      </div>

      {/* Primary Viewport Content Boundary */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 lg:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Branding, Typography Hierarchy & Dynamic Line */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left text-white pr-0 lg:pr-4 group/text select-none cursor-pointer">
            {/* Primary Logo Header */}
            <div className="mb-4 sm:mb-6">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-white">
                AX<span className="text-primary font-light">IT</span>
              </span>
            </div>

            {/* Secondary Heading */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-light uppercase tracking-wide leading-snug sm:leading-tight max-w-lg">
              MODERN AXURE TEMPLATE <br className="hidden sm:inline" />
              <span className="font-normal">FOR BEAUTIFUL PROTOTYPES</span>
            </h2>

            {/* Responsive Accent Divider Line */}
            <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg my-5 flex justify-center lg:justify-start">
              <span
                className={`h-0.5 bg-white/80 rounded-full transition-all duration-700 ease-out group-hover/text:w-full group-active/text:w-full ${
                  isInView ? "animate-line-expand" : "w-14 sm:w-16"
                }`}
              />
            </div>

            {/* Value Proposition Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-light">
              Accelerate your digital product workflow with pixel-perfect
              layouts, modular component systems, and modern UI interactions
              designed specifically for high-impact web presentations.
            </p>

            {/* Interactive Download Button */}
            <a
              href="#download"
              className="relative overflow-hidden inline-block border-2 border-white text-white font-medium text-sm sm:text-base px-8 py-3.5 transition-colors duration-300 group shadow-sm active:scale-95 cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-primary -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-active:translate-x-0"
              />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Download
              </span>
            </a>
          </div>

          {/* Right Column: Guaranteed Smooth Floating Lead Form */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto mt-6 lg:mt-12">
            <div
              className="animate-floating transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(255,139,56,0.25)]"
              style={{
                animation:
                  "floatSmooth 5.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
                willChange: "transform",
              }}
            >
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-white/20">
                {/* Form Title Banner */}
                <div className="bg-light-gray/90 py-5 px-6 text-center border-b border-gray-200">
                  <h3 className="text-dark-900 font-semibold text-base sm:text-lg tracking-wide uppercase">
                    Try Your{" "}
                    <span className="text-primary font-bold">FREE</span> Trial
                    Today
                  </h3>
                </div>

                {/* Form Inputs Container */}
                <form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-8 flex flex-col gap-6"
                >
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      className="w-full border-b border-light-border pb-2.5 text-sm text-dark-700 placeholder-light-subtle focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      className="w-full border-b border-light-border pb-2.5 text-sm text-dark-700 placeholder-light-subtle focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      className="w-full border-b border-light-border pb-2.5 text-sm text-dark-700 placeholder-light-subtle focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Submission CTA */}
                  <button
                    type="submit"
                    className="relative overflow-hidden w-full mt-4 bg-primary text-white font-semibold text-sm sm:text-base py-3.5 px-4 rounded-b-md shadow-md cursor-pointer transition-colors duration-300 group active:scale-[0.99]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-primary-hover -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-active:translate-x-0"
                    />
                    <span className="relative z-10">Get Started</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
