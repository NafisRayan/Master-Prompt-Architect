import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Type, 
  Layout, 
  Zap, 
  Box, 
  Smartphone, 
  Ban, 
  CheckCircle2, 
  Copy, 
  RefreshCw,
  Sparkles,
  ExternalLink,
  Github,
  Settings as SettingsIcon,
  Image as ImageIcon,
  X,
  Plus,
  ChevronDown,
  Info
} from 'lucide-react';
import { PromptInputs, initialInputs, AppSettings, initialSettings } from './types';
import { generateMasterPrompt, generateWithHuggingFace } from './services/ai';

export default function App() {
  const [inputs, setInputs] = useState<PromptInputs>(initialInputs);
  const [settings, setSettings] = useState<AppSettings>(initialSettings);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (key: keyof PromptInputs, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setInputs(prev => ({
            ...prev,
            images: [...prev.images, reader.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setInputs(prev => ({
              ...prev,
              images: [...prev.images, reader.result as string]
            }));
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const removeImage = (index: number) => {
    setInputs(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      let result = '';
      if (settings.engine === 'huggingface') {
        if (!settings.hfApiKey) {
          alert('Please provide a Hugging Face API Key in Settings');
          setShowSettings(true);
          setIsGenerating(false);
          return;
        }
        result = await generateWithHuggingFace(inputs, settings);
      } else {
        if (!settings.geminiApiKey) {
          alert('Please provide a Gemini API Key in Settings');
          setShowSettings(true);
          setIsGenerating(false);
          return;
        }
        result = await generateMasterPrompt(inputs, settings);
      }
      setGeneratedPrompt(result);
    } catch (error) {
      console.error(error);
      alert('Generation failed. Check console for details.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E4E4E4] font-sans selection:bg-blue-500/30" onPaste={handlePaste}>
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Terminal size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tighter uppercase">Master Prompt Architect</h1>
            <p className="text-[10px] text-white/40 font-mono">v1.2.0 // SMART_ARCHITECT</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
            <button 
              onClick={() => handleInputChange('mode', 'detailed')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${inputs.mode === 'detailed' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              DETAILED
            </button>
            <button 
              onClick={() => handleInputChange('mode', 'simple')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${inputs.mode === 'simple' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              SIMPLE
            </button>
          </div>
          <button 
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
          >
            <SettingsIcon size={18} />
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 min-h-[calc(100vh-65px)]">
        {/* Left Column: Inputs */}
        <section className="bg-[#0A0A0A] p-8 overflow-y-auto max-h-[calc(100vh-65px)] custom-scrollbar">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono text-blue-500 uppercase tracking-[0.2em]">
                {inputs.mode === 'detailed' ? '01. Detailed Configuration' : '01. Simple Architect'}
              </h2>
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
                <Info size={10} />
                <span>PASTE IMAGES ANYWHERE</span>
              </div>
            </div>

            <div className="grid gap-6">
              {/* Image Upload Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon size={14} className="text-blue-500 opacity-50" />
                  <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Reference Screenshots</label>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {inputs.images.map((img, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative aspect-video bg-white/5 rounded border border-white/10 overflow-hidden group"
                    >
                      <img src={img} alt={`Ref ${idx}`} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                      >
                        <X size={10} />
                      </button>
                    </motion.div>
                  ))}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video bg-white/[0.02] border border-dashed border-white/10 rounded flex flex-col items-center justify-center gap-1 hover:bg-white/5 hover:border-blue-500/50 transition-all text-white/20 hover:text-blue-500"
                  >
                    <Plus size={16} />
                    <span className="text-[8px] font-mono uppercase">Add Image</span>
                  </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              {inputs.mode === 'simple' ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                    <p className="text-[10px] text-blue-400 font-mono leading-relaxed">
                      In Simple Mode, the Architect will infer all engineering details (Design System, Layout, etc.) from your request while maintaining the rigorous framework.
                    </p>
                  </div>
                  <InputGroup 
                    icon={<Sparkles size={14} />}
                    label="What are you building?"
                    value={inputs.simplePrompt}
                    onChange={(v) => handleInputChange('simplePrompt', v)}
                    placeholder="Describe your project in simple terms..."
                    rows={8}
                  />
                </div>
              ) : (
                <>
                  <InputGroup 
                    icon={<Cpu size={14} />}
                    label="Act / Role"
                    value={inputs.role}
                    onChange={(v) => handleInputChange('role', v)}
                    placeholder="e.g. Senior Frontend Engineer"
                  />
                  <InputGroup 
                    icon={<Layers size={14} />}
                    label="Reference"
                    value={inputs.reference}
                    onChange={(v) => handleInputChange('reference', v)}
                    placeholder="Describe the source of truth..."
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup 
                      icon={<Zap size={14} />}
                      label="Colors / Design System"
                      value={inputs.colors}
                      onChange={(v) => handleInputChange('colors', v)}
                    />
                    <InputGroup 
                      icon={<Type size={14} />}
                      label="Typography"
                      value={inputs.typography}
                      onChange={(v) => handleInputChange('typography', v)}
                    />
                  </div>
                  <InputGroup 
                    icon={<Layout size={14} />}
                    label="Layout & Structure"
                    value={inputs.layout}
                    onChange={(v) => handleInputChange('layout', v)}
                  />
                  <InputGroup 
                    icon={<Sparkles size={14} />}
                    label="Visual Elements"
                    value={inputs.visuals}
                    onChange={(v) => handleInputChange('visuals', v)}
                  />
                  <InputGroup 
                    icon={<Box size={14} />}
                    label="3D Elements (Optional)"
                    value={inputs.threeJs}
                    onChange={(v) => handleInputChange('threeJs', v)}
                  />
                  <InputGroup 
                    icon={<RefreshCw size={14} />}
                    label="Animation & Motion"
                    value={inputs.animations}
                    onChange={(v) => handleInputChange('animations', v)}
                  />
                  <InputGroup 
                    icon={<Smartphone size={14} />}
                    label="Responsiveness"
                    value={inputs.responsiveness}
                    onChange={(v) => handleInputChange('responsiveness', v)}
                  />
                  <InputGroup 
                    icon={<Ban size={14} />}
                    label="Forbidden Actions"
                    value={inputs.forbidden}
                    onChange={(v) => handleInputChange('forbidden', v)}
                    variant="danger"
                  />
                </>
              )}
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            >
              {isGenerating ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                <Sparkles size={18} className="group-hover:scale-110 transition-transform" />
              )}
              <span className="uppercase tracking-widest text-xs">Architect Master Prompt</span>
            </button>
          </div>
        </section>

        {/* Right Column: Preview */}
        <section className="bg-[#0D0D0D] p-8 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">02. Output Preview</h2>
            {generatedPrompt && (
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-[10px] font-mono text-white/60 hover:text-white transition-colors"
              >
                {copySuccess ? <CheckCircle2 size={12} className="text-green-500" /> : <Copy size={12} />}
                {copySuccess ? 'COPIED' : 'COPY MARKDOWN'}
              </button>
            )}
          </div>

          <div className="flex-1 bg-black/40 border border-white/5 rounded-lg p-6 overflow-y-auto custom-scrollbar font-mono text-sm leading-relaxed relative">
            {!generatedPrompt && !isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/10 text-center p-12">
                <Terminal size={48} className="mb-4 opacity-20" />
                <p className="text-xs uppercase tracking-widest">Awaiting configuration inputs...</p>
                <p className="text-[10px] mt-2 max-w-[200px]">Fill the parameters on the left and click generate to build your master prompt.</p>
              </div>
            )}

            {isGenerating && (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-white/5 rounded w-3/4"></div>
                <div className="h-4 bg-white/5 rounded w-1/2"></div>
                <div className="h-4 bg-white/5 rounded w-5/6"></div>
                <div className="h-4 bg-white/5 rounded w-2/3"></div>
                <div className="h-32 bg-white/5 rounded w-full"></div>
                <div className="h-4 bg-white/5 rounded w-3/4"></div>
              </div>
            )}

            {generatedPrompt && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="whitespace-pre-wrap text-white/80"
              >
                {generatedPrompt}
              </motion.div>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex gap-4">
              <a href="#" className="text-[10px] font-mono text-white/20 hover:text-white/60 transition-colors flex items-center gap-1">
                <Github size={10} /> REPOSITORY
              </a>
              <a href="#" className="text-[10px] font-mono text-white/20 hover:text-white/60 transition-colors flex items-center gap-1">
                <ExternalLink size={10} /> DOCUMENTATION
              </a>
            </div>
            <p className="text-[9px] font-mono text-white/10 uppercase tracking-tighter">
              Engine: <span className="text-blue-500/50">{settings.engine.toUpperCase()}</span> // Model: <span className="text-white/30">{settings.engine === 'gemini' ? settings.geminiModel : settings.hfModel.split('/').pop()}</span> // API: <span className={settings.engine === 'gemini' ? (settings.geminiApiKey ? 'text-green-500/50' : 'text-red-500/50') : (settings.hfApiKey ? 'text-green-500/50' : 'text-red-500/50')}>{settings.engine === 'gemini' ? (settings.geminiApiKey ? 'SET' : 'MISSING') : (settings.hfApiKey ? 'SET' : 'MISSING')}</span>
            </p>
          </div>
        </section>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SettingsIcon size={16} className="text-blue-500" />
                  <h3 className="text-xs font-bold uppercase tracking-widest">System Settings</h3>
                </div>
                <button onClick={() => setShowSettings(false)} className="text-white/40 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Engine Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase text-white/40">AI Engine</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setSettings(s => ({ ...s, engine: 'gemini' }))}
                      className={`py-2 rounded border text-[10px] font-bold transition-all ${settings.engine === 'gemini' ? 'bg-blue-600/10 border-blue-600 text-blue-500' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}
                    >
                      GOOGLE GEMINI
                    </button>
                    <button 
                      onClick={() => setSettings(s => ({ ...s, engine: 'huggingface' }))}
                      className={`py-2 rounded border text-[10px] font-bold transition-all ${settings.engine === 'huggingface' ? 'bg-orange-600/10 border-orange-600 text-orange-500' : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'}`}
                    >
                      HUGGING FACE
                    </button>
                  </div>
                </div>

                {/* Model Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase text-white/40">
                    {settings.engine === 'gemini' ? 'Gemini Model' : 'HF Model Path'}
                  </label>
                  {settings.engine === 'gemini' ? (
                    <div className="relative">
                      <select 
                        value={settings.geminiModel}
                        onChange={(e) => setSettings(s => ({ ...s, geminiModel: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs font-mono appearance-none focus:outline-none focus:border-blue-500/50"
                      >
                        <option value="gemini-3-flash-preview">Gemini 3 Flash (Fast)</option>
                        <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Advanced)</option>
                        <option value="gemini-3.1-flash-lite-preview">Gemini 3.1 Flash Lite</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                    </div>
                  ) : (
                    <input 
                      type="text"
                      value={settings.hfModel}
                      onChange={(e) => setSettings(s => ({ ...s, hfModel: e.target.value }))}
                      placeholder="e.g. mistralai/Mistral-7B-Instruct-v0.3"
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-orange-500/50"
                    />
                  )}
                </div>

                {/* Gemini API Key */}
                {settings.engine === 'gemini' && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono uppercase text-white/40">Gemini API Key</label>
                    <input 
                      type="password"
                      value={settings.geminiApiKey}
                      onChange={(e) => setSettings(s => ({ ...s, geminiApiKey: e.target.value }))}
                      placeholder="Enter your Gemini API key..."
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-blue-500/50"
                    />
                    <p className="text-[9px] text-white/20 leading-tight">
                      Get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google AI Studio</a>
                    </p>
                  </div>
                )}

                {/* Hugging Face API Key */}
                {settings.engine === 'huggingface' && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono uppercase text-white/40">HF API Key</label>
                    <input 
                      type="password"
                      value={settings.hfApiKey}
                      onChange={(e) => setSettings(s => ({ ...s, hfApiKey: e.target.value }))}
                      placeholder="hf_..."
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-orange-500/50"
                    />
                    <p className="text-[9px] text-white/20 leading-tight">
                      Get your API key from <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Hugging Face</a>
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white/[0.02] border-t border-white/5">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded text-[10px] uppercase tracking-widest transition-all"
                >
                  Save Configuration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        select option {
          background: #111;
          color: #fff;
        }
      `}} />
    </div>
  );
}

function InputGroup({ 
  icon, 
  label, 
  value, 
  onChange, 
  placeholder, 
  variant = 'default',
  rows = 2
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  onChange: (v: string) => void; 
  placeholder?: string;
  variant?: 'default' | 'danger';
  rows?: number;
}) {
  return (
    <div className="space-y-2 group">
      <div className="flex items-center gap-2">
        <span className={`${variant === 'danger' ? 'text-red-500' : 'text-blue-500'} opacity-50 group-focus-within:opacity-100 transition-opacity`}>
          {icon}
        </span>
        <label className="text-[10px] font-mono uppercase tracking-wider text-white/40 group-focus-within:text-white/80 transition-colors">
          {label}
        </label>
      </div>
      <textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full bg-white/[0.02] border ${variant === 'danger' ? 'border-red-500/20 focus:border-red-500/50' : 'border-white/10 focus:border-blue-500/50'} rounded p-3 text-xs font-mono focus:outline-none transition-all resize-none custom-scrollbar`}
      />
    </div>
  );
}
