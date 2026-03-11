import colors from '../../constants/colors';

const Dropdown = ({ id, label, value, options, onChange, width = 140, disabled = false }) => (
  <div style={{ position: 'relative', width }}>
    <select
      id={id}
      value={value}
      disabled={disabled}
      aria-label={!id ? label : undefined}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '7px 34px 7px 12px',
        border: '1px solid #ccc',
        borderRadius: 5,
        background: '#fff',
        color: value ? colors.textDark : '#999',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 13,
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
      }}
    >
      {!options.includes(label) && (
        <option value="" disabled>
          {label}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#999',
        fontSize: 10,
        pointerEvents: 'none',
      }}
    >
      ▼
    </span>
  </div>
);

export default Dropdown;
