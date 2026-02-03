type Props = {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  error?: string;
};

export const NumberField = ({
  label = 'Number',
  value,
  onChange,
  placeholder = 'e.g. 4723',
  error,
}: Props) => (
  <label style={{ display: 'block', marginTop: 16 }}>
    {label}
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputMode="numeric"
      placeholder={placeholder}
      style={{
        display: 'block',
        width: '100%',
        padding: '10px 12px',
        fontSize: 16,
        marginTop: 6,
      }}
    />
    {error && <div style={{ color: '#b91c1c', marginTop: 8 }}>{error}</div>}
  </label>
);
