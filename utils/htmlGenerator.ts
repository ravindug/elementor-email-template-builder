import { TemplateConfig } from '../types.ts';

const getPadding = (density: string) => {
  switch (density) {
    case 'compact': return '8px 4px';
    case 'spacious': return '20px 12px';
    default: return '12px 8px'; // normal
  }
};

export const generateEmailHtml = (config: TemplateConfig): string => {
  const padding = getPadding(config.density);

  const rows = config.fields.map((field, index) => {
    const isEven = index % 2 !== 0; 
    const bgStyle = isEven ? `background-color:${config.accentColor};` : '';
    
    return `
      <tr style="${bgStyle}">
        <td style="padding:${padding};font-weight:600;width:40%;color:${config.textColor};border-bottom:1px solid ${config.borderColor};vertical-align:top;">${field.label}</td>
        <td style="padding:${padding};color:${config.textColor};border-bottom:1px solid ${config.borderColor};vertical-align:top;">${field.shortcode}</td>
      </tr>`;
  }).join('');

  const ctaHtml = config.cta.enabled ? `
    <!-- CTA Button -->
    <div style="text-align:center;margin-top:32px;margin-bottom:24px;">
      <a href="${config.cta.url}" style="background-color:${config.cta.bgColor};color:${config.cta.textColor};display:inline-block;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;">${config.cta.text}</a>
    </div>
  ` : '';

  return `
<div style="width:100%;font-family:${config.fontFamily};background-color:${config.bodyBgColor};padding:40px 0;margin:0;">
  <div style="max-width:600px;margin:0 auto;padding:16px;">
    
    <!-- Logo -->
    <div style="text-align:center;margin-bottom:24px;">
      <img src="${config.logoUrl}" alt="Logo" style="max-width:${config.logoWidth}px;width:100%;height:auto;display:block;margin:0 auto;">
    </div>

    <!-- Card -->
    <div style="background-color:${config.cardBgColor};border-radius:8px;padding:32px;border:1px solid ${config.borderColor};box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
      <h2 style="margin:0 0 24px 0;font-size:24px;font-weight:bold;color:${config.headerColor};text-align:center;">
        ${config.title}
      </h2>

      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:${config.textColor};border-collapse:collapse;width:100%;">
        <tbody>
          ${rows}
        </tbody>
      </table>

      ${ctaHtml}

      <p style="margin-top:24px;font-size:12px;color:#6b7280;text-align:center;line-height:1.5;">
        ${config.footerText}
      </p>

    </div>
    
    <!-- Footer Branding (Optional) -->
    <div style="text-align:center;margin-top:16px;font-size:10px;color:#9ca3af;">
      &copy; ${new Date().getFullYear()} ${config.title}
    </div>
  </div>
</div>
`;
};