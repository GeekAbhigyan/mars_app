import colors from '../../constants/colors';

// Dark sub-header bar that shows the current section title
const SubHeader = ({ title }) => (
  <div
    style={{
      background: colors.subHeaderBg,
      color: '#fff',
      textAlign: 'center',
      padding: '10px 0',
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: 0.5,
    }}
  >
    {title}
  </div>
);

export default SubHeader;
