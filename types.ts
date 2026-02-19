export interface Field {
  id: string;
  label: string;
  shortcode: string;
}

export type SocialPlatform = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'website';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
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
  description: string;
  footerText: string;

  // The Fields
  fields: Field[];

  // Social Media
  socialLinks: SocialLink[];
}

export const INITIAL_FIELDS: Field[] = [
  { id: '1', label: 'Full Name', shortcode: '[field id="f_name"]' },
  { id: '2', label: 'Phone', shortcode: '[field id="phone"]' },
  { id: '3', label: 'Email', shortcode: '[field id="email"]' },
  { id: '4', label: 'Service Type', shortcode: '[field id="service_type"]' },
  { id: '5', label: 'Message', shortcode: '[field id="message"]' },
];

export const INITIAL_CONFIG: TemplateConfig = {
  logoUrl: '', // Reset to empty as per user request
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
  description: 'Thank you for contacting us. We have received your service request and will get back to you shortly.',
  footerText: 'Submitted via your website service form.',
  fields: INITIAL_FIELDS,
  socialLinks: [],
};

export const THANK_YOU_INITIAL_CONFIG: TemplateConfig = {
  logoUrl: '', // Reset to empty as per user request
  logoWidth: '150',
  title: 'Thank You for Your Order!',
  density: 'normal',
  cta: {
    enabled: true,
    text: 'Visit Website',
    url: 'https://example.com',
    bgColor: '#15803d',
    textColor: '#ffffff',
  },
  bodyBgColor: '#f0fdf4',
  cardBgColor: '#ffffff',
  textColor: '#374151',
  headerColor: '#15803d',
  borderColor: '#e5e7eb',
  accentColor: '#f0fdf4',
  fontFamily: 'Arial, Helvetica, sans-serif',
  description: 'We have received your order and are processing it. Below are the details:',
  footerText: 'We appreciate your business. If you have any feedback, please reply to this email.',
  fields: INITIAL_FIELDS,
  socialLinks: [],
};