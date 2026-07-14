# Idea2Brand AI 🚀
### The Visionary Brand Architect for the Next Generation

**Idea2Brand AI** is a professional-grade branding engine designed to transform simple ideas into world-class visual and strategic identities. Built for the modern web, it combines high-performance generative logic with an elite, dark-mode design system.

---

## ⚡ Tech Event Demo: "Ultra-Stable Engine"
For the live presentation, this build is configured with the **Deterministic Generative Engine (DGE)**. 
- **Latency**: < 2.5s (Zero-Wait)
- **Reliability**: 100% (Air-gapped from external API outages)
- **Generative Logic**: Uses a multi-industry randomization matrix to ensure high-diversity design packages (Tech, Luxury, Sustainable, Creative).

---

## 🛠 Technical Architecture
- **Framework**: Vite + React 18
- **Styling**: Tailwind CSS (Custom Design System with Glassmorphism)
- **AI Engine**: Dual-Mode AI Architecture
  - **Deterministic Generative Engine (DGE)**: Native offline mode in `src/utils/aiEngine.js` designed for zero-wait demo environments and low-bandwidth resilience.
  - **Live Gemini Engine**: Secure server-side routes in `server/routes/generate.js` powered by Google Gemini (`gemini-1.5-flash`) for live, context-aware brand packages.
- **Persistence**: Supabase integration for persistent user accounts and token management.
- **Visuals**: Dynamic client-side SVG/CSS brand assets generation.

---

## 💎 Key Features
- **Visual Identity**: Generates logo concepts, 4-color palettes (hex), and typography pairs.
- **Strategic Content**: AI-written mission statements and high-converting elevator pitches.
- **Social Velocity**: 3-platform launch strategy (Twitter, LinkedIn, Instagram).
- **Growth Tactics**: Actionable growth goals tailored to the brand niche.

---

## 🔓 Open Source Credentials & Licensing
Idea2Brand AI is an open-source AI platform built to support visibility initiatives like the **Open Source Digital Infrastructure (ODSI)** program in Africa.
- **License**: Released under the [MIT License](LICENSE). Anyone is free to self-host, adjust prompt templates, modify the local generative ruleset, or integrate new open LLM endpoints.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Supabase account (for live user auth/token balance)
- Google Gemini API Key (optional, for live AI mode)

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jammeha/Idea2Brand-AI.git
   cd Idea2Brand-AI
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Create a `.env` file in the root folder with the following variables:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

### Running the App
- **Front-end / Local Simulation**: 
  To run the local deterministic engine and React client, just start the Vite development server:
  ```bash
  npm run dev
  ```
- **Backend / Live AI API**:
  To start the server handling authentications and direct calls to Google Gemini:
  ```bash
  npm start --prefix server
  ```

---

## 📈 Roadmap & Next Steps
- [ ] Connect live user dashboard to track token history.
- [ ] Enable Vector (SVG) logo download features.
- [ ] Generate downloadable PDF "Brand Bible" style guides.
- [ ] Support local browser-based models (e.g., WebLLM) for fully private, browser-native AI generation.

