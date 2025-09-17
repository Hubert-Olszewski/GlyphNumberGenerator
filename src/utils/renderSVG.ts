import type { GlyphMap } from '../types/types';

type RenderOptions = {
  size: number;
  stroke: string;
  strokeWidth: number;
};

const polylinePoints = (points: readonly (readonly [number, number])[]): string => 
  points.map(([x, y]) => `${x},${y}`).join(" ");

export const renderSVG = (
  keys: number[],
  glyphs: GlyphMap,
  opts: RenderOptions
): string => {
  const { size, stroke, strokeWidth } = opts;
  const polylines: string[] = [];
  
  for (const key of keys) {
    const glyph = glyphs[key];
    if (!glyph) {
      throw new Error(`No glyph for: ${key}`);
    }

    glyph.strokes.forEach((strokePoints) => {
      polylines.push(
        `<polyline points="${polylinePoints(strokePoints)}" />`
      );
    });
}

return `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg"
      width="${size}" height="${size}"
      viewBox="0 0 ${size} ${size}"
      fill="none"
      stroke="${stroke}"
      stroke-width="${strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round">
    ${polylines.join("\n  ")}
  </svg>
`;
}