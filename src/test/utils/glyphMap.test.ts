import { describe, expect, it } from 'vitest';
import { glyphMap } from '../../utils/glyphMap';

const ANCHOR = [
  [100, 45],
  [100, 165],
];

describe('glyphMap', () => {
  it('keeps strokes[0] constant for all glyphs', () => {
    for (const [key, glyph] of Object.entries(glyphMap)) {
      expect(glyph.strokes[0]).toEqual(ANCHOR);
      expect(key).toBeDefined();
    }
  });

  it('creates tens as mirrorX of ones around anchor line', () => {
    const one = glyphMap[1];
    const ten = glyphMap[10];

    expect(one.strokes[1]).toEqual([
      [100, 45],
      [155, 45],
    ]);
    expect(ten.strokes[1]).toEqual([
      [100, 45],
      [45, 45],
    ]);
  });

  it('creates hundreds as mirrorY of ones', () => {
    const two = glyphMap[2];
    const twoHundred = glyphMap[200];

    expect(two.strokes[1]).toEqual([
      [100, 70],
      [140, 70],
    ]);

    expect(twoHundred.strokes[1]).toEqual([
      [100, 140],
      [140, 140],
    ]);
  });

  it('creates thousands as mirrorX of hundreds', () => {
    const hundred = glyphMap[100];
    const thousand = glyphMap[1000];

    expect(hundred.strokes[1]).toEqual([
      [100, 165],
      [155, 165],
    ]);
    expect(thousand.strokes[1]).toEqual([
      [100, 165],
      [45, 165],
    ]);
  });
});
