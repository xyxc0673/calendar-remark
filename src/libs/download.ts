export const downloadFromBase64 = (base64: string, filename: string) => {
  const link = document.createElement('a');
  link.href = base64;
  link.download = filename;

  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false,
  });

  link.dispatchEvent(event);
};
