import colors from '../../constants/colors';

const TopHeader = ({ onLogout }) => (
  <header
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      height: 56,
      borderBottom: '1px solid #e8e8e8',
      background: colors.white,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
      <span style={{ fontWeight: 800, fontSize: 20, color: colors.marsBlueDark, letterSpacing: 1 }}>
        MARS
      </span>
      <span style={{ fontWeight: 500, fontSize: 13, color: colors.marsOrange }}>Snacking</span>
    </div>

    <div style={{ fontWeight: 700, fontSize: 17, color: colors.marsBlueDark }}>
      Operations Planning
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 12, color: '#555' }}>
        <strong>Last Refresh:</strong> 11/17/2025
      </span>
      <button
        type="button"
        aria-label="Help"
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#555' }}
      >
        ?
      </button>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#e0e4f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <button
        type="button"
        onClick={onLogout}
        style={{
          padding: '8px 12px',
          borderRadius: 6,
          border: '1px solid #d7daea',
          background: '#fff',
          color: colors.marsBlueDark,
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Log out
      </button>
    </div>
  </header>
);

export default TopHeader;
