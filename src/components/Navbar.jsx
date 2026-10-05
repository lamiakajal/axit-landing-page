"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

/**
 * Navbar Component
 * Fully responsive sticky navigation bar with backdrop blur,
 * touch-optimized active states, animated underline indicator, and smooth section jump.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for sticky shadow & blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Pricing", href: "#pricing" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-900/95 backdrop-blur-md shadow-xl py-2.5"
          : "bg-dark-900 py-4"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Image Logo */}
        <Link
          href="/"
          className="flex items-center transition-transform duration-200 active:scale-95 hover:scale-105"
        >
          <Image
            src="/assets/logo.png"
            alt="AXIT Logo"
            width={80}
            height={26}
            priority
            className="w-auto h-6 sm:h-7 object-contain"
          />
        </Link>

        {/* Desktop Navigation Menu (md, lg, xl, 2xl) */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 text-sm font-semibold text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative py-1 tracking-wide text-gray-300 hover:text-white active:text-primary transition-colors duration-300 group cursor-pointer"
            >
              {link.name}
              {/* Smooth Hover & Active Underline Indicator */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out group-hover:w-full group-active:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button with Tap Animation */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-300 hover:text-primary active:text-primary transition-colors p-2 rounded-md focus:outline-none active:scale-90"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? (
            <HiX className="w-7 h-7" />
          ) : (
            <HiMenu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-dark-900/98 backdrop-blur-lg border-t border-neutral-800 ${
          isOpen
            ? "max-h-80 opacity-100 py-4 shadow-2xl"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col space-y-1 px-4 sm:px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative block text-gray-300 hover:text-white hover:bg-neutral-800/60 active:bg-primary/20 active:text-primary px-4 py-3 rounded-md font-medium text-sm transition-all duration-200 active:scale-[0.98]"
            >
              <span className="flex items-center justify-between">
                {link.name}
                {/* Subtle right accent arrow for mobile interaction */}
                <span className="text-primary text-xs opacity-0 hover:opacity-100 active:opacity-100 transition-opacity">
                  &rarr;
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
