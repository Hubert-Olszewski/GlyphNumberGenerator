import { useMemo, useState } from 'react';
import { validateInput, spreadGlyphsToKeys } from './utils/helpers';
import { glyphMap } from './utils/glyphMap';
import { GlyphPreview } from './components/GlyphPreview';
import { renderSVG } from './utils/renderSVG';
import { downloadSVG } from './utils/helpers';
import { VIEWBOX_SIZE } from './utils/constants';

export default function App() {
  const [rawVal, setRawVal] = useState('');

  const parsed = useMemo(() => validateInput(rawVal), [rawVal]);
  const keys = useMemo(() => {
    if (!parsed.value) {
      return [];
    }
    return spreadGlyphsToKeys(parsed.value);
  }, [parsed]);

  const canRender = parsed.value && keys.length > 0;

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>SVG symbol generator</h1>
      <p style={{ marginTop: 0, color: '#4b5563' }}>
        Enter a natural number
      </p>

      <label style={{ display: 'block', marginTop: 16 }}>
        Number
        <input
          value={rawVal}
          onChange={(e) => setRawVal(e.target.value)}
          inputMode='numeric'
          placeholder='np. 4723'
          style={{
            display: 'block',
            width: '100%',
            padding: '10px 12px',
            fontSize: 16,
            marginTop: 6,
          }}
        />
      </label>

      {!parsed.value && rawVal.trim().length > 0 && (
        <div style={{ color: '#b91c1c', marginTop: 8 }}>{parsed.error}</div>
      )}

      <div style={{ display: 'flex', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: 16 }}>Preview</h2>
          {canRender ? (
            <GlyphPreview size={VIEWBOX_SIZE} keys={keys} glyphs={glyphMap} />
          ) : (
            <div
              style={{
                width: VIEWBOX_SIZE,
                height: VIEWBOX_SIZE,
                border: '1px dashed #cbd5e1',
                display: 'grid',
                placeItems: 'center',
                color: '#64748b',
              }}
            >
              No preview
            </div>
          )}
          {canRender && (
            <div style={{ marginTop: 8, color: '#475569', fontSize: 12 }}>
              Layers: {keys.join(' + ')}
            </div>
          )}
        </div>

        <div style={{ minWidth: 260 }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: 16 }}>Options</h2>
          <button
            disabled={!canRender}
            onClick={() => {
              if (!parsed.value) {
                return;
              }

              const svg = renderSVG(keys, glyphMap, {
                size: VIEWBOX_SIZE,
                stroke: '#000000',
                strokeWidth: 10,
              });

              downloadSVG(svg, `symbol-${parsed.value}.svg`);
            }}
            style={{
              padding: '10px 12px',
              fontSize: 16,
              cursor: canRender ? 'pointer' : 'not-allowed',
            }}
          >
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}