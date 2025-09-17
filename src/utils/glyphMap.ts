import type { Glyph, GlyphMap, Point } from "../types/types";
import { VIEWBOX_SIZE } from "./constants";

const TARGET_ANCHOR_X = VIEWBOX_SIZE / 2;

const ORIGINAL_ANCHOR_STROKE: readonly [Point, Point] = [
  [TARGET_ANCHOR_X, 45],
  [TARGET_ANCHOR_X, 165],
] as const;

const AXIS_Y =
  (ORIGINAL_ANCHOR_STROKE[0][1] + ORIGINAL_ANCHOR_STROKE[1][1]) / 2;

const mirrorXPoint = ([x, y]: Point): Point =>
  [2 * TARGET_ANCHOR_X - x, y] as const;

const mirrorYPoint = ([x, y]: Point): Point =>
  [x, 2 * AXIS_Y - y] as const;

const mapGlyph = (
  g: Glyph,
  fn: (p: Point) => Point
): Glyph => {
  const [first, ...rest] = g.strokes;
  return { strokes: [first, ...rest.map((stroke) => stroke.map(fn))] };
};

const mirrorXGlyph = (g: Glyph): Glyph =>
  mapGlyph(g, mirrorXPoint);

const mirrorYGlyph = (g: Glyph): Glyph =>
  mapGlyph(g, mirrorYPoint);

const buildTens = (ones: Record<number, Glyph>): Record<number, Glyph> =>{
  const out: Record<number, Glyph> = {};
  for (let i = 1; i <= 9; i++) {
    out[i * 10] = mirrorXGlyph(ones[i]);
  }
  return out;
}

const buildHundreds = (
  ones: Record<number, Glyph>
): Record<number, Glyph> => {
  const out: Record<number, Glyph> = {};
  for (let i = 1; i <= 9; i++) {
    out[i * 100] = mirrorYGlyph(ones[i]);
  }
  return out;
}

const buildThousands = (
  hundreds: Record<number, Glyph>
): Record<number, Glyph> => {
  const out: Record<number, Glyph> = {};
  for (let i = 1; i <= 9; i++) {
    out[i * 1000] = mirrorXGlyph(hundreds[i * 100]);
  }
  return out;
}

const ones: Record<number, Glyph> = {
  1: {
    strokes: [
      [
        ...ORIGINAL_ANCHOR_STROKE
      ],
      [
        [100, 45],
        [155, 45],
      ],
    ],
  },

  2: {
    strokes: [
      [
        ...ORIGINAL_ANCHOR_STROKE
      ],
      [
        [100, 70],
        [140, 70],
      ],
    ],
  },

  3: {
    strokes: [
      [
        ...ORIGINAL_ANCHOR_STROKE
      ],
      [
        [100, 45],
        [140, 80],
      ],
    ],
  },

  4: {
    strokes: [
      [
        ...ORIGINAL_ANCHOR_STROKE
      ],
      [
        [100, 85],
        [145, 45],
      ],
    ],
  },

  5: {
    strokes: [
      [
        ...ORIGINAL_ANCHOR_STROKE
      ],
      [
        [100, 85],
        [145, 45],
      ],
      [
        [100, 45],
        [145, 45],
      ],
    ],
  },

  6: {
    strokes: [
      [
        ...ORIGINAL_ANCHOR_STROKE
      ],
      [
        [150, 80],
        [150, 45],
      ],
    ],
  },

  7: {
    strokes: [
      [
        ...ORIGINAL_ANCHOR_STROKE
      ],
      [
        [150, 80],
        [150, 45],
      ],
      [
        [100, 45],
        [150, 45],
      ],
    ],
  },

  8: {
    strokes: [
      [
        ...ORIGINAL_ANCHOR_STROKE
      ],
      [
        [150, 80],
        [150, 45],
      ],
      [
        [150, 80],
        [100, 80],
      ],
    ],
  },

  9: {
    strokes: [
      [
        ...ORIGINAL_ANCHOR_STROKE
      ],
      [
        [150, 80],
        [150, 45],
      ],
      [
        [150, 80],
        [100, 80],
      ],
      [
        [100, 45],
        [150, 45],
      ],
    ],
  },
};

const tens = buildTens(ones);
const hundreds = buildHundreds(ones);
const thousands = buildThousands(hundreds);

export const glyphMap: GlyphMap = {
  ...ones,
  ...tens,
  ...hundreds,
  ...thousands,
};