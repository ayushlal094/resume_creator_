/**
 * Accepts a DOM element directly (not an ID string) to avoid
 * the duplicate-id bug when multiple templates exist in the DOM.
 */

export const downloadResumePDF = async (element, filename = 'resume') => {
  if (!element) throw new Error('Resume preview element is null');

  const html2pdf = (await import('html2pdf.js')).default;

  const opt = {
    margin: [0, 0, 0, 0],
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, allowTaint: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  return html2pdf().set(opt).from(element).save();
};

export const getResumePDFBlob = async (element) => {
  if (!element) throw new Error('Resume preview element is null');

  const html2pdf = (await import('html2pdf.js')).default;

  const opt = {
    margin: [0, 0, 0, 0],
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  return html2pdf().set(opt).from(element).outputPdf('blob');
};