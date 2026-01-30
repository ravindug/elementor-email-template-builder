export interface Field {
  id: string;
  label: string;
  shortcode: string;
}

export interface TemplateConfig {
  logoUrl: string;
  logoWidth: string;
  title: string;
  
  // Layout
  density: 'compact' | 'normal' | 'spacious';

  // Call to Action
  cta: {
    enabled: boolean;
    text: string;
    url: string;
    bgColor: string;
    textColor: string;
  };

  // Colors
  bodyBgColor: string;
  cardBgColor: string;
  textColor: string;
  headerColor: string;
  borderColor: string;
  accentColor: string; // Used for alternating rows usually
  
  // Typography
  fontFamily: string;
  
  // Content
  footerText: string;
  
  // The Fields
  fields: Field[];
}

export const INITIAL_FIELDS: Field[] = [
  { id: '1', label: 'Full Name', shortcode: '[field id="f_name"]' },
  { id: '2', label: 'Phone', shortcode: '[field id="phone"]' },
  { id: '3', label: 'Email', shortcode: '[field id="email"]' },
  { id: '4', label: 'Service Type', shortcode: '[field id="service_type"]' },
  { id: '5', label: 'Message', shortcode: '[field id="message"]' },
];

export const INITIAL_CONFIG: TemplateConfig = {
  logoUrl: 'https://indigo-echidna-621194.hostingersite.com/wp-content/uploads/2026/01/Krystal-cleaning-Inc-Logo-2048x374.webp',
  logoWidth: '150',
  title: 'New Service Request',
  density: 'normal',
  cta: {
    enabled: false,
    text: 'View Request',
    url: '#',
    bgColor: '#111827',
    textColor: '#ffffff',
  },
  bodyBgColor: '#f4f6f8',
  cardBgColor: '#ffffff',
  textColor: '#374151',
  headerColor: '#111827',
  borderColor: '#e5e7eb',
  accentColor: '#f9fafb',
  fontFamily: 'Arial, Helvetica, sans-serif',
  footerText: 'Submitted via your website service form.',
  fields: INITIAL_FIELDS,
};