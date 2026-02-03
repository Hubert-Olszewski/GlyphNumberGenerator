import type { GlyphMap } from '../types/types';

type Props = {
  size: number;
  keys: number[];
  glyphs: GlyphMap;
  stroke?: string;
  strokeWidth?: number;
};

export const GlyphPreview = ({
  size,
  keys,
  glyphs,
  stroke = '#000000',
  strokeWidth = 10,
}: Props) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ background: 'white', border: '1px solid #e5e7eb' }}
  >
    {keys.map((key) => {
      const glyph = glyphs[key];
      if (!glyph) {
        return null;
      }

      return (
        <g key={key} data-glyph={key}>
          {glyph.strokes.map((strokePoints, idx) => (
            <polyline key={idx} points={strokePoints.map(([x, y]) => `${x},${y}`).join(' ')} />
          ))}
        </g>
      );
    })}
  </svg>
);
