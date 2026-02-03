import { describe, expect, it } from 'vitest';
import { renderSVG } from '../../utils/renderSVG';
import { glyphMap } from '../../utils/glyphMap';

function countOccurrences(haystack: string, needle: string) {
  return haystack.split(needle).length - 1;
}

describe('renderSVG', () => {
  it('renders valid svg wrapper', () => {
    const svg = renderSVG([1], glyphMap, {
      size: 200,
      stroke: '#000',
      strokeWidth: 10,
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('viewBox="0 0 200 200"');
    expect(svg).toContain('stroke="#000"');
  });

  it('renders all strokes for given keys', () => {
    const keys = [1000, 900, 90, 2];

    const expectedStrokeCount = keys.reduce((sum, key) => {
      const glyph = glyphMap[key];
      if (!glyph) throw new Error(`Missing glyph in test for key=${key}`);
      return sum + glyph.strokes.length;
    }, 0);

    const svg = renderSVG(keys, glyphMap, {
      size: 200,
      stroke: '#000',
      strokeWidth: 10,
    });

    const polylineCount = countOccurrences(svg, '<polyline');
    const pathCount = countOccurrences(svg, '<path');

    expect(polylineCount + pathCount).toBeGreaterThan(0);
    expect(polylineCount + pathCount).toBe(expectedStrokeCount);
  });
});
