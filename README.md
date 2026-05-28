# seedling. 🌱
> A premium, minimalist local TypeScript sandbox pipeline for dynamic project blueprinting, dynamic AI strategy formulation, and interactive ecosystem milestone tracking.

Designed for fluid prototyping with React, TypeScript, Tailwind CSS, and Node.js, `seedling.` acts as an elegant workspace for conceptualizing ideas, establishing milestone tracks, fetching structured AI advisory frameworks, and visualizing operational progress in real-time.

---

## 🏗️ Architecture & Pipeline Matrix

The application is structured linearly across four distinct development phases to guarantee focus, eliminate mental overhead, and structure operational execution:
1. **Phase 01 (Goal & Intention Blueprint):** Define the fundamental scope, primary intentions, and operational description parameters of your initiative.
2. **Phase 02 (Linear Checklist Sequencing):** Map out an explicit three-tier sequential path of operational milestone targets.
3. **Phase 03 (AI Strategy Matrix Formulation):** Query a local backend node integrated directly with Gemini's AI execution core to generate dual, high-impact strategic vectors (`Velocity` vs. `Safeguard`).
4. **Phase 04 (Interactive Ecosystem Command Dashboard):** Manage live execution parameters, log progress via interactive milestone checkpoints, check metrics via glassmorphic yield meters, and view an integrated real-time ecosystem visualizer (`ThreeSeedling`).

---

## 🛡️ Key Features & Recent Optimizations

### ⚡ Screen-Aware Auto-Unlock Mechanism (`Step3Strategy`)
* Built a dynamic layout intersection observer inside the strategic overlay modal.
* **Smart Behavior:** If a user views the modal on a high-resolution display or the returned text is short enough to fit inside the viewport without triggering standard container vertical overflows, the modal skips the strict scrolling validation check, instantly flipping the button to **Accept Strategy ✓** and freeing up user workflow transitions.

### 🌫️ Clear Frosted Glass Visualizer Contexts
* Stripped away the muddy green overlay tints and standard gray background overlays (`bg-slate-900/50`) across all high-priority modal views.
* Implemented a pristine `bg-transparent backdrop-blur-md` overlay configuration that leaves underlying dashboard components fully visible but beautifully diffused under an un-tinted glassmorphic pane.

### 🏆 Milestone Completion Celebration Overlay (`Step4Dashboard`)
* Created a full-screen, screen-spanning celebratory modal card that activates precisely when the ecosystem maturity hits **100%**.
* Uses an asynchronous state execution loop (`setTimeout` gates) to decouple complex multi-state changes out of continuous React layout calculations, resolving cascading synchronization linter bugs completely.
* Includes custom floating CSS popper keyframe animations (`🎉`, `✨`, `🌱`) that float upward alongside a smoothly rotating golden trophy emblem.

### 🔧 Safe AI Sandbox Node Constructor Initialization (`backend/server.js`)
* Configured the latest modular `@google/genai` integration node accurately by passing a dedicated instantiation configuration parameter wrapper `{}` to prevent structural object linter property crashes during operational startups.

---

## 📂 File Layout & Core Source Architecture

```text
├── backend/
│   ├── .env                 # Environment secrets storage (GEMINI_API_KEY)
│   └── server.js            # Express API router node handling Gemini structured content queries
├── src/
│   ├── components/
│   │   ├── Step1Goal.tsx        # Goal initialization pane
│   │   ├── Step2Milestones.tsx  # Linear checkpoint builder
│   │   ├── Step3Strategy.tsx    # Screen-aware AI strategy review engine & popup layout
│   │   ├── Step4Dashboard.tsx   # Glassmorphic tracking console & achievement celebration layer
│   │   └── ThreeSeedling.tsx    # Dedicated Ecosystem progress visualization node
│   ├── App.tsx              # Main orchestrator managing global step indices & canvas state purges
│   ├── index.css            # Custom CSS animation keyframes and global utilities
│   └── types.ts             # Strict TypeScript payload structural interface parameters