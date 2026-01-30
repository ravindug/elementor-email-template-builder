import React, { useState } from 'react';
import { TemplateConfig } from '../types.ts';
import { FieldManager } from './FieldManager.tsx';
import { Palette, Type, Layout, Settings, Rows, Zap, MousePointerClick } from 'lucide-react';

interface ControlsProps {
  config: TemplateConfig;
  onChange: (newConfig: TemplateConfig) => void;
}

const PRESETS = [
  {
    name: 'Default',
    colors: {
      bodyBgColor: '#f4f6f8',
      cardBgColor: '#ffffff',
      textColor: '#374151',
      headerColor: '#111827',
      borderColor: '#e5e7eb',
      accentColor: '#f9fafb',
    },
    font: 'Arial, Helvetica, sans-serif'
  },
  {
    name: 'Corporate',
    colors: {
      bodyBgColor: '#eff6ff', // blue-50
      cardBgColor: '#ffffff',
      textColor: '#1e293b', // slate-800
      headerColor: '#1e3a8a', // blue-900
      borderColor: '#cbd5e1', // slate-300
      accentColor: '#f8fafc', // slate-50
    },
    font: "'Open Sans', sans-serif"
  },
  {
    name: 'Dark Mode',
    colors: {
      bodyBgColor: '#111827', // gray-900
      cardBgColor: '#1f2937', // gray-800
      textColor: '#e5e7eb', // gray-200
      headerColor: '#f3f4f6', // gray-100
      borderColor: '#374151', // gray-700
      accentColor: '#374151', // gray-700
    },
    font: "'Roboto', sans-serif"
  },
  {
    name: 'Minimal',
    colors: {
      bodyBgColor: '#ffffff',
      cardBgColor: '#ffffff',
      textColor: '#333333',
      headerColor: '#000000',
      borderColor: '#e5e5e5',
      accentColor: '#ffffff',
    },
    font: "Helvetica, sans-serif"
  }
];

