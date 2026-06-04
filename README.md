# Dawn Model High School — Premium Website

A world-class, ultra-premium marketing website for **Dawn Model High School**, built with a modern React + Vite architecture. Designed to feel like a prestigious international private school — elegant typography, deep-navy & soft-gold palette, immersive 3D-style visuals, and luxury motion throughout.

> _“Shaping Future Leaders Through Excellence in Education.”_

## ✨ Highlights

- **13 fully-built sections** — Hero, About, Academics, Campus Life, 3D Campus, Why Choose Us, Achievements, Faculty, Testimonials, Gallery, Admissions, News & Events, Contact.
- **Immersive hero** — canvas particle field with connecting lines, parallax 3D campus card, floating badges, animated rings.
- **Interactive 3D campus** — mouse-driven WebGL-style parallax scene built with CSS 3D transforms (no heavy 3D library, ships tiny).
- **Premium motion** — scroll-triggered reveals (IntersectionObserver), animated stat counters, auto-sliding testimonial carousel, masonry gallery with keyboard-accessible lightbox.
- **Luxury design system** — Cormorant Garamond display + Plus Jakarta Sans body, gold-on-navy gradients, glassmorphism, refined hover states.
- **Fully responsive & mobile-first** — tuned breakpoints at 1080 / 760 / 540 px; particle density and animations scale down gracefully on phones.
- **Accessible & SEO-ready** — semantic HTML, ARIA labels, focus styles, `prefers-reduced-motion` support, Open Graph + Twitter meta, JSON-LD `EducationalOrganization` schema.
- **Fast** — ~58 KB gzipped JS, ~8.5 KB gzipped CSS, zero runtime UI dependencies beyond React.

## 🎨 Color Palette

| Token | Value | Use |
|-------|-------|-----|
| Deep Navy | `#0a1f44` | Primary brand, dark sections |
| Royal Blue | `#2563eb` | Accents, links, gradients |
| Soft Gold | `#d4af37` | Premium highlights, CTAs |
| White | `#ffffff` | Surfaces |
| Light Gray | `#f7f9fc` | Alternating backgrounds |

## 🚀 Getting Started

```bash
npm install      # install dependencies (one-time)
npm run dev      # start dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

Requires Node 18+ (built & tested on Node 24).

## 🗂️ Project Structure

```
src/
├─ main.jsx                 App entry
├─ App.jsx                  Section composition + scroll progress bar
├─ index.css                Full design system & all component styles
├─ hooks/
│  └─ useScrollReveal.js    IntersectionObserver reveal + count-up hooks
└─ components/
   ├─ common.jsx            Reveal, SectionHead, Counter primitives
   ├─ Navbar.jsx            Sticky header + mobile drawer
   ├─ Hero.jsx              Immersive parallax hero
   ├─ Particles.jsx         Canvas particle field
   ├─ About.jsx             Intro + animated statistics
   ├─ Academics.jsx         Interactive program tabs
   ├─ CampusLife.jsx        Bento-style campus cards
   ├─ Campus3D.jsx          Mouse-driven 3D campus scene
   ├─ WhyChoose.jsx         Reasons grid
   ├─ Achievements.jsx      Counters + milestone timeline
   ├─ Faculty.jsx           Faculty cards with hover socials
   ├─ Testimonials.jsx      Auto-sliding carousel
   ├─ Gallery.jsx           Masonry gallery + lightbox
   ├─ Admission.jsx         4-step workflow + CTA
   ├─ News.jsx              Event cards
   ├─ Contact.jsx           Form + animated map + info
   └─ Footer.jsx            Footer + newsletter
```

## 🖼️ Replacing Placeholder Imagery

Visuals currently use elegant gradient + emoji placeholders so the site ships dependency-free. To use real photography, swap the gradient `<div>`s (e.g. `.gallery-thumb`, `.news-media`, `.faculty-photo`, hero campus card) for `<img>` tags pointing at your assets — the layout and hover effects are already in place.

## 🛠️ Customization Tips

- **Brand/colors:** edit the CSS variables at the top of `src/index.css`.
- **Content:** each section keeps its copy in a small data array at the top of its component — edit text there.
- **Fonts:** swap the Google Fonts `<link>` in `index.html` and the `--font-*` variables.

---

Built with React 18 + Vite. © Dawn Model High School.
