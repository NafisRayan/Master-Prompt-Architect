# Master Prompt Architect

A powerful, professionally designed web application for generating structured, high-fidelity AI prompts. Master Prompt Architect helps developers and designers create comprehensive prompts that produce production-ready code with precise specifications.

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF)

## Overview

Master Prompt Architect solves the problem of crafting effective prompts for AI coding assistants. Instead of writing vague or incomplete prompts, users can use this tool to construct detailed, structured prompts following a proven engineering framework that covers:

- **Role & Act Definition** - Define the AI's persona and expertise level
- **Design System Specifications** - Colors, typography, spacing rules
- **Layout & Structure** - Precise component arrangements and proportions
- **Visual Elements** - Icons, strokes, effects
- **3D Elements** - Three.js specifications when needed
- **Animations & Motion** - Framer Motion, GSAP, transitions
- **Responsiveness** - Mobile to ultra-wide adaptations
- **Code Quality Standards** - Production-ready requirements
- **Forbidden Actions** - Explicit restrictions

The tool supports both **Detailed Mode** (full manual control over all parameters) and **Simple Mode** (AI infers specifications from a natural language request).

---

## Features

### 1. Dual Mode Architecture

#### Detailed Mode
Full control over every aspect of your prompt. Configure each section individually:

| Field | Description | Icon |
|-------|-------------|------|
| **Act / Role** | Define the AI's persona (e.g., "Senior Frontend Engineer & UI Designer") | CPU |
| **Reference** | Source of truth - what the output should be based on | Layers |
| **Colors / Design System** | Color palette, brand colors, accent colors | Zap |
| **Typography** | Font families, weights, text styles | Type |
| **Layout & Structure** | Grid systems, component arrangements | Layout |
| **Visual Elements** | Icons, effects, glassmorphism, shadows | Sparkles |
| **3D Elements** | Three.js specifications, particle effects | Box |
| **Animation & Motion** | Framer Motion rules, transitions | RefreshCw |
| **Responsiveness** | Breakpoints, adaptive strategies | Smartphone |
| **Forbidden Actions** | Explicit restrictions and prohibitions | Ban |

#### Simple Mode
A streamlined experience where you describe your project in plain language, and the AI intelligently infers all engineering details while maintaining the rigorous framework structure. Perfect for quick prototyping or when you need a starting point.

### 2. Multi-Engine AI Support

Master Prompt Architect supports two AI inference engines:

#### Google Gemini (Default)
- **gemini-3-flash-preview** - Fast, efficient for quick generations
- **gemini-3.1-pro-preview** - Advanced reasoning, best for complex prompts
- **gemini-3.1-flash-lite** - Lightweight option for simpler tasks

The Gemini API key is managed through platform secrets (environment variable), ensuring security.

#### Hugging Face Inference
- **Flexible Model Selection** - Use any text-instruction model from Hugging Face
- **Default Model** - `mistralai/Mistral-7B-Instruct-v0.3`
- **Custom Models** - Enter any model path (e.g., `meta-llama/Llama-3-8B-Instruct`)
- **User-Provided API Key** - Stored locally in session for immediate use

### 3. Image Reference Support

Upload reference screenshots to provide visual context:

- **File Upload** - Click the add button to select multiple images
- **Clipboard Paste** - Paste images directly from clipboard anywhere in the app (Cmd/Ctrl+V)
- **Drag & Drop Ready** - Visual feedback for uploaded images
- **Image Preview** - Thumbnail grid with removal capability
- **Base64 Encoding** - Images are processed and sent to the AI model for vision understanding

### 4. Settings Panel

Accessible via the gear icon in the header, the settings panel provides:

- **Engine Selection** - Toggle between Google Gemini and Hugging Face
- **Model Configuration** - Select or enter specific models
- **API Key Management** - Configure Hugging Face API key (stored in session)
- **Persistent Configuration** - Settings persist during the session

### 5. Output & Export

- **Live Preview** - See the generated prompt in real-time
- **Markdown Format** - Properly formatted output ready for copy-paste
- **One-Click Copy** - Copy entire prompt to clipboard with visual feedback
- **Copy Confirmation** - Visual indicator shows successful copy

### 6. Professional UI/UX

#### Visual Design
- **Dark Theme** - Professional dark interface (#0A0A0A base)
- **Grid Background** - Subtle technical grid pattern
- **Glassmorphism** - Modern translucent card effects
- **Custom Typography** - Inter (UI) + JetBrains Mono (code)

#### Animations
- **Motion Library** - Smooth animations using Motion (formerly Framer Motion)
- **Micro-interactions** - Button hover states, loading indicators
- **Modal Transitions** - Smooth open/close animations
- **Staggered Reveals** - Content appears with elegant delays

#### Responsive Layout
- **Split-Pane Design** - Inputs on left, output on right
- **Fluid Grid** - Adapts from desktop to tablet
- **Scrollable Sections** - Independent scrolling for input and output areas

---

## Technical Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | UI Framework |
| TypeScript | 5.8.2 | Type Safety |
| Vite | 6.2.0 | Build Tool |
| Tailwind CSS | 4.1.14 | Styling |
| Motion | 12.23.24 | Animations |
| Lucide React | 0.546.0 | Icons |
| Google GenAI | 1.29.0 | Gemini SDK |
| Express | 4.21.2 | Backend (optional) |
| Dotenv | 17.2.3 | Environment Variables |

---

## Project Structure

```
Master-Prompt-Architect/
├── src/
│   ├── services/
│   │   └── ai.ts              # AI inference services (Gemini & HuggingFace)
│   ├── types.ts               # TypeScript interfaces and default values
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles with Tailwind
├── index.html                  # HTML entry point
├── vite.config.ts             # Vite configuration with Tailwind
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── .env.example                # Environment variable template
└── metadata.json               # Project metadata
```

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Master-Prompt-Architect
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API key
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run TypeScript type checking:
```bash
npm run lint
```

---

## Usage Guide

### Creating a Detailed Prompt

1. Select **DETAILED** mode from the header toggle
2. Fill in the required fields:
   - **Act/Role**: Define who the AI should be (e.g., "Senior Frontend Engineer")
   - **Reference**: Describe what you're building
   - **Colors**: Specify your color palette
   - **Typography**: Define font families
3. Optionally add:
   - Reference screenshots via upload or paste
   - 3D element specifications
   - Animation requirements
   - Responsiveness rules
4. Add forbidden actions to prevent unwanted changes
5. Click **Architect Master Prompt**
6. Copy the generated prompt

### Creating a Simple Prompt

1. Select **SIMPLE** mode from the header toggle
2. Enter a natural language description of your project
3. Click **Architect Master Prompt**
4. The AI will infer all technical details while maintaining the framework

### Using Different AI Engines

1. Click the **Settings** icon (gear) in the header
2. Select your preferred engine:
   - **Google Gemini**: Uses platform-managed API key
   - **Hugging Face**: Enter your API key and choose a model
3. Save settings and generate prompts

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes (for Gemini) | Google AI Studio API key |

---

## Default Values

The application ships with sensible defaults:

- **Mode**: Detailed
- **Engine**: Google Gemini
- **Model**: gemini-3-flash-preview
- **Default Prompt**: Analytics dashboard with dark theme

---

## Version History

### v1.2.0 (SMART_ARCHITECT)
- Added Simple Mode for natural language input
- Implemented clipboard image paste support
- Enhanced Hugging Face integration
- Added more model options for Gemini

### v1.1.0
- Multi-engine support (Gemini + Hugging Face)
- Settings modal with API key management
- Image upload functionality

### v1.0.0
- Initial release
- Detailed prompt generation
- Google Gemini integration

---

## License

MIT License

---

## Acknowledgments

- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Motion](https://www.motion.dev/)
- AI inference by [Google Gemini](https://gemini.google.com/) and [Hugging Face](https://huggingface.co/)
