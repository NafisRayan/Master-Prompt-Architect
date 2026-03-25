import { GoogleGenAI } from "@google/genai";
import { PromptInputs, AppSettings } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateMasterPrompt(inputs: PromptInputs, settings: AppSettings) {
  const model = settings.geminiModel || "gemini-3-flash-preview";
  
  const systemInstruction = `You are a Master Prompt Engineer. Your task is to take user inputs (text and images) and construct a "Master Prompt" following a specific structural framework.
  
  THE FRAMEWORK:
  ## Act
  [Role definition, production-grade focus, visual correctness priority]
  
  ## Reference
  [Source of truth definition, intentionality assumption]
  
  ## Design System
  [Extraction of colors, typography, spacing, consistency rules]
  
  ## Layout and Structure
  [Exact rebuilding instructions, proportions, alignment]
  
  ## Typography
  [Font family rules, alternatives]
  
  ## Visual Elements
  [SVG usage, stroke thickness, opacity]
  
  ## 3D Elements (if applicable)
  [Three.js concepts, shaders, lighting]
  
  ## Animation and Motion
  [Purposeful motion, Framer Motion/GSAP rules, layout shift prevention]
  
  ## Responsiveness
  [Device adaptation vs redesign]
  
  ## Code Quality
  [Production-ready, clean components, no placeholders]
  
  ## Forbidden Actions
  [What NOT to do: no redesigns, no color changes, no skipping details]
  
  ## Final
  [Self-review criteria, delivery standards]
  
  USER INPUTS:
  ${inputs.mode === 'simple' ? `Simple Request: ${inputs.simplePrompt}` : `
  Role: ${inputs.role}
  Reference: ${inputs.reference}
  Colors: ${inputs.colors}
  Typography: ${inputs.typography}
  Layout: ${inputs.layout}
  Visuals: ${inputs.visuals}
  3D: ${inputs.threeJs}
  Animations: ${inputs.animations}
  Responsiveness: ${inputs.responsiveness}
  Forbidden: ${inputs.forbidden}
  `}
  
  OUTPUT FORMAT:
  Return the final Master Prompt in Markdown format. Be extremely detailed and professional. Use the exact headers provided in the framework. If in 'simple' mode, you must infer the details for each section based on the simple request while maintaining the engineering-first tone.`;

  const parts: any[] = [{ text: inputs.mode === 'simple' ? `Generate a Master Prompt based on this simple request: ${inputs.simplePrompt}` : "Generate the Master Prompt based on the provided detailed inputs and images." }];
  
  // Add images if present
  if (inputs.images && inputs.images.length > 0) {
    inputs.images.forEach((base64, index) => {
      const data = base64.split(',')[1];
      const mimeType = base64.split(';')[0].split(':')[1];
      parts.push({
        inlineData: {
          data,
          mimeType
        }
      });
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts },
    config: {
      systemInstruction,
    },
  });

  return response.text;
}

export async function generateWithHuggingFace(inputs: PromptInputs, settings: AppSettings) {
  if (!settings.hfApiKey) throw new Error("Hugging Face API Key is required");

  const model = settings.hfModel || "mistralai/Mistral-7B-Instruct-v0.3";
  
  const prompt = inputs.mode === 'simple' ? `Simple Request: ${inputs.simplePrompt}. Generate a Master Prompt based on this request following the engineering-first framework.` : `
    Act: ${inputs.role}
    Reference: ${inputs.reference}
    Design System: Colors: ${inputs.colors}, Typography: ${inputs.typography}
    Layout: ${inputs.layout}
    Visuals: ${inputs.visuals}
    3D: ${inputs.threeJs}
    Animations: ${inputs.animations}
    Responsiveness: ${inputs.responsiveness}
    Forbidden: ${inputs.forbidden}
    Note: Images were provided but HF Inference API text models cannot see them. Construct based on text descriptions.
  `;

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      headers: { Authorization: `Bearer ${settings.hfApiKey}`, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        inputs: `<s>[INST] You are a Master Prompt Engineer. Construct a high-fidelity system prompt following the specified framework (Act, Reference, Design System, etc.) based on these requirements: ${prompt} [/INST]`,
        parameters: { max_new_tokens: 2000, temperature: 0.7 },
      }),
    }
  );

  const result = await response.json();
  if (result.error) throw new Error(result.error);
  
  const text = Array.isArray(result) ? result[0].generated_text : result.generated_text;
  return text.split('[/INST]')[1]?.trim() || text;
}
