import { glyphMap } from '../utils/glyphMap';
import { renderSVG } from '../utils/renderSVG';
import { downloadSVG } from '../utils/helpers';
import { VIEWBOX_SIZE } from '../utils/constants';

type Props = {
  canRender: boolean;
  value?: number;
  keys: number[];
};

const onClickHandle = (value: number, keys: number[]) => {
  const svg = renderSVG(keys, glyphMap, {
    size: VIEWBOX_SIZE,
    stroke: '#000000',
    strokeWidth: 10,
  });

  downloadSVG(svg, `symbol-${value}.svg`);
};

export const OptionsPanel = ({ canRender, value, keys }: Props) => (
  <div style={{ minWidth: 260 }}>
    <h2 style={{ margin: '0 0 8px 0', fontSize: 16 }}>Options</h2>

    <button
      disabled={!canRender}
      onClick={() => value && onClickHandle(value, keys)}
      style={{
        padding: '10px 12px',
        fontSize: 16,
        cursor: canRender ? 'pointer' : 'not-allowed',
      }}
    >
      Download SVG
    </button>
  </div>
);
