# AXIT — Modern Responsive SaaS Landing Page

A modern, high-performance, and responsive SaaS landing page developed with **Next.js (App Router)** and **Tailwind CSS**. Built with modular component architecture, smooth scroll-triggered viewport animations, interactive tab navigation, and production-ready optimizations.

---

## 🚀 Live Demo & Repository

- **Live Demo:** [https://axit-lamiakajal.vercel.app](https://axit-lamiakajal.vercel.app)
- **GitHub Repository:** [https://github.com/lamiakajal/axit-landing-page](https://github.com/lamiakajal/axit-landing-page)

---

## ✨ Key Features

- **Component-Driven Layout:** Clean separation of concerns with modular sections (`Banner`, `FeatureStats`, `ScrollToTop`).
- **Responsive Architecture:** Fluid multi-device compatibility optimized across mobile, tablet, laptop, and ultra-wide viewports.
- **Scroll-Triggered Motion:** Bidirectional entrance transitions utilizing native Intersection Observer listeners.
- **Interactive Showcase:** Dynamic tab navigation highlighting features, metrics, and workflows.
- **Conversion-Focused Hero:** High-visibility hero banner paired with integrated lead capture and CTA buttons.
- **Optimized Asset Pipeline:** Integrated Next.js Image component optimization with modern remote media support.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, JavaScript / React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & PostCSS
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Version Control:** Git & GitHub

---

## 📁 Project Structure

```text
axit-landing-page/
├── public/                 # Static assets and media
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind directives and global CSS
│   │   ├── layout.js       # Root layout wrapper
│   │   └── page.js         # Primary landing page view
│   └── components/
│       ├── Banner.jsx       # Hero showcase and lead capture CTA
│       ├── FeatureStats.jsx # Core platform metrics and tab features
│       └── ScrollToTop.jsx  # Floating viewport navigation button
├── jsconfig.json           # Path alias configurations
├── next.config.mjs         # Next.js compiler and image options
├── package.json            # Node dependencies and npm scripts
├── postcss.config.mjs      # CSS processor pipeline
└── README.md               # Project documentation
```
