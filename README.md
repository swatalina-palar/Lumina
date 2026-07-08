<div align="center">

<img src="assests/Screenshot 2026-07-08 205411.png" alt="Lumina — The Future of Reading" width="100%" />

<br/>

# ✨ Lumina

### *Read with Clarity. Present with Confidence.*

**A premium, browser-native teleprompter and auto-scroll reader — zero install, zero friction.**

<br/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Lumina-8b5cf6?style=for-the-badge&logo=googlechrome&logoColor=white)](https://swatalina-palar.github.io/Lumina/)
[![Built With](https://img.shields.io/badge/Built%20With-Vanilla%20JS%20%7C%20HTML%20%7C%20CSS-22d3ee?style=for-the-badge)](https://github.com/swatalina-palar/Lumina)
[![License](https://img.shields.io/badge/License-MIT-a78bfa?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20Development-10b981?style=for-the-badge)]()
[![Made By](https://img.shields.io/badge/Made%20by-Swatalina%20Palar-f472b6?style=for-the-badge)]()

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Screenshots](#-screenshots)
- [Core Features](#-core-features)
- [How It Works](#-how-it-works)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Getting Started](#-getting-started)
- [Author](#-author)

---

## 🌟 Overview

**Lumina** is a feature-rich, browser-based teleprompter designed for speakers, content creators, educators, and professionals who demand precision. It combines a beautifully crafted UI with powerful functionality — including real-time translation, voice dictation, mirror mode, eye contact anchoring, and smart autoscroll — all without requiring any installation.

Lumina is engineered to remove every barrier between you and a flawless delivery. Whether you're recording a YouTube video, presenting at a conference, or practising a speech, Lumina adapts to your workflow in seconds.

> **"Speak without fear."** — Lumina's core promise.

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <strong>🌑 Hero — Dark Mode</strong><br/>
      <img src="assests/Screenshot 2026-07-08 205411.png" alt="Lumina Landing Page — Dark Mode" width="100%" style="border-radius:12px"/>
      <br/><sub>Animated Three.js particle canvas with typewriter effect</sub>
    </td>
    <td align="center" width="50%">
      <strong>☀️ Setup Panel — Light Mode</strong><br/>
      <img src="assests/Screenshot 2026-07-08 205510.png" alt="Lumina Setup Panel — Light Mode" width="100%" style="border-radius:12px"/>
      <br/><sub>Warm parchment theme with full script editor</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <strong>🎛️ Setup Panel — Dark Mode</strong><br/>
      <img src="assests/Screenshot 2026-07-08 205453.png" alt="Lumina Setup Panel — Dark Mode" width="100%" style="border-radius:12px"/>
      <br/><sub>Script editor with translation bar and font selector</sub>
    </td>
    <td align="center" width="50%">
      <strong>⚙️ Controls & Toggles</strong><br/>
      <img src="assests/Screenshot 2026-07-08 205600.png" alt="Lumina Controls Panel" width="100%" style="border-radius:12px"/>
      <br/><sub>Speed, font size, colour presets, mirror, focus, and countdown toggles</sub>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <strong>🎬 3-2-1 Countdown Overlay</strong><br/>
      <img src="assests/Screenshot 2026-07-08 205529.png" alt="Lumina Countdown Overlay" width="55%" style="border-radius:12px"/>
      <br/><sub>Animated full-screen countdown before autoscroll begins</sub>
    </td>
  </tr>
</table>

---

## 🚀 Core Features

### ⚡ Smart Autoscroll Engine
Silky-smooth, pixel-perfect scrolling driven by `requestAnimationFrame` for zero-jitter delivery at any speed from **5 px/s** to **200 px/s**. Speed can be adjusted live, mid-read, without interrupting the flow.

### 👁️ Eye Contact Mode
Anchors the active reading line to the **top third of the viewport** — right next to your camera — so your audience always sees you looking directly at them, not down at a screen.

### 🌍 Real-Time Translation
One-click translation into **7 Indian languages** powered by the MyMemory Translation API:

| Language | Code |
|----------|------|
| 🇮🇳 Hindi | `hi` |
| Bengali | `bn` |
| Odia | `or` |
| Tamil | `ta` |
| Telugu | `te` |
| Marathi | `mr` |
| English | `en` |

### 📝 Multi-Source Script Input
- **Type or paste** directly into the editor
- **Upload** PDF (`.pdf`), Word (`.docx`), or plain text (`.txt`) files
- **Voice Dictate** using the Web Speech API — hands-free script entry
- **Smart Format** button cleans up pasted text automatically
- **Grammar Check** with inline highlighting

### 🎨 Deep Personalisation
| Control | Range / Options |
|---------|-----------------|
| Scroll Speed | 5 – 200 px/s (slider + ±) |
| Font Size | Adjustable (slider + ±, live in reader) |
| Font Family | Outfit, Inter, DM Sans, Tech (Space Grotesk), Serif (Playfair), Mono |
| Text Colour | White, Teleprompter Green, Yellow, Custom |
| Theme | Dark (deep space) · Light (warm parchment) |

### 🔄 Mirror Mode
Flips text horizontally via CSS `scaleX(-1)` for use with **physical hardware teleprompters** — no extra hardware drivers needed.

### 🎯 Focus Line
A soft glow band fixed at the optimal reading position to reduce eye drift and maintain a natural, confident reading rhythm.

### ✨ Sentence Highlight
Dynamically highlights the current sentence as the reader scrolls, keeping your eyes locked to your exact position in the script.

### ⏱️ Countdown Timer
A gorgeous **3-2-1 animated overlay** before autoscroll starts, giving you time to compose yourself before each take.

### 📊 Live Progress & Time Remaining
- Glowing progress bar at the top of the reader showing percentage completion
- Live estimate of time remaining calculated from current scroll position and speed

### 💾 Auto-Save & Resume
The last script and scroll position are persisted to `localStorage`. Return to Lumina anytime and pick up exactly where you left off.

### 📜 Reading History
Full session history panel to review and reload any previous script.

---

## 🗺️ How It Works

```
Step 01 — Paste or Upload
    ↓  Type, paste, dictate, or upload PDF / Word / TXT

Step 02 — Tune Your Settings
    ↓  Set speed, font, size, colour. Toggle eye contact / mirror / focus / countdown

Step 03 — Present with Confidence
    ↓  Hit Start Reading → 3-2-1 countdown → full-screen autoscroll
       Pause, adjust, fast-forward — all with keyboard shortcuts
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play / Pause scroll |
| `↑` / `↓` | Increase / Decrease speed |
| `F` | Toggle full-screen |
| `M` | Toggle mirror mode |
| `R` | Restart from top |
| `Esc` | Exit reader back to setup |
| `?` | Open keyboard shortcuts panel |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | Semantic HTML5 |
| **Styling** | Vanilla CSS3 — Custom Properties, Grid, Flexbox, `backdrop-filter`, animations |
| **Logic** | Vanilla JavaScript (ES2020+), `requestAnimationFrame`, Web Speech API |
| **3D Background** | [Three.js r128](https://threejs.org/) — particle canvas on landing and app pages |
| **Document Parsing** | [PDF.js 3.11](https://mozilla.github.io/pdf.js/) · [Mammoth.js 1.6](https://github.com/mwilliamson/mammoth.js) |
| **Typography** | Google Fonts — Outfit · Space Grotesk · Playfair Display · Inter · DM Sans · Roboto Mono |
| **Translation API** | [MyMemory Translation API](https://mymemory.translated.net/) |
| **Storage** | Browser `localStorage` (script + scroll position) |
| **Hosting** | GitHub Pages |

> ✅ **Zero dependencies** installed via npm. Everything runs in the browser, out of the box.

---

## 📁 Project Structure

```
lumina/
├── index.html          # Landing page — Three.js hero, features, how-it-works
├── app.html            # Core application — setup panel + reader panel
├── script.js           # All application logic (1 300+ lines)
│                         ├── Autoscroll engine (rAF-based)
│                         ├── Voice dictation (Web Speech API)
│                         ├── File parsing (PDF.js + Mammoth)
│                         ├── Translation (MyMemory API)
│                         ├── Mirror, focus, highlight, countdown
│                         ├── Progress bar + time remaining
│                         ├── localStorage save/resume
│                         └── Keyboard shortcut handler
├── landing.js          # Three.js particle animation for landing page
├── style.css           # Unified design system (~985 lines)
│                         ├── CSS custom properties (dark + light themes)
│                         ├── Glass-morphism cards
│                         ├── Responsive layout (Grid + Flexbox)
│                         └── Micro-animations + transitions
├── plan.md             # Feature expansion roadmap
└── assests/            # Screenshot assets
    ├── Screenshot 2026-07-08 205411.png   # Landing — dark
    ├── Screenshot 2026-07-08 205453.png   # Setup panel — dark
    ├── Screenshot 2026-07-08 205510.png   # Setup panel — light
    ├── Screenshot 2026-07-08 205529.png   # Countdown overlay
    └── Screenshot 2026-07-08 205600.png   # Controls & toggles
```

---

## 🗺️ Roadmap

Planned features tracked in [`plan.md`](plan.md):

| # | Feature | Status |
|---|---------|--------|
| 1 | Progress Bar | ✅ Complete |
| 2 | Font Size Control (in-reader) | ✅ Complete |
| 3 | Focus Line | ✅ Complete |
| 4 | 3-2-1 Countdown | ✅ Complete |
| 5 | Time Remaining | ✅ Complete |
| 6 | Mirror Mode | ✅ Complete |
| 7 | Auto-Save Text | ✅ Complete |
| 8 | Text Colour Selector | ✅ Complete |

---

## 🚀 Getting Started

Lumina is a **pure static web application** — no build step, no package manager, no server required.

### Option 1 — Open Locally

```bash
# Clone the repository
git clone https://github.com/swatalina-palar/Lumina.git

# Navigate into the folder
cd Lumina

# Open in your browser
# Double-click index.html  OR
# Use Live Server (VS Code extension) for hot-reload
```

### Option 2 — GitHub Pages (Live)

Visit the hosted version directly:

```
https://swatalina-palar.github.io/Lumina/
```

### Browser Requirements

| Feature | Minimum |
|---------|---------|
| Chrome / Edge | v90+ ✅ |
| Firefox | v88+ ✅ |
| Safari | v14+ ✅ |
| Voice Dictation | Chrome / Edge only |
| Full-Screen API | All modern browsers |

> 💡 Voice dictation (`Dictate` button) requires a Chromium-based browser for full Web Speech API support.

---

## 👩‍💻 Author

<div align="center">

**Swatalina Palar**

*Crafted with ❤️ and a passion for beautiful, functional design.*

[![GitHub](https://img.shields.io/badge/GitHub-swatalina--palar-181717?style=for-the-badge&logo=github)](https://github.com/swatalina-palar)

</div>

---

<div align="center">

**Lumina © 2026 — All rights reserved.**

*"Speak without fear."*

</div>
