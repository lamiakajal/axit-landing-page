"use client";

import { useState, useEffect, useRef } from "react";

/**
 * ContactSection Component ("CONTACT US")
 * - Independent bi-directional viewport observers for heading, input form, and message column
 * - Left column inputs slide from left; right message area slides from right
 * - Reset mechanics on scroll exit ensuring repeatable playback across viewports
 * - Standardized slender accent underline matching Pricing and Hero section metrics
 * - Interactive input focus state matching outline box highlight styling
 * - Continuous infinite shimmer sweep loop and soft float physics on submit button
 * - Canonical Tailwind CSS v4 design tokens with zero linter warnings
 */
export default function ContactSection() {
  const headerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const buttonRef = useRef(null);

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isLeftColVisible, setIsLeftColVisible] = useState(false);
  const [isRightColVisible, setIsRightColVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isLineExpanded, setIsLineExpanded] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Observer 1: Header block orchestration & dynamic slender accent line expansion cycle
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
          setIsLineExpanded(true);

          // Gracefully contract slender accent line after expanding across title bounds
          const timer = setTimeout(() => {
            setIsLineExpanded(false);
          }, 900);
          return () => clearTimeout(timer);
        } else {
          // Reset animation vector states on viewport exit
          setIsHeaderVisible(false);
          setIsLineExpanded(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  // Observer 2: Form input column entrance (negative X vector)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLeftColVisible(true);
        } else {
          setIsLeftColVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    if (leftColRef.current) observer.observe(leftColRef.current);
    return () => observer.disconnect();
  }, []);

  // Observer 3: Form message textarea entrance (positive X vector)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRightColVisible(true);
        } else {
          setIsRightColVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    if (rightColRef.current) observer.observe(rightColRef.current);
    return () => observer.disconnect();
  }, []);

  // Observer 4: Centered submit CTA button entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsButtonVisible(true);
        } else {
          setIsButtonVisible(false);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    if (buttonRef.current) observer.observe(buttonRef.current);
    return () => observer.disconnect();
  }, []);

  // Handles controlled form input mutations
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Dispatches form submission payload
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Submission:", formData);
  };

  // Shared responsive input class with active focus-box highlight
  const inputClassNames =
    "w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-dark-700 placeholder:text-gray-400 border border-transparent border-b-gray-300 transition-all duration-200 outline-none focus:border-primary focus:rounded-xs focus:ring-1 focus:ring-primary/25";

  return (
    <section
      id="contact"
      className="w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header with dynamic slender line contraction */}
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
              CONTACT US
            </h2>

            {/* Slender Accent Underline: Matches Pricing and Hero section thickness */}
            <div className="w-full mt-3 flex justify-center">
              <span
                className={`h-0.5 bg-primary rounded-full transition-all duration-700 ease-out group-hover/title:w-full drop-shadow-xs ${
                  isLineExpanded ? "w-full" : "w-14 sm:w-16"
                }`}
              />
            </div>
          </div>

          <p className="text-light-subtle text-xs sm:text-sm leading-relaxed font-light mt-3.5">
            Have questions or project ideas? Reach out to collaborate with our
            team.
          </p>
        </div>

        {/* Contact Form Wrapper */}
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-14 lg:gap-16 items-start">
            {/* Left Column: Name, Email, Subject Inputs (Slides from Left) */}
            <div
              ref={leftColRef}
              className={`flex flex-col space-y-5 sm:space-y-6 md:space-y-8 transition-all duration-1000 ease-out ${
                isLeftColVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className={inputClassNames}
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className={inputClassNames}
                />
              </div>

              {/* Subject Input */}
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  id="contact-subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className={inputClassNames}
                />
              </div>
            </div>

            {/* Right Column: Message Textarea (Slides from Right) */}
            <div
              ref={rightColRef}
              className={`flex flex-col h-full transition-all duration-1000 ease-out ${
                isRightColVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="relative h-full">
                <textarea
                  name="message"
                  id="contact-message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  className={`${inputClassNames} min-h-40 sm:min-h-48 resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Centered Submit Action Button with Matching Hero Form Hover Physics */}
          <div
            ref={buttonRef}
            className={`mt-12 sm:mt-16 flex justify-center transition-all duration-1000 ease-out transform-gpu ${
              isButtonVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <button
              type="submit"
              style={{
                animation: "floatSmooth 5s ease-in-out infinite",
              }}
              className="relative overflow-hidden inline-flex items-center justify-center bg-primary text-white font-semibold text-xs sm:text-sm px-10 py-3.5 rounded-xs shadow-[0_4px_14px_rgba(255,139,56,0.35)] hover:shadow-[0_6px_22px_rgba(255,139,56,0.5)] active:scale-95 transition-all duration-300 cursor-pointer group hover:[animation-play-state:paused]"
            >
              {/* Directional hover background sweep overlay */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-primary-hover -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-active:translate-x-0"
              />

              {/* Looping specular shimmer animation */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full pointer-events-none animate-[shimmerSweep_3.5s_infinite]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.35), transparent)",
                }}
              />

              <span className="relative z-10 tracking-wider font-normal">
                Send Message
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
