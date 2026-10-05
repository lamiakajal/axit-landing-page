"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaPinterestP,
  FaInstagram,
  FaStumbleupon,
  FaRss,
} from "react-icons/fa";

/**
 * Footer Component
 * - Features the exact canonical social icon array from Axure Themes specifications
 * - Bi-directional scroll entrance sequencing with staggered item animation vectors
 * - Re-arms animation triggers on viewport exit for repeatable scroll playback
 * - Micro-interactive float loop animation modeled identically after SocialMedia section
 * - Tactile elevation hover physics with soft luminous orange brand highlights
 * - Zero linter warnings adhering to canonical Tailwind CSS v4 design tokens
 */
export default function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Bi-directional viewport intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Re-arm state vectors upon viewport exit
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px",
      },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Canonical social link registry matching template specification
  const socialLinks = [
    {
      id: "facebook",
      icon: FaFacebookF,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      id: "twitter",
      icon: FaTwitter,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      id: "google-plus",
      icon: FaGooglePlusG,
      href: "https://plus.google.com",
      label: "Google Plus",
    },
    {
      id: "pinterest",
      icon: FaPinterestP,
      href: "https://pinterest.com",
      label: "Pinterest",
    },
    {
      id: "instagram",
      icon: FaInstagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      id: "stumbleupon",
      icon: FaStumbleupon,
      href: "https://stumbleupon.com",
      label: "StumbleUpon",
    },
    {
      id: "rss",
      icon: FaRss,
      href: "#rss",
      label: "RSS Feed",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="w-full bg-black py-8 sm:py-10 select-none overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center text-center">
        {/* Social Icons Array with Staggered Entrance & Infinite Float Loop */}
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 md:gap-8 mb-5">
          {socialLinks.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  transitionDelay: `${index * 75}ms`,
                }}
                className={`transition-all duration-700 ease-out transform-gpu ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-90"
                }`}
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  style={{
                    animation: "floatSmooth 4.5s ease-in-out infinite",
                    animationDelay: `${index * 0.25}s`,
                  }}
                  className="group relative flex items-center justify-center p-2 text-white/70 hover:text-primary transition-all duration-300 ease-out transform-gpu hover:scale-125 hover:-translate-y-1.5 active:scale-95 cursor-pointer focus:outline-none focus:text-primary hover:[animation-play-state:paused]"
                >
                  {/* Subtle ambient back-glow ring on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 -z-10 blur-xs"
                  />

                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 drop-shadow-sm group-hover:drop-shadow-[0_2px_8px_rgba(255,139,56,0.6)]" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Copyright Statement */}
        <p
          className={`text-gray-400 text-xs sm:text-[13px] tracking-wide font-light transition-all duration-700 delay-300 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          &copy;2015 Axure Themes
        </p>
      </div>
    </footer>
  );
}
