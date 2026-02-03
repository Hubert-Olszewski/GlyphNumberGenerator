import { NumberField } from './components/NumberField';
import { OptionsPanel } from './components/OptionsPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { useGlyphInput } from './hooks/useGlyphInput';

export default function App() {
  const { rawVal, setRawVal, parsed, keys, canRender } = useGlyphInput();

  const showError = !parsed.value && rawVal.trim().length > 0;
  const error = showError ? parsed.error : undefined;

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 16 }}>
      <h1 style={{ marginBottom: 8 }}>SVG symbol generator</h1>
      <p style={{ marginTop: 0, color: '#4b5563' }}>Enter a natural number</p>

      <NumberField
        value={rawVal}
        onChange={setRawVal}
        placeholder="e.g. 4723"
        error={error}
      />

      <div style={{ display: 'flex', gap: 24, marginTop: 24, flexWrap: 'wrap' }}>
        <PreviewPanel canRender={canRender} keys={keys} />
        <OptionsPanel canRender={canRender} value={parsed.value} keys={keys} />
      </div>
    </div>
  );
}