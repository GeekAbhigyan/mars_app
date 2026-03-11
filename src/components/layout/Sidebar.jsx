import colors from '../../constants/colors';
import { navItems } from '../../constants/data';

const Sidebar = ({ active, onNavigate }) => (
  <nav
    aria-label="Primary"
    style={{
      width: 228,
      minHeight: '100%',
      background: colors.white,
      borderRight: '1px solid #e8e8e8',
      paddingTop: 8,
    }}
  >
    {navItems.map((item) => {
      const isActive = active === item.label;

      return (
        <button
          type="button"
          key={item.label}
          onClick={() => onNavigate(item.label)}
          aria-current={isActive ? 'page' : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: 'calc(100% - 16px)',
            gap: 10,
            padding: '11px 18px',
            cursor: 'pointer',
            fontSize: 13.5,
            background: isActive ? colors.sidebarActive : 'transparent',
            color: isActive ? '#fff' : colors.textDark,
            borderRadius: isActive ? '6px' : '0',
            margin: isActive ? '2px 8px' : '0 8px',
            fontWeight: isActive ? 600 : 400,
            transition: 'all 0.15s',
            border: 'none',
            textAlign: 'left',
          }}
        >
          <span style={{ minWidth: 26, fontSize: 12, opacity: 0.8 }}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      );
    })}
  </nav>
);

export default Sidebar;
