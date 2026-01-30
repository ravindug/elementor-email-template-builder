import React from 'react';
import { TemplateConfig } from '../types.ts';

interface PreviewProps {
  config: TemplateConfig;
}

export const Preview: React.FC<PreviewProps> = ({ config }) => {
  
  const getPadding = (density: string) => {
    switch (density) {
      case 'compact': return '8px 4px';
      case 'spacious': return '20px 12px';
      default: return '12px 8px'; // normal
    }
  };
  
  const padding = getPadding(config.density || 'normal'); // fallback

  return (
    <div className="w-full h-full bg-gray-200 overflow-y-auto py-8 px-4 flex justify-center items-start">
      <div 
        className="w-full max-w-[600px] shadow-2xl transition-all duration-300"
        style={{ fontFamily: config.fontFamily }}
      >
        {/* Email Body Wrapper */}
        <div style={{ backgroundColor: config.bodyBgColor, padding: '40px 16px', minHeight: '600px' }}>
          
          {/* Logo Area */}
          <div className="text-center mb-6">
            <img 
              src={config.logoUrl} 
              alt="Logo" 
              style={{ width: `${config.logoWidth}px` }}
              className="mx-auto h-auto"
            />
          </div>

          {/* Card */}
          <div 
            style={{ 
              backgroundColor: config.cardBgColor, 
              borderColor: config.borderColor,
              borderRadius: '8px'
            }}
            className="p-8 border shadow-sm"
          >
            <h2 
              style={{ color: config.headerColor }}
              className="m-0 mb-6 text-2xl font-bold text-center"
            >
              {config.title}
            </h2>

            <table className="w-full border-collapse text-sm" style={{ color: config.textColor }}>
              <tbody>
                {config.fields.map((field, index) => {
                  // Logic for alternating row colors
                  const isEven = index % 2 !== 0; // Visual index logic
                  const bgStyle = isEven ? { backgroundColor: config.accentColor } : {};
                  
                  return (
                    <tr key={field.id} style={bgStyle}>
                      <td 
                        className="font-semibold w-[40%] align-top" 
                        style={{ borderBottom: `1px solid ${config.borderColor}`, padding }}
                      >
                        {field.label}
                      </td>
                      <td 
                        className="align-top"
                        style={{ borderBottom: `1px solid ${config.borderColor}`, padding }}
                      >
                        {field.shortcode}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* CTA Button Preview */}
            {config.cta.enabled && (
              <div className="text-center mt-8 mb-6">
                <a 
                  href={config.cta.url}
                  onClick={(e) => e.preventDefault()} // Prevent navigation in preview
                  className="inline-block px-8 py-3.5 rounded-md font-bold text-base transition-opacity hover:opacity-90"
                  style={{ 
                    backgroundColor: config.cta.bgColor, 
                    color: config.cta.textColor,
                    textDecoration: 'none'
                  }}
                >
                  {config.cta.text}
                </a>
              </div>
            )}

            <p className="mt-6 text-xs text-center leading-relaxed" style={{ color: '#6b7280' }}>
              {config.footerText}
            </p>

          </div>
          
          <div className="text-center mt-4 text-[10px] text-gray-400">
             (Preview Mode)
          </div>

        </div>
      </div>
    </div>
  );
};