import React, { useState, useEffect } from 'react';
import { Controls } from './components/Controls.tsx';
import { Preview } from './components/Preview.tsx';
import { ExportModal } from './components/ExportModal.tsx';
import { INITIAL_CONFIG, TemplateConfig } from './types.ts';
import { generateEmailHtml } from './utils/htmlGenerator.ts';
import { Code, Eye, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'elementor_email_builder_v1';

export default function App() {
  // Initialize state from local storage or default
  const [config, setConfig] = useState<TemplateConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_CONFIG, ...JSON.parse(saved) }; 
      }
    } catch (e) {
      console.warn('Failed to load from local storage', e);
    }
    return INITIAL_CONFIG;
  });

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState('');

  // Persist to local storage whenever config changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to save to local storage', e);
    }
  }, [config]);

  const handleExport = () => {
    const html = generateEmailHtml(config);
    setGeneratedHtml(html);
    setIsExportOpen(true);
  };

  const handleReset = () => {
    if(window.confirm('Are you sure you want to reset to default settings? This will clear your custom presets and fields.')) {
      setConfig(INITIAL_CONFIG);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden">
      
      {/* Mobile Header (only visible on small screens) */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center">
        <h1 className="font-bold text-gray-800">Email Builder</h1>
        <button onClick={handleExport} className="text-blue-600 font-medium text-sm">Export</button>
      </div>

      {/* Left Panel: Controls */}
      <div className="w-full md:w-[400px] flex-shrink-0 h-[60vh] md:h-screen z-20 overflow-hidden relative border-r bg-white">
        <div className="h-16 border-b flex items-center px-6 justify-between bg-white sticky top-0 z-10">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">E</div>
              <span className="font-bold text-gray-800 tracking-tight">Elementor Email</span>
           </div>
           <button onClick={handleReset} className="text-gray-400 hover:text-red-500 transition-colors" title="Reset to Defaults">
             <RefreshCw size={18} />
           </button>
        </div>
        <div className="h-[calc(100vh-64px)] overflow-hidden">
          <Controls config={config} onChange={setConfig} />
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="flex-1 relative flex flex-col h-full bg-gray-100">
        
        {/* Toolbar */}
        <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
             <Eye size={16} />
             <span>Live Preview</span>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Code size={18} />
            Get HTML Code
          </button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-hidden relative">
          <Preview config={config} />
        </div>

      </div>

      {/* Export Modal */}
      <ExportModal 
        html={generatedHtml} 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
      />
      
    </div>
  );
}