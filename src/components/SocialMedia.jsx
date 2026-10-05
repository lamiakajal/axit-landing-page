"use client";

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
 * Social Media Strip Component
 * Fully responsive layout across mobile, tablet, and desktop devices.
 * Features sequenced pulse-and-color wave looping animations with touch optimization.
 */
export default function SocialMedia() {
  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
    { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
    {
      name: "Google Plus",
      icon: FaGooglePlusG,
      href: "https://plus.google.com",
    },
    { name: "Pinterest", icon: FaPinterestP, href: "https://pinterest.com" },
    { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
    {
      name: "StumbleUpon",
      icon: FaStumbleupon,
      href: "https://stumbleupon.com",
    },
    { name: "RSS Feed", icon: FaRss, href: "#feed" },
  ];

  return (
    <section className="w-full bg-white border-b border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] py-6 sm:py-7 md:py-8 transition-all">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          {/* Left Column: Heading and Context Description */}
          <div className="text-center lg:text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-dark-900 tracking-tight leading-snug">
              Social Media
            </h3>
            <p className="text-light-subtle text-xs sm:text-sm mt-1.5 leading-relaxed font-light">
              Connect with our growing global community across multiple networks
              for regular feature releases, design assets, and live support.
            </p>
          </div>

          {/* Right Column: Responsive Looping & Pulsing Social Icons */}
          <div className="w-full lg:w-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-7 lg:gap-8">
            {socialLinks.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  style={{ animationDelay: `${index * 0.35}s` }}
                  className="animate-social-pulse group relative flex items-center justify-center p-2 rounded-full transition-all duration-300 hover:scale-125! hover:text-primary! active:scale-95 hover:[animation-play-state:paused]"
                >
                  {/* Scaled Responsive Icon Element */}
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-200" />

                  {/* Soft Background Accent Glow on Hover or Touch */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-primary/15 rounded-full scale-0 group-hover:scale-100 group-active:scale-100 transition-transform duration-300 pointer-events-none"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