const ColorInput = ({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) => {
  const isValidHex = (val: string) => /^#[0-9A-F]{6}$/i.test(val);

  return (
    <div className="flex items-center justify-between mb-3">
      <label className="text-xs text-gray-600 font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-24 text-xs border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none font-mono uppercase"
          placeholder="#000000"
        />
        <div className="relative w-8 h-8 rounded border border-gray-200 overflow-hidden shrink-0 shadow-sm">
           <input 
             type="color" 
             value={isValidHex(value) ? value : '#000000'} 
             onChange={(e) => onChange(e.target.value)} 
             className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer p-0 border-0"
           />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, label, icon: Icon, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex-1 py-3 flex flex-col items-center gap-1 text-[10px] font-medium transition-colors border-b-2 ${
      active ? 'text-blue-600 border-blue-600 bg-blue-50/50' : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

export const Controls: React.FC<ControlsProps> = ({ config, onChange }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'fields'>('content');

  const update = (key: keyof TemplateConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };
  
  const updateCta = (key: string, value: any) => {
    onChange({ ...config, cta: { ...config.cta, [key]: value } });
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
     onChange({
       ...config,
       ...preset.colors,
       fontFamily: preset.font
     });
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 shadow-xl z-10 w-full max-w-[400px]">
      
      <div className="flex border-b border-gray-200">
        <TabButton active={activeTab === 'content'} label="Content" icon={Layout} onClick={() => setActiveTab('content')} />
        <TabButton active={activeTab === 'fields'} label="Fields" icon={Settings} onClick={() => setActiveTab('fields')} />
        <TabButton active={activeTab === 'design'} label="Design" icon={Palette} onClick={() => setActiveTab('design')} />
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Title</label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => update('title', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter email title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
              <input
                type="text"
                value={config.logoUrl}
                onChange={(e) => update('logoUrl', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none mb-2"
                placeholder="https://..."
              />
              <div className="flex gap-2 items-center">
                 <label className="text-xs text-gray-500">Width (px):</label>
                 <input
                    type="number"
                    value={config.logoWidth}
                    onChange={(e) => update('logoWidth', e.target.value)}
                    className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
              </div>
            </div>
            
            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                 <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2">
                   <MousePointerClick size={12} />
                   Call to Action
                 </h3>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={config.cta.enabled} onChange={(e) => updateCta('enabled', e.target.checked)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                 </label>
              </div>
              
              {config.cta.enabled && (
                <div className="space-y-3">
                   <div>
                      <label className="text-xs text-gray-600 block mb-1">Button Text</label>
                      <input 
                        type="text" 
                        value={config.cta.text} 
                        onChange={(e) => updateCta('text', e.target.value)} 
                        className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Button Text"
                      />
                   </div>
                   <div>
                      <label className="text-xs text-gray-600 block mb-1">URL</label>
                      <input 
                        type="text" 
                        value={config.cta.url} 
                        onChange={(e) => updateCta('url', e.target.value)} 
                        className="w-full text-sm border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://"
                      />
                   </div>
                   <ColorInput label="Button Color" value={config.cta.bgColor} onChange={(v) => updateCta('bgColor', v)} />
                   <ColorInput label="Text Color" value={config.cta.textColor} onChange={(v) => updateCta('textColor', v)} />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
              <textarea
                value={config.footerText}
                onChange={(e) => update('footerText', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter footer text"
              />
            </div>
          </div>
        )}

        {activeTab === 'fields' && (
          <FieldManager 
            fields={config.fields} 
            setFields={(newFields) => update('fields', newFields)} 
          />
        )}

        {activeTab === 'design' && (
          <div className="space-y-6">
            
            <div className="bg-purple-50/50 p-4 rounded-lg border border-purple-100">
               <h3 className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                 <Zap size={12} />
                 Quick Presets
               </h3>
               <div className="grid grid-cols-2 gap-2">
                 {PRESETS.map((p) => (
                   <button 
                     key={p.name}
                     onClick={() => applyPreset(p)}
                     className="px-3 py-2 text-xs font-medium bg-white border border-gray-200 rounded hover:border-purple-300 hover:text-purple-700 transition-all text-left text-gray-800"
                   >
                     {p.name}
                   </button>
                 ))}
               </div>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
               <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                 <Rows size={12} />
                 Layout
               </h3>
               <div>
                  <label className="text-xs text-gray-600 font-medium block mb-1">Table Density</label>
                  <div className="flex bg-white rounded-md border border-gray-200 p-1">
                    {['compact', 'normal', 'spacious'].map((d) => (
                      <button
                        key={d}
                        onClick={() => update('density', d)}
                        className={`flex-1 text-xs py-1.5 rounded capitalize transition-all ${
                          config.density === d 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                 <Palette size={12} />
                 Colors
               </h3>
               <div className="space-y-1">
                 <ColorInput label="Background" value={config.bodyBgColor} onChange={(v) => update('bodyBgColor', v)} />
                 <ColorInput label="Card Background" value={config.cardBgColor} onChange={(v) => update('cardBgColor', v)} />
                 <ColorInput label="Text Color" value={config.textColor} onChange={(v) => update('textColor', v)} />
                 <ColorInput label="Header Color" value={config.headerColor} onChange={(v) => update('headerColor', v)} />
                 <ColorInput label="Borders" value={config.borderColor} onChange={(v) => update('borderColor', v)} />
                 <ColorInput label="Alternating Row" value={config.accentColor} onChange={(v) => update('accentColor', v)} />
               </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Type size={14} />
                Font Family
              </label>
              <select
                value={config.fontFamily}
                onChange={(e) => update('fontFamily', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900"
              >
                <option value="Arial, Helvetica, sans-serif">Arial / Helvetica</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="'Times New Roman', Times, serif">Times New Roman</option>
                <option value="'Courier New', Courier, monospace">Courier New</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Verdana, Geneva, sans-serif">Verdana</option>
                <option value="Tahoma, sans-serif">Tahoma</option>
                <option value="system-ui, -apple-system, sans-serif">System UI</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};