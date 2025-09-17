import type { ParsedNumber } from "../types/types";

export const validateInput = (raw: string): ParsedNumber => {
  const trimmed = raw.trim();

  if (trimmed.length === 0) {
    return { error: 'Type number' }
  }

  if (!/^\d+$/.test(trimmed)) {
    return { error: 'Only digits 0-9 are allowed' }
  }

  const n = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(n)) {
    return { error: 'Wrong number' }
  }

  if (n <= 0) {
    return { error: 'The number must be greater than zero' }
  }

  if (n > 9999) {
    return { error: 'Max value is 9999' }
  }

  return {
    value: n 
  }
}

export const spreadGlyphsToKeys = (n: number): number[] => {
  const t = Math.floor(n / 1000) * 1000;
  const h = Math.floor((n % 1000) / 100) * 100;
  const d = Math.floor((n % 100) / 10) * 10;
  const u = n % 10;

  return [t, h, d, u].filter((x) => x !== 0);
}

export const downloadSVG = (svg: string, filename: string) => {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}