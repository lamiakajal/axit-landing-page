"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Hero Section Component
 * Fully responsive full-viewport hero layout featuring an optimized dual-tone overlay,
 * refined semantic typography hierarchy with balanced sizing,
 * butter-smooth floating card physics, and left-to-right solid primary slide-in interactive CTAs.
 */
export default function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-0 lg:pb-0 overflow-hidden">
      {/* Background Graphic Asset with High-Contrast Dark Overlay */}
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Semantic Branding, Value Pitch & Primary Action */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left text-white pr-0 lg:pr-4">
            {/* Primary Logo Header */}
            <div className="mb-4 sm:mb-6 select-none">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-white">
                AX<span className="text-primary font-light">IT</span>
              </span>
            </div>

            {/* Secondary Heading: Balanced typography size and width */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-light uppercase tracking-wide leading-snug sm:leading-tight max-w-lg">
              MODERN AXURE TEMPLATE <br className="hidden sm:inline" />
              <span className="font-normal">FOR BEAUTIFUL PROTOTYPES</span>
            </h2>

            {/* Geometric Accent Divider */}
            <div className="w-16 h-0.5 bg-white/80 my-5 rounded-full" />

            {/* Value Proposition Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-light">
              Accelerate your digital product workflow with pixel-perfect
              layouts, modular component systems, and modern UI interactions
              designed specifically for high-impact web presentations.
            </p>

            {/* Interactive Download Anchor with Left-to-Right Primary Slide Hover */}
            <a
              href="#download"
              className="relative overflow-hidden inline-block border-2 border-white text-white font-medium text-sm sm:text-base px-8 py-3.5 transition-all duration-300 group shadow-sm active:scale-95"
            >
              <span className="absolute inset-0 w-full h-full bg-primary transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Download
              </span>
            </a>
          </div>

          {/* Right Column: Lead Capture Card */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            {/* Smooth Floating Keyframe Layer */}
            <div className="animate-floating transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(255,139,56,0.2)]">
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

                  {/* Submission CTA with Left-to-Right Solid Brand Primary Hover */}
                  <button
                    type="submit"
                    className="relative overflow-hidden w-full mt-4 bg-primary text-white font-semibold text-sm sm:text-base py-3.5 px-4 rounded-b-md shadow-md cursor-pointer transition-all duration-300 group active:scale-[0.99]"
                  >
                    <span className="absolute inset-0 w-full h-full bg-primary-hover transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0" />
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
