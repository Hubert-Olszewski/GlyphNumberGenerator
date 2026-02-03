import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { spreadGlyphsToKeys, validateInput } from '../../utils/helpers';
import { downloadSVG } from '../../utils/helpers';

describe('validateInput', () => {
  it('rejects empty input', () => {
    expect(validateInput('')).toEqual(expect.objectContaining({ error: 'Type number' }));
  });

  it('rejects non-numeric input', () => {
    expect(validateInput('12a')).toEqual(
      expect.objectContaining({ error: 'Only digits 0-9 are allowed' }),
    );
  });

  it('rejects 0', () => {
    expect(validateInput('0')).toEqual(
      expect.objectContaining({ error: 'The number must be greater than zero' }),
    );
  });

  it('rejects negative numbers', () => {
    expect(validateInput('-1')).toEqual(
      expect.objectContaining({ error: 'Only digits 0-9 are allowed' }),
    );
  });

  it('accepts (1, 9999)', () => {
    expect(validateInput('1')).toEqual(expect.objectContaining({ value: 1 }));
    expect(validateInput('9999')).toEqual(expect.objectContaining({ value: 9999 }));
  });

  it('rejects > 9999', () => {
    expect(validateInput('10000')).toEqual(expect.objectContaining({ error: 'Max value is 9999' }));
  });

  it('parses leading zeros', () => {
    expect(validateInput('0071')).toEqual(expect.objectContaining({ value: 71 }));
  });
});

describe('spreadGlyphsToKeys', () => {
  it('spreads number into positional glyph keys', () => {
    expect(spreadGlyphsToKeys(1)).toEqual([1]);
    expect(spreadGlyphsToKeys(71)).toEqual([70, 1]);
    expect(spreadGlyphsToKeys(105)).toEqual([100, 5]);
    expect(spreadGlyphsToKeys(1992)).toEqual([1000, 900, 90, 2]);
    expect(spreadGlyphsToKeys(9999)).toEqual([9000, 900, 90, 9]);
  });

  it('does not include zeros', () => {
    expect(spreadGlyphsToKeys(1000)).toEqual([1000]);
    expect(spreadGlyphsToKeys(1010)).toEqual([1000, 10]);
    expect(spreadGlyphsToKeys(1100)).toEqual([1000, 100]);
  });
});

describe('downloadSVG', () => {
  const origCreateObjectURL = URL.createObjectURL;
  const origRevokeObjectURL = URL.revokeObjectURL;

  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:mock');
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    URL.createObjectURL = origCreateObjectURL;
    URL.revokeObjectURL = origRevokeObjectURL;
    vi.restoreAllMocks();
  });

  it('creates an object url and triggers download', () => {
    const click = vi.fn();

    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockImplementation((tagName: string) => {
        const el = document.createElementNS('http://www.w3.org/1999/xhtml', tagName);

        if (tagName === 'a') {
          (el as HTMLAnchorElement).click = click;
        }

        return el;
      });

    const appendSpy = vi.spyOn(document.body, 'appendChild');

    downloadSVG('<svg />', 'symbol-1.svg');

    const a = appendSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(a.download).toBe('symbol-1.svg');
    expect(a.href).toBe('blob:mock');

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(appendSpy).toHaveBeenCalledTimes(1);
    expect(click).toHaveBeenCalledTimes(1);
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1);
  });
});
