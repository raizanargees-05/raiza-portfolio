# 🌟 Raiza Nargees — Portfolio

A modern, award-style personal portfolio website inspired by bold, playful retro-pop aesthetics, built with **React**, **Vite**, **Tailwind CSS**, **Matter.js**, **GSAP**, and **Lenis**.

---

## ⚡ Features & Visual Highlights

- **Hero Display Typography**: Giant, ultra-bold, rounded headline spelling `RAIZA NARGEES` across two lines, filling the viewport with GSAP staggered entrance animations and 3D mouse parallax.
- **Physics Simulation (Matter.js)**: Floating retro red (`#D0003A`) and deep green (`#007A3D`) circles that drift, collide with boundaries, and are repelled by cursor movement.
- **Interactive PLAY Button**: Round crimson corner button with stacked accent dots. Click to activate gravity and watch the balls bounce; click again to reset into zero-gravity drift.
- **Smooth Inertial Scrolling (Lenis)**: Integrated seamlessly with GSAP `ScrollTrigger` for high-performance 60fps scrolling.
- **Pinned Horizontal Gallery**: Pinned horizontal-scroll showcase on desktop (`>=1024px`) with 3D card tilt and magnetic hover arrows; seamlessly switches to a vertical card stack on mobile/tablet.
- **Velocity-Responsive Marquee**: Dual-row infinite ticker of skills that accelerates when the user scrolls quickly.
- **Color Shift Transitions**: Background colors morph dynamically between sections (Yellow `#F0E85A` ➔ Cream `#FDF8E2` ➔ Dark `#141516` ➔ Green `#007A3D` ➔ Dark `#141516`).
- **Floating Bottom Pill Navigation**: Glassy blurred bar fixed at bottom center featuring `r.` logo, section links, active scroll spy indicator, and a highlighted "Contact" pill.
- **Custom Adaptive Cursor**: Lerped pointer dot that expands into a crimson badge with "VIEW" text over project cards.
- **Retro Preloader**: Percentage counter with a bouncing ball and curtain transition.
- **Live Local Time**: Ticker in the footer displaying the current time in Thrissur, Kerala (IST).
- **Instant Email Copy**: Copy-to-clipboard button with custom toast and confetti animation.
- **SEO & Accessibility**: Complete Open Graph, Twitter cards, meta tags, and `prefers-reduced-motion` support.

---

## 📁 Project Structure

```
raiza/
├── index.html                 # HTML shell, SEO metadata & Google Fonts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Custom palette, typography & brutalist shadows
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies & scripts
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Main layout, Lenis setup & background color transitions
    ├── index.css              # Global styles, noise overlay & retro utilities
    ├── data/
    │   └── content.js         # 🎯 All personal info, projects, skills & education
    └── components/
        ├── Preloader.jsx      # Bouncing ball preloader & 0-100% counter
        ├── CustomCursor.jsx   # Interactive custom cursor follower
        ├── HeroPhysics.jsx    # Matter.js canvas physics engine
        ├── Hero.jsx           # Display typography, subtitle & PLAY button
        ├── About.jsx          # Bio, Thejus Engineering details, quick facts & terminal
        ├── Projects.jsx       # Horizontal pinned scroll & 3D tilt project cards
        ├── Skills.jsx         # Infinite scroll-velocity marquee & category chips
        ├── Education.jsx      # Academic milestones timeline
        ├── Contact.jsx        # Huge "LET'S TALK", email copy toast & message form
        ├── Footer.jsx         # Footer, Kerala IST clock & back-to-top ball
        ├── FloatingNav.jsx    # Glassy bottom pill navbar with active spy
        └── Icons.jsx          # Custom SVG brand icons (GitHub, LinkedIn, Twitter)
```

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

---

## ✏️ How to Edit Content

All portfolio text and links live in one single file: [`src/data/content.js`](src/data/content.js).

You can easily edit:
- **Personal details**: Your name, role, college, location, and taglines.
- **Social profiles**: Email address, GitHub URL, LinkedIn URL, and Twitter handle.
- **Projects**: Add new projects, change descriptions, add project demo/repo URLs, or update badges and tags.
- **Skills**: Add or remove skills from both the high-velocity marquee and the categorized interactive cards.
- **Education**: Update GPA, coursework, club achievements, or dates.

---

## 🌐 Free Deployment

### Deploy on Vercel (Recommended)
1. Push this repository to your GitHub account (`git push origin main`).
2. Visit [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New Project"** and select your `raiza` repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Click **"Deploy"**. Your site will be live on a `*.vercel.app` URL within seconds!

### Deploy on Netlify
1. Log in to [netlify.com](https://netlify.com).
2. Click **"Add new site"** ➔ **"Import an existing project"** ➔ Select **GitHub**.
3. Set the build command to `npm run build` and publish directory to `dist`.
4. Click **"Deploy site"**.

