/**
 * PDF generation service using html2pdf.js
 * Exports the live resume preview as a high-quality PDF
 */

export const downloadResumePDF = async (elementId = 'resume-preview', filename = 'resume') => {
  // Dynamic import to keep bundle size manageable
  const html2pdf = (await import('html2pdf.js')).default;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Resume preview element not found');
  }

  const opt = {
    margin: [0, 0, 0, 0],
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      letterRendering: true,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  return html2pdf().set(opt).from(element).save();
};

export const getResumePDFBlob = async (elementId = 'resume-preview') => {
  const html2pdf = (await import('html2pdf.js')).default;

  const element = document.getElementById(elementId);
  if (!element) throw new Error('Resume preview element not found');

  const opt = {
    margin: [0, 0, 0, 0],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  return html2pdf().set(opt).from(element).outputPdf('blob');
};
