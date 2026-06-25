# Ontech — E-Learning Platform

A high-performance, component-based e-learning landing page built with vanilla web technologies. Features a modular CSS architecture (7-1 pattern), ES6 class-based JavaScript modules, AI-generated photorealistic imagery, and Lighthouse-optimized performance scoring 95+ on both mobile and desktop.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Features](#features)
- [Performance Optimization](#performance-optimization)
- [Lighthouse Scores](#lighthouse-scores)
- [Accessibility](#accessibility)
- [SEO](#seo)
- [Responsive Design](#responsive-design)
- [Micro-Animations](#micro-animations)
- [Image Pipeline](#image-pipeline)
- [Getting Started](#getting-started)
- [Build Tools](#build-tools)
- [Browser Support](#browser-support)
- [License](#license)

---

## Overview

Ontech is a fully responsive e-learning platform frontend that delivers an engaging user experience through smooth micro-animations, a neo-brutalist design system, and aggressive performance optimization. The project demonstrates professional frontend engineering practices without relying on any UI framework or build bundler.

---

## Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Markup         | Semantic HTML5                      |
| Styling        | CSS3 (Custom Properties, 7-1 Architecture) |
| Scripting      | Vanilla ES6+ (Modules, Classes)     |
| Fonts          | Google Fonts (Inter)                |
| Images         | AI-Generated (Gemini 3.1 Flash) → WebP |
| Dev Server     | Node.js HTTP Server (gzip, caching) |
| Testing        | Lighthouse + Chrome DevTools        |
| Image Processing| Python + Pillow                    |

---

## Architecture

### CSS: 7-1 Pattern (ITCSS-inspired)

The stylesheet follows the **7-1 architecture** — seven folders of partial CSS files imported into a single entry point:

```
src/css/
├── abstracts/      → Design tokens, keyframe animations
├── base/           → Reset, typography, layout primitives
├── components/     → Reusable UI components (BEM)
├── sections/       → Page-level section styles
├── main.css        → Development entry point (imports all)
├── bundle.css      → Production build (minified, no @import)
├── utilities.css   → Scroll reveal, back-to-top, helpers
└── responsive.css  → Media queries (1024px / 768px / 480px)
```

**Naming Convention:** BEM (Block__Element--Modifier)
```
.card__image--hover-lift
.nav__link.active
.hero__capsule-pink
```

### JavaScript: ES6 Module Classes (OOP)

Each interactive feature is an isolated ES6 class with `init()` and `destroy()` lifecycle methods, imported via native ES modules:

```
src/js/
├── app.js              → Application controller (bootstraps all modules)
├── utils/
│   └── throttle.js     → throttle() + debounce() utilities
└── modules/
    ├── HeaderScroll.js     → Sticky header shadow on scroll
    ├── MobileMenu.js       → Hamburger menu with a11y (ARIA, Escape key)
    ├── SmoothScroll.js     → Anchor link smooth scrolling with offset
    ├── ScrollReveal.js     → IntersectionObserver-based reveal animations
    ├── CounterAnimation.js → Animated stat counters (requestAnimationFrame)
    ├── RippleEffect.js     → Material Design ripple on buttons
    ├── Carousel.js         → Reusable mentor carousel
    ├── TestimonialCarousel.js → Testimonial pagination
    ├── FormHandler.js      → Email validation + form feedback
    ├── BackToTop.js        → Scroll-to-top button
    ├── CardTilt.js         → 3D mouse-tracking tilt effect (desktop only)
    └── ActiveNav.js        → Scroll-spy active navigation highlight
```

### Design Tokens (CSS Custom Properties)

All design decisions are centralized in `abstracts/variables.css`:

```css
:root {
  --primary: #111111;
  --accent: #fcd34d;
  --bg: #faf7f2;
  --border-thick: 2px solid var(--border-color);
  --radius: 16px;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.15);
  --z-header: 1000;
  /* ... */
}
```

---

## Project Structure

```
ontech/
├── index.html                  → Main HTML (BEM, ARIA, SEO meta)
├── package.json                → NPM scripts
├── .gitignore
├── README.md
│
├── images/                     → AI-generated WebP images (14 files)
│   ├── hero-student.webp
│   ├── course-marketing.webp
│   ├── course-design.webp
│   ├── course-html.webp
│   ├── course-ux.webp
│   ├── mentor-1.webp ... mentor-4.webp
│   ├── testimonial-1.webp
│   ├── testimonial-2.webp
│   └── blog-1.webp ... blog-3.webp
│
├── src/
│   ├── css/                    → 7-1 modular architecture
│   │   ├── abstracts/
│   │   ├── base/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── main.css            → Dev entry (22 @imports)
│   │   ├── bundle.css          → Production (minified, single file)
│   │   ├── utilities.css
│   │   └── responsive.css
│   │
│   └── js/
│       ├── app.js              → App controller
│       ├── utils/
│       │   └── throttle.js
│       └── modules/
│           └── (12 component classes)
│
├── scripts/
│   └── start.js                → Node.js dev server (gzip + cache)
│
├── generate_images.py          → AI image generation (ZenMux/Gemini)
├── build_css.py                → CSS bundler & minifier
├── convert_webp.py             → PNG → WebP converter
└── optimize_images.py          → Image resizer & quality optimizer
```

---

## Features

- **Neo-Brutalist Design** — Thick black borders, bold typography, golden yellow accents
- **Layered Hero Capsule** — Pink/yellow capsule shapes with floating badges and sparkle stars
- **Course Cards** — Best Seller badges, star ratings, strike-through pricing
- **Top Categories** — Colored cards with overlapping circular icons
- **Mentor Carousel** — Navigation with responsive items-per-page
- **Testimonial Cards** — Yellow cards with avatar, divider, and sparkle decorations
- **Blog Grid** — 3-column layout with date and read-time meta
- **Footer** — 5-column grid with newsletter subscription form
- **Mobile Hamburger Menu** — Slide-in drawer with keyboard support (Escape to close)

---

## Performance Optimization

### CSS Optimization

| Technique                  | Impact                                      |
|----------------------------|---------------------------------------------|
| CSS Bundle (single file)   | Eliminates 22 render-blocking @import requests |
| Minification               | 25.8% size reduction (34KB → 25KB)         |
| Critical CSS (inline)      | Above-the-fold styles in `<head>` for instant render |
| `will-change` on cards     | GPU-accelerated transforms                  |
| `font-display: swap`       | Eliminates invisible text during font load  |

### Image Optimization

| Technique                  | Impact                                      |
|----------------------------|---------------------------------------------|
| WebP format                | ~75% smaller than PNG at equivalent quality |
| Quality reduction (72)     | Further 90% size reduction                  |
| Responsive resizing        | Avatars resized to 80-120px, cards to 400px |
| `loading="lazy"`           | Below-the-fold images load on demand        |
| `fetchpriority="high"`     | Hero image prioritized by browser           |
| `width`/`height` attrs     | Prevents Cumulative Layout Shift (CLS)      |

**Total image payload: ~115KB** (down from 1.4MB raw PNG)

### Server Optimization

| Feature                   | Detail                                         |
|---------------------------|------------------------------------------------|
| Gzip compression          | CSS, JS, HTML, SVG, JSON compressed            |
| Immutable cache headers   | Static assets cached for 1 year (`max-age=31536000, immutable`) |
| No-cache for HTML         | HTML always fresh (`no-cache`)                |
| Security headers          | `X-Content-Type-Options: nosniff`, `Referrer-Policy` |

### JavaScript Optimization

| Technique                  | Detail                                      |
|----------------------------|---------------------------------------------|
| ES6 Modules (`type="module"`) | Native browser modules, no bundler needed |
| `throttle()` on scroll     | Scroll handlers limited to 100ms intervals  |
| `IntersectionObserver`     | Reveal & counter animations only when visible |
| `{ passive: true }`        | Non-blocking scroll listeners               |
| `requestAnimationFrame`    | Smooth 60fps counter animations             |
| Desktop-only features      | Card tilt disabled on touch devices         |

---

## Lighthouse Scores

All scores verified at **95+ threshold**:

```
┌──────────────────────────────┬────────┬──────────┐
│ Metric                      │ Mobile │ Desktop  │
├──────────────────────────────┼────────┼──────────┤
│ Performance                 │   95   │   100    │
│ Accessibility               │   99   │    99    │
│ Best Practices              │   96   │   100    │
│ SEO                         │  100   │   100    │
├──────────────────────────────┼────────┼──────────┤
│ FCP (First Contentful Paint)│  1.6s  │  0.5s   │
│ LCP (Largest Contentful Paint)│ 2.8s │  0.8s   │
│ TBT (Total Blocking Time)   │   0ms  │   0ms   │
│ CLS (Cumulative Layout Shift)│   0   │  0.002  │
└──────────────────────────────┴────────┴──────────┘
```

---

## Accessibility

- **Semantic HTML5** — `<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`
- **ARIA labels** — All interactive elements have `aria-label`, `role`, `aria-hidden`
- **Skip link** — Keyboard users can skip to main content
- **Focus management** — `:focus-visible` with golden outline
- **Keyboard navigation** — Menu toggle via Enter/Space, close via Escape
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` disables all animations
- **Screen reader support** — Decorative SVGs marked `aria-hidden="true"`

---

## SEO

- **Meta tags** — Description, keywords, author, theme-color
- **Open Graph** — `og:title`, `og:description`, `og:type`
- **Semantic headings** — Proper H1 → H2 → H3 hierarchy
- **Alt text** — All images have descriptive `alt` attributes
- **Viewport meta** — `width=device-width, initial-scale=1.0, maximum-scale=5.0`
- **Clean URLs** — Anchor-based navigation (`#courses`, `#mentors`, etc.)

---

## Responsive Design

Three breakpoints with mobile-first approach:

| Breakpoint | Target              | Changes                                    |
|------------|---------------------|--------------------------------------------|
| 1024px     | Tablet Landscape    | Grids → 2 columns, hero gap reduced       |
| 768px      | Tablet Portrait     | Hamburger menu, single-column grids, hero stacks vertically |
| 480px      | Mobile              | Full-width form inputs, smaller hero capsule, reduced padding |

Typography uses `clamp()` for fluid scaling:
```css
font-size: clamp(2rem, 5vw, 3.5rem);
```

---

## Micro-Animations

| Animation           | Trigger       | Implementation                        |
|---------------------|---------------|---------------------------------------|
| Scroll Reveal       | Scroll into view | IntersectionObserver + CSS transitions |
| Card Hover Lift     | Mouse hover   | `transform: translateY(-8px)` + shadow |
| Image Zoom          | Card hover    | `transform: scale(1.08)` on image     |
| 3D Card Tilt        | Mouse move    | `perspective() + rotateX/Y` (desktop) |
| Ripple Effect       | Button click  | Dynamically created span + keyframe   |
| Icon Rotate         | Feature hover | `rotate(360deg) scale(1.1)`           |
| Floating Hero       | Continuous    | `@keyframes float` (6s loop)          |
| Sparkle Spin        | Continuous    | `@keyframes sparkle-spin` (3s loop)   |
| Pulse Ring          | Continuous    | `@keyframes pulse-ring` on badges     |
| Counter Animation   | Scroll into view | `requestAnimationFrame` easing       |
| Nav Underline       | Link hover    | `width: 0 → 100%` transition          |

**Stagger delays** (`delay-1` through `delay-4`) create sequential reveal cascades.

---

## Image Pipeline

Images are generated and optimized through a Python toolchain:

```
1. generate_images.py    → AI generation via ZenMux/Gemini API (PNG)
2. convert_webp.py       → PNG → WebP conversion (quality=85)
3. optimize_images.py    → Resize + quality reduction (quality=72)
```

**Style prompt suffix** ensures visual consistency:
```
Professional photograph, photorealistic, natural lighting,
high quality portrait photography, realistic human features,
natural skin tones, authentic expressions, sharp focus,
professional studio lighting, 85mm lens, shallow depth of field
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ (for dev server)
- **Python** 3.10+ (for image tools, optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/mutlukurt/ontech.git
cd ontech

# Install dependencies
npm install
```

### Development

```bash
# Start dev server (http://localhost:3000)
npm start
# or
node scripts/start.js
```

The server auto-opens the browser and serves with:
- Gzip compression
- Immutable cache headers for static assets
- ES module support

### Production CSS Build

```bash
# Bundle and minify all CSS modules into bundle.css
python build_css.py
```

### Image Generation (Optional)

```bash
# Set API key
export ZENMUX_API_KEY="your-api-key"

# Generate all 14 images
python generate_images.py

# Convert to WebP
python convert_webp.py

# Optimize sizes
python optimize_images.py
```

---

## Build Tools

| Tool                | Purpose                          | Command                  |
|---------------------|----------------------------------|--------------------------|
| `build_css.py`      | CSS bundling & minification      | `python build_css.py`    |
| `generate_images.py`| AI image generation             | `python generate_images.py` |
| `convert_webp.py`   | PNG → WebP conversion           | `python convert_webp.py` |
| `optimize_images.py`| Image resize & quality          | `python optimize_images.py` |
| `scripts/start.js`  | Dev server with gzip & cache    | `node scripts/start.js`  |

---

## Browser Support

| Browser           | Support |
|-------------------|---------|
| Chrome 88+        | Full    |
| Firefox 85+       | Full    |
| Safari 14+        | Full    |
| Edge 88+          | Full    |
| iOS Safari 14+    | Full    |
| Samsung Internet  | Full    |

**Requirements:** ES6 Modules, CSS Custom Properties, IntersectionObserver, `clamp()`

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Author

**Ontech** — [GitHub](https://github.com/mutlukurt/ontech)
