import { TemplateConfig, INITIAL_FIELDS } from './types';

export const PRESETS = [
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

export const TEMPLATES: { name: string; thumbnail: string; config: Partial<TemplateConfig> }[] = [
    {
        name: 'Service Request (Default)',
        thumbnail: 'https://placehold.co/400x300/e2e8f0/64748b?text=Service',
        config: {
            // This effectively resets to default, handled by logic
        }
    },
    {
        name: 'Welcome Email',
        thumbnail: 'https://placehold.co/400x300/dbeafe/1e40af?text=Welcome',
        config: {
            title: 'Welcome to Our Community!',
            bodyBgColor: '#f0fdf4', // green-50
            headerColor: '#166534', // green-800
            cta: {
                enabled: true,
                text: 'Get Started',
                url: 'https://example.com/start',
                bgColor: '#166534',
                textColor: '#ffffff'
            },
            footerText: 'We are glad to have you with us. If you have questions, reply to this email.',
            fields: [
                { id: '1', label: 'Member Name', shortcode: '[field id="name"]' },
                { id: '2', label: 'Membership ID', shortcode: '[field id="member_id"]' },
            ]
        }
    },
    {
        name: 'Monthly Newsletter',
        thumbnail: 'https://placehold.co/400x300/f3e8ff/6b21a8?text=News',
        config: {
            title: 'January Updates',
            bodyBgColor: '#faf5ff', // purple-50
            headerColor: '#6b21a8', // purple-800
            accentColor: '#f3e8ff',
            cta: {
                enabled: true,
                text: 'Read More',
                url: 'https://example.com/news',
                bgColor: '#6b21a8',
                textColor: '#ffffff'
            },
            footerText: 'You are receiving this because you subscribed to our newsletter.',
            fields: [
                { id: '1', label: 'Top Story', shortcode: 'Community Event Su...' },
                { id: '2', label: 'New Features', shortcode: 'We added dark mo...' },
            ]
        }
    },
    {
        name: 'Invoice / Receipt',
        thumbnail: 'https://placehold.co/400x300/fef2f2/991b1b?text=Invoice',
        config: {
            title: 'Invoice #1023',
            bodyBgColor: '#fef2f2', // red-50
            headerColor: '#991b1b', // red-800
            cta: {
                enabled: true,
                text: 'Pay Now',
                url: 'https://example.com/pay',
                bgColor: '#991b1b',
                textColor: '#ffffff'
            },
            footerText: 'Thank you for your business. Payment is due within 7 days.',
            fields: [
                { id: '1', label: 'Service', shortcode: 'Web Design' },
                { id: '2', label: 'Amount', shortcode: '$500.00' },
                { id: '3', label: 'Due Date', shortcode: 'Jan 31, 2026' },
            ]
        }
    },
    {
        name: 'Form Receipt',
        thumbnail: 'https://placehold.co/400x300/ecfdf5/047857?text=Received',
        config: {
            title: 'Submission Received',
            bodyBgColor: '#ecfdf5', // emerald-50
            headerColor: '#047857', // emerald-700
            cta: {
                enabled: true,
                text: 'View Status',
                url: 'https://example.com/status',
                bgColor: '#047857',
                textColor: '#ffffff'
            },
            footerText: 'We usually reply within 24 hours. For urgent matters, please call support.',
            fields: [
                { id: '1', label: 'Name', shortcode: '[field id="name"]' },
                { id: '2', label: 'Email', shortcode: '[field id="email"]' },
                { id: '3', label: 'Inquiry Type', shortcode: 'Support' },
                { id: '4', label: 'Message', shortcode: 'I need help with...' },
            ]
        }
    },
    {
        name: 'Thank You Email',
        thumbnail: 'https://placehold.co/400x300/f0fdf4/15803d?text=Thank+You',
        config: {
            title: 'Thank You for Your Order!',
            bodyBgColor: '#f0fdf4', // green-50
            headerColor: '#15803d', // green-700
            cta: {
                enabled: true,
                text: 'Visit Website',
                url: 'https://example.com',
                bgColor: '#15803d',
                textColor: '#ffffff'
            },
            footerText: 'We appreciate your business. If you have any feedback, please reply to this email.',
            fields: [
                { id: '1', label: 'Order ID', shortcode: '#123456' },
                { id: '2', label: 'Date', shortcode: 'Feb 19, 2026' },
                { id: '3', label: 'Total', shortcode: '$150.00' },
            ]
        }
    }
];
