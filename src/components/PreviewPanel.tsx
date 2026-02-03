import { GlyphPreview } from './GlyphPreview';
import { glyphMap } from '../utils/glyphMap';
import { VIEWBOX_SIZE } from '../utils/constants';

type Props = {
  canRender: boolean;
  keys: number[];
};

export const PreviewPanel = ({ canRender, keys }: Props) => (
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
      <div style={{ marginTop: 8, color: '#475569', fontSize: 12 }}>Layers: {keys.join(' + ')}</div>
    )}
  </div>
);
