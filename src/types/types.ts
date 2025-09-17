export type Point = readonly [number, number];

export type Glyph = {
  strokes: Point[][];
};

export type GlyphMap = Record<number, Glyph>;

export type ParsedNumber = { value?: number, error?: string };