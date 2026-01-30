import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface ExportModalProps {
  html: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ html, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">Export HTML</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <p className="text-sm text-blue-800">
            Copy the code below and paste it into your Elementor Form's <strong>Email</strong> tab (in the Message field). Ensure the "Is HTML?" toggle is active.
          </p>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <textarea 
            readOnly 
            value={html} 
            className="w-full h-full p-4 font-mono text-xs text-gray-700 bg-gray-50 resize-none outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            style={{ minHeight: '300px' }}
          />
          <button
            onClick={handleCopy}
            className={`absolute top-4 right-6 flex items-center gap-2 px-4 py-2 rounded shadow-lg transition-all text-sm font-medium ${
              copied ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy HTML</>}
          </button>
        </div>
      </div>
    </div>
  );
};