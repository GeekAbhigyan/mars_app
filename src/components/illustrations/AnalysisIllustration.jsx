// SVG illustration of data analysis — charts, people, and report cards
const AnalysisIllustration = () => (
  <svg viewBox="0 0 400 320" style={{ width: '100%', maxWidth: 460 }}>
    {/* Background ellipse */}
    <ellipse cx="200" cy="200" rx="180" ry="110" fill="#e8ecf8" opacity="0.6" />

    {/* Report card */}
    <rect x="120" y="60" width="170" height="190" rx="10" fill="#fff" stroke="#c8d0ea" strokeWidth="1.5" />
    <rect x="135" y="80" width="100" height="8" rx="4" fill="#c8d0ea" />
    <rect x="135" y="96" width="80" height="8" rx="4" fill="#e0e4f0" />

    {/* Bar chart */}
    {[110, 130, 95, 145, 120].map((h, i) => (
      <rect
        key={i}
        x={138 + i * 25}
        y={170 - h / 2.2}
        width="16"
        height={h / 2.2}
        rx="3"
        fill={i === 3 ? '#6c63ff' : '#b8c4ea'}
      />
    ))}
    <line x1="135" y1="170" x2="275" y2="170" stroke="#e0e4f0" strokeWidth="1" />

    {/* Line chart */}
    <polyline
      points="135,185 160,178 185,182 210,172 235,176 260,168 275,170"
      fill="none"
      stroke="#6c63ff"
      strokeWidth="2"
    />

    {/* Chat bubble left */}
    <rect x="60" y="75" width="50" height="30" rx="8" fill="#fff" stroke="#c8d0ea" strokeWidth="1.5" />
    <polygon points="75,105 85,105 80,113" fill="#fff" stroke="#c8d0ea" strokeWidth="1" />
    <circle cx="75" cy="89" r="5" fill="#e0e4f0" />
    <polyline points="71,96 80,96" stroke="#e0e4f0" strokeWidth="1.5" />

    {/* Chat bubble right */}
    <rect x="295" y="65" width="50" height="30" rx="8" fill="#fff" stroke="#c8d0ea" strokeWidth="1.5" />
    <polygon points="310,95 320,95 315,103" fill="#fff" stroke="#c8d0ea" strokeWidth="1" />
    <circle cx="320" cy="79" r="5" fill="#f5e6cc" />

    {/* Person 1 — magnifying glass */}
    <circle cx="115" cy="190" r="14" fill="#f5d9b0" />
    <rect x="103" y="204" width="24" height="42" rx="5" fill="#f5821f" />
    <rect x="96" y="205" width="11" height="30" rx="4" fill="#f5821f" />
    <rect x="117" y="205" width="11" height="30" rx="4" fill="#f5821f" />
    <rect x="105" y="246" width="10" height="22" rx="4" fill="#2d3a6b" />
    <rect x="119" y="246" width="10" height="22" rx="4" fill="#2d3a6b" />
    <circle cx="99" cy="200" r="11" fill="none" stroke="#2d3a6b" strokeWidth="2.5" />
    <line x1="107" y1="208" x2="115" y2="216" stroke="#2d3a6b" strokeWidth="2.5" />

    {/* Person 2 — tablet */}
    <circle cx="295" cy="188" r="14" fill="#c8a882" />
    <rect x="283" y="202" width="24" height="42" rx="5" fill="#2d3a6b" />
    <rect x="274" y="202" width="11" height="30" rx="4" fill="#2d3a6b" />
    <rect x="296" y="202" width="11" height="30" rx="4" fill="#2d3a6b" />
    <rect x="285" y="244" width="10" height="22" rx="4" fill="#2d3a6b" />
    <rect x="299" y="244" width="10" height="22" rx="4" fill="#2d3a6b" />
    <rect x="300" y="208" width="22" height="28" rx="3" fill="#fff" stroke="#aaa" strokeWidth="1.5" />
    <rect x="303" y="212" width="16" height="12" rx="1" fill="#e8ecf8" />
  </svg>
);

export default AnalysisIllustration;
