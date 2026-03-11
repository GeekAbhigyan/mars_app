import { useState } from 'react';
import colors from '../constants/colors';
import TopHeader from '../components/layout/TopHeader';
import SubHeader from '../components/layout/SubHeader';
import Sidebar from '../components/layout/Sidebar';
import MasterDataPage from '../pages/MasterDataPage';
import MPSReportPage from '../pages/MPSReportPage';
import PlaceholderPage from '../pages/PlaceholderPage';

/**
 * Main authenticated application shell.
 * Renders the top header, sub-header, sidebar, and the active page content.
 *
 * @param {Function} onLogout - Called to return the user to the auth screens
 */
const Dashboard = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('Master Data');

  const renderPage = () => {
    switch (activePage) {
      case 'Master Data':  return <MasterDataPage />;
      case 'MPS Report':   return <MPSReportPage />;
      default:             return <PlaceholderPage title={activePage} />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      <TopHeader onLogout={onLogout} />
      <SubHeader title="Copack Planning" />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar active={activePage} onNavigate={setActivePage} />
        <main style={{ flex: 1, overflowY: 'auto', background: colors.contentBg }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
