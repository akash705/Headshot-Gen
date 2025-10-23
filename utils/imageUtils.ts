
// utils/imageUtils.ts
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const base64ToBytes = (base64: string): Uint8Array => {
  const binaryString = atob(base64.split(',')[1]); // Remove data URI prefix
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const getMimeTypeFromBase64 = (base64: string): string => {
  const match = base64.match(/^data:(.*?);base64,/);
  return match ? match[1] : 'application/octet-stream';
};
