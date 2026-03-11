// SVG illustration of a factory with conveyor belts, workers, and machinery
const FactoryIllustration = () => (
  <svg viewBox="0 0 500 320" style={{ width: '100%', maxWidth: 500 }}>
    {/* Background blob */}
    <ellipse cx="240" cy="230" rx="220" ry="90" fill="#dde8f7" opacity="0.5" />

    {/* Conveyor belt */}
    <rect x="100" y="230" width="300" height="18" rx="9" fill="#b0bfd8" />
    <circle cx="120" cy="239" r="12" fill="#8a9bbf" />
    <circle cx="380" cy="239" r="12" fill="#8a9bbf" />

    {/* Gear dots on belt */}
    {[155, 195, 235, 275, 315, 355].map((x, i) => (
      <g key={i} transform={`translate(${x},239)`}>
        <circle r="8" fill="#f5821f" opacity="0.8" />
        <circle r="4" fill="#fff" />
      </g>
    ))}

    {/* Boxes on belt */}
    {[130, 175, 220, 265, 310].map((x, i) => (
      <g key={i}>
        <rect x={x} y={205} width={28} height={24} rx="3" fill="#f5821f" opacity={0.75 + i * 0.04} />
        <line x1={x} y1={217} x2={x + 28} y2={217} stroke="#fff" strokeWidth="1" opacity="0.5" />
        <line x1={x + 14} y1={205} x2={x + 14} y2={229} stroke="#fff" strokeWidth="1" opacity="0.5" />
      </g>
    ))}

    {/* Machinery box left */}
    <rect x="50" y="140" width="85" height="90" rx="5" fill="#c8d5e8" />
    <rect x="58" y="150" width="30" height="20" rx="2" fill="#8a9bbf" />
    <rect x="58" y="178" width="65" height="8" rx="2" fill="#9bacc8" />
    <rect x="58" y="192" width="50" height="8" rx="2" fill="#9bacc8" />

    {/* Worker figure */}
    <circle cx="195" cy="140" r="14" fill="#f5821f" />
    <rect x="183" y="154" width="24" height="40" rx="5" fill="#f5821f" />
    <rect x="178" y="154" width="10" height="28" rx="4" fill="#f5821f" />
    <rect x="207" y="154" width="10" height="28" rx="4" fill="#f5821f" />
    <rect x="185" y="194" width="10" height="20" rx="4" fill="#2d3a6b" />
    <rect x="199" y="194" width="10" height="20" rx="4" fill="#2d3a6b" />

    {/* Hard hat */}
    <ellipse cx="195" cy="130" rx="17" ry="8" fill="#f5821f" />
    <rect x="180" y="128" width="30" height="5" rx="2" fill="#f5821f" />

    {/* Clipboard */}
    <rect x="205" y="163" width="16" height="20" rx="2" fill="#fff" />
    <line x1="208" y1="168" x2="218" y2="168" stroke="#aaa" strokeWidth="1.5" />
    <line x1="208" y1="173" x2="218" y2="173" stroke="#aaa" strokeWidth="1.5" />

    {/* Large machine center */}
    <rect x="270" y="120" width="60" height="110" rx="5" fill="#b8c8e0" />
    <rect x="280" y="130" width="20" height="30" rx="3" fill="#8a9bbf" />
    <circle cx="300" cy="185" r="12" fill="#f5821f" opacity="0.8" />
    <rect x="278" y="200" width="44" height="8" rx="2" fill="#9bacc8" />

    {/* Potted plant */}
    <rect x="80" y="215" width="6" height="20" fill="#5d8a5e" rx="3" />
    <ellipse cx="83" cy="210" rx="12" ry="9" fill="#5d8a5e" />
    <ellipse cx="75" cy="214" rx="8" ry="6" fill="#4a7a4b" />
  </svg>
);

export default FactoryIllustration;
