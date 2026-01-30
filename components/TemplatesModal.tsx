import React from 'react';
import { TEMPLATES } from '../constants';
import { TemplateConfig } from '../types';
import { X, LayoutTemplate } from 'lucide-react';

interface TemplatesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (config: Partial<TemplateConfig>) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <LayoutTemplate className="text-blue-600" size={24} />
                            Choose a Template
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Select a starting point for your email.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Grid */}
                <div className="p-6 overflow-y-auto bg-gray-50/50 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TEMPLATES.map((template) => (
                            <div
                                key={template.name}
                                className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer relative"
                                onClick={() => {
                                    onSelect(template.config);
                                    onClose();
                                }}
                            >
                                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                                    <img
                                        src={template.thumbnail}
                                        alt={template.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                            Use Template
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-gray-100">
                                    <h3 className="font-semibold text-gray-800">{template.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
