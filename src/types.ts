export interface PromptInputs {
  mode: 'detailed' | 'simple';
  simplePrompt: string;
  role: string;
  reference: string;
  colors: string;
  typography: string;
  layout: string;
  visuals: string;
  threeJs: string;
  animations: string;
  responsiveness: string;
  forbidden: string;
  images: string[]; // Base64 strings
}

export interface AppSettings {
  engine: 'gemini' | 'huggingface';
  geminiModel: string;
  geminiApiKey: string;
  hfModel: string;
  hfApiKey: string;
}

export const initialInputs: PromptInputs = {
  mode: 'detailed',
  simplePrompt: "Create a master prompt for a high-performance analytics dashboard with a dark theme and real-time data visualization.",
  role: "Senior Frontend Engineer & UI Designer",
  reference: "A modern, high-performance SaaS dashboard with a focus on data density and clarity.",
  colors: "Deep charcoal (#121212), Electric Blue (#3B82F6), and Slate Gray (#64748B).",
  typography: "Inter for UI, JetBrains Mono for data values.",
  layout: "Bento-grid style layout with a fixed sidebar and collapsible widgets.",
  visuals: "Minimalist Lucide icons, 1.5px stroke width, subtle glassmorphism on cards.",
  threeJs: "Subtle 3D background using Three.js with a particle field and soft ambient lighting.",
  animations: "Framer Motion for page transitions and micro-interactions. No layout shifts.",
  responsiveness: "Fluid scaling from mobile to ultra-wide desktops.",
  forbidden: "Do not change the primary blue accent. Do not use generic gradients. Do not skip the hover states on the sidebar items.",
  images: []
};

export const initialSettings: AppSettings = {
  engine: 'gemini',
  geminiModel: 'gemini-3-flash-preview',
  geminiApiKey: '',
  hfModel: 'mistralai/Mistral-7B-Instruct-v0.3',
  hfApiKey: ''
};
