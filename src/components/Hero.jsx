"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Hero Section Component
 * - Independent bi-directional viewport observers for heading block and trial card
 * - Left column typography slides from left; right form card slides from right
 * - Dual typewriter looping mechanics on subtitle and form banner
 * - Continuous sinusoidal micro-float physics on interactive form
 * - Full responsive breakpoint adaptation with zero Tailwind v4 linter warnings
 */
export default function Hero() {
  const textRef = useRef(null);
  const formRef = useRef(null);

  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Observer for Left Headline Column
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTextVisible(true);
        } else {
          setIsTextVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Observer for Right Floating Form Column
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true);
        } else {
          setIsFormVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typewriter Loop 1: Form Header ("TRY YOUR FREE TRIAL TODAY")
  const fullFormText = "TRY YOUR FREE TRIAL TODAY";
  const [displayFormText, setDisplayFormText] = useState("");
  const [isFormDeleting, setIsFormDeleting] = useState(false);
  const [formCharIndex, setFormCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = isFormDeleting ? 45 : 90;
    const pauseDelay = isFormDeleting ? 400 : 1600;

    let timeout;

    if (!isFormDeleting && formCharIndex === fullFormText.length) {
      timeout = setTimeout(() => setIsFormDeleting(true), pauseDelay);
    } else if (isFormDeleting && formCharIndex === 0) {
      timeout = setTimeout(() => setIsFormDeleting(false), 500);
    } else {
      timeout = setTimeout(() => {
        const nextIndex = isFormDeleting
          ? formCharIndex - 1
          : formCharIndex + 1;
        setFormCharIndex(nextIndex);
        setDisplayFormText(fullFormText.substring(0, nextIndex));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [formCharIndex, isFormDeleting, fullFormText]);

  // Typewriter Loop 2: Subtitle Line ("FOR BEAUTIFUL PROTOTYPES")
  const fullSubText = "FOR BEAUTIFUL PROTOTYPES";
  const [displaySubText, setDisplaySubText] = useState("");
  const [isSubDeleting, setIsSubDeleting] = useState(false);
  const [subCharIndex, setSubCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = isSubDeleting ? 40 : 85;
    const pauseDelay = isSubDeleting ? 400 : 1800;

    let timeout;

    if (!isSubDeleting && subCharIndex === fullSubText.length) {
      timeout = setTimeout(() => setIsSubDeleting(true), pauseDelay);
    } else if (isSubDeleting && subCharIndex === 0) {
      timeout = setTimeout(() => setIsSubDeleting(false), 600);
    } else {
      timeout = setTimeout(() => {
        const nextIndex = isSubDeleting ? subCharIndex - 1 : subCharIndex + 1;
        setSubCharIndex(nextIndex);
        setDisplaySubText(fullSubText.substring(0, nextIndex));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [subCharIndex, isSubDeleting, fullSubText]);

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
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center py-20 lg:py-28 overflow-hidden"
    >
      {/* Background Graphic Asset */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/banner1.png"
          alt="Modern Architecture Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Primary Viewport Content Boundary */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 lg:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Heading and Value Proposition */}
          <div
            ref={textRef}
            className={`lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left text-white pr-0 lg:pr-4 select-none transition-all duration-1000 ease-out ${
              isTextVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Primary Logo Header */}
            <div className="mb-4 sm:mb-6">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-white drop-shadow-md">
                AX<span className="text-primary font-light">IT</span>
              </span>
            </div>

            {/* Secondary Heading with Typewriter on 2nd Line */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-light uppercase tracking-wide leading-snug sm:leading-tight max-w-lg drop-shadow-sm min-h-14.5 sm:min-h-18">
              MODERN AXURE TEMPLATE <br className="hidden sm:inline" />
              <span className="font-normal text-white">{displaySubText}</span>
              <span className="inline-block w-0.5 h-5 sm:h-6 bg-primary ml-1 align-middle animate-pulse" />
            </h2>

            {/* Static Accent Divider Line */}
            <div className="w-full my-5 flex justify-center lg:justify-start">
              <span className="h-0.5 bg-white rounded-full w-14 sm:w-16 drop-shadow-sm" />
            </div>

            {/* Value Proposition Description */}
            <p className="text-white/95 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-light drop-shadow-sm">
              Accelerate your digital product workflow with pixel-perfect
              layouts, modular component systems, and modern UI interactions
              designed specifically for high-impact web presentations.
            </p>

            {/* Interactive Download Button */}
            <a
              href="#download"
              className="relative overflow-hidden inline-block border-2 border-white text-white font-medium text-sm sm:text-base px-8 py-3.5 transition-colors duration-300 group shadow-md active:scale-95 cursor-pointer backdrop-blur-xs"
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

          {/* Right Column: Floating Trial Registration Card */}
          <div
            ref={formRef}
            className={`lg:col-span-5 w-full max-w-md mx-auto mt-6 lg:mt-12 transition-all duration-1000 delay-100 ease-out ${
              isFormVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div
              className="animate-floating transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(255,139,56,0.25)]"
              style={{
                animation:
                  "floatSmooth 5.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
                willChange: "transform",
              }}
            >
              <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-white/40">
                {/* Form Title Banner with Active Typewriter & Cursor */}
                <div className="bg-light-gray/95 py-5 px-6 text-center border-b border-gray-200 min-h-17 flex items-center justify-center">
                  <h3 className="text-dark-900 font-semibold text-sm sm:text-base tracking-wide uppercase">
                    <span>
                      {displayFormText.split("FREE").map((part, index, arr) => (
                        <span key={index}>
                          {part}
                          {index < arr.length - 1 && (
                            <span className="text-primary font-bold">FREE</span>
                          )}
                        </span>
                      ))}
                    </span>
                    <span className="inline-block w-0.5 h-4 bg-primary ml-1 align-middle animate-pulse" />
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

                  {/* Submission CTA Button */}
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
