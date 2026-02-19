import React, { useState, useEffect } from 'react';
import { Controls } from './components/Controls.tsx';
import { Preview } from './components/Preview.tsx';
import { ExportModal } from './components/ExportModal.tsx';
import { TemplatesModal } from './components/TemplatesModal.tsx';
import { INITIAL_CONFIG, THANK_YOU_INITIAL_CONFIG, TemplateConfig } from './types.ts';
import { generateEmailHtml } from './utils/htmlGenerator.ts';
import { Code, Eye, RefreshCw, Smartphone, Monitor, Download, Upload, LayoutTemplate, Mail, MessageSquare } from 'lucide-react';

const STORAGE_KEY = 'elementor_email_builder_v2';

type Configs = {
  service: TemplateConfig;
  thank_you: TemplateConfig;
};

type Tab = 'service' | 'thank_you';

export default function App() {
  // Initialize state from local storage or default
  const [configs, setConfigs] = useState<Configs>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure thanks_you fields are always synced with service fields on load
        if (parsed.service && parsed.thank_you) {
          parsed.thank_you.fields = parsed.service.fields;
        }
        return parsed;
      }
      // Migration attempt from v1
      const savedV1 = localStorage.getItem('elementor_email_builder_v1');
      if (savedV1) {
        return {
          service: { ...INITIAL_CONFIG, ...JSON.parse(savedV1) },
          thank_you: THANK_YOU_INITIAL_CONFIG
        };
      }
    } catch (e) {
      console.warn('Failed to load from local storage', e);
    }
    return {
      service: INITIAL_CONFIG,
      thank_you: THANK_YOU_INITIAL_CONFIG
    };
  });

  const [activeTab, setActiveTab] = useState<Tab>('service');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const currentConfig = configs[activeTab];

  const updateCurrentConfig = (newConfig: TemplateConfig | ((prev: TemplateConfig) => TemplateConfig)) => {
    setConfigs(prev => {
      const current = prev[activeTab];
      const updated = typeof newConfig === 'function' ? newConfig(current) : newConfig;

      const newConfigs = {
        ...prev,
        [activeTab]: updated
      };

      // Automatically sync fields from 'service' to 'thank_you' if functionality
      if (activeTab === 'service' && updated.fields !== current.fields) {
        newConfigs.thank_you = {
          ...prev.thank_you,
          fields: updated.fields
        };
      }

      return newConfigs;
    });
  };

  // Persist to local storage whenever config changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
    } catch (e) {
      console.warn('Failed to save to local storage', e);
    }
  }, [configs]);

  const handleExport = () => {
    const html = generateEmailHtml(currentConfig);
    setGeneratedHtml(html);
    setIsExportOpen(true);
  };

  const handleReset = () => {
    if (window.confirm(`Are you sure you want to reset the ${activeTab === 'service' ? 'Service Request' : 'Thank You Email'} template to default settings?`)) {
      updateCurrentConfig(activeTab === 'service' ? INITIAL_CONFIG : THANK_YOU_INITIAL_CONFIG);
    }
  };

  const handleSaveJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentConfig, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${activeTab}-template-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleLoadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = e => {
        if (e.target?.result) {
          try {
            const parsed = JSON.parse(e.target.result as string);
            // Merge with appropriate initial config to ensure all fields exist
            const baseConfig = activeTab === 'service' ? INITIAL_CONFIG : THANK_YOU_INITIAL_CONFIG;
            updateCurrentConfig({ ...baseConfig, ...parsed });
          } catch (error) {
            alert('Invalid JSON file');
          }
        }
      };
    }
  };

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden font-sans">

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center">
        <h1 className="font-bold text-gray-800">Email Builder</h1>
        <button onClick={handleExport} className="text-blue-600 font-medium text-sm">Export</button>
      </div>

      {/* Left Panel: Controls */}
      <div className="w-full md:w-[400px] flex-shrink-0 h-[60vh] md:h-screen z-20 overflow-hidden relative border-r bg-white flex flex-col">

        {/* Header & Tabs */}
        <div className="bg-white z-10 sticky top-0 border-b">
          <div className="h-16 flex items-center px-6 justify-between border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">E</div>
              <span className="font-bold text-gray-800 tracking-tight">Elementor Email</span>
            </div>

            {/* Actions Toolbar */}
            <div className="flex items-center gap-2">
              <button onClick={() => setIsTemplatesOpen(true)} className="text-gray-400 hover:text-blue-600 transition-colors" title="Choose Template">
                <LayoutTemplate size={18} />
              </button>
              <div className="h-4 w-px bg-gray-200 mx-1"></div>
              <button onClick={handleSaveJson} className="text-gray-400 hover:text-blue-600 transition-colors" title="Save Project">
                <Download size={18} />
              </button>
              <label className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer" title="Load Project">
                <Upload size={18} />
                <input type="file" accept=".json" onChange={handleLoadJson} className="hidden" />
              </label>
              <button onClick={handleReset} className="text-gray-400 hover:text-red-500 transition-colors" title="Reset to Defaults">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex bg-gray-50 border-b">
            <button
              onClick={() => setActiveTab('service')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'service'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              <MessageSquare size={16} />
              Service Request
            </button>
            <div className="w-px bg-gray-200"></div>
            <button
              onClick={() => setActiveTab('thank_you')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'thank_you'
                ? 'border-green-600 text-green-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              <Mail size={16} />
              Thank You Email
            </button>
          </div>
        </div>

        {/* Scrollable Controls */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <Controls config={currentConfig} onChange={updateCurrentConfig} />
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="flex-1 relative flex flex-col h-full bg-gray-100">

        {/* Toolbar */}
        <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <Eye size={16} />
            <span>Preview: <span className="font-semibold text-gray-800">{activeTab === 'service' ? 'Service Request' : 'Thank You Email'}</span></span>
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            <div className="flex bg-gray-100 rounded p-1 border border-gray-200">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-1.5 rounded transition-all ${viewMode === 'desktop' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="Desktop View"
              >
                <Monitor size={16} />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded transition-all ${viewMode === 'mobile' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                title="Mobile View"
              >
                <Smartphone size={16} />
              </button>
            </div>
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
        <div className="flex-1 overflow-hidden relative bg-gray-100 flex justify-center pt-8">
          <div className={`transition-all duration-300 h-full overflow-hidden shadow-2xl ${viewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-[800px]'}`}>
            <Preview config={currentConfig} />
          </div>
        </div>

      </div>

      {/* Export Modal */}
      <ExportModal
        html={generatedHtml}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelect={(newConfig) => updateCurrentConfig({ ...currentConfig, ...newConfig })}
      />

    </div >
  );
}