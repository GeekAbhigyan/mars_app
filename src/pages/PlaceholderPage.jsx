import colors from '../constants/colors';

/**
 * Generic placeholder shown for nav items that haven't been implemented yet.
 * @param {string} title - Name of the section being displayed
 */
const PlaceholderPage = ({ title }) => (
  <div
    style={{
      padding: '60px 24px',
      textAlign: 'center',
      color: '#aaa',
      fontSize: 15,
      minHeight: '100%',
      background: colors.contentBg,
    }}
  >
    <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
    <h2 style={{ color: colors.textDark, marginBottom: 8, fontSize: 20 }}>{title}</h2>
    <p style={{ color: '#999' }}>This section is under construction.</p>
  </div>
);

export default PlaceholderPage;
