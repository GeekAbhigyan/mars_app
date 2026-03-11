import { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './layouts/Dashboard';

// Possible app screens
const SCREENS = {
  REGISTER: 'register',
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
};

/**
 * Application root — manages the top-level screen/auth state.
 * Screens: register → login → dashboard (and back to register on logout).
 */
const App = () => {
  const [screen, setScreen] = useState(SCREENS.REGISTER);

  if (screen === SCREENS.REGISTER) {
    return (
      <RegisterPage
        onRegister={() => setScreen(SCREENS.LOGIN)}
        onGoLogin={() => setScreen(SCREENS.LOGIN)}
      />
    );
  }

  if (screen === SCREENS.LOGIN) {
    return (
      <LoginPage
        onLogin={() => setScreen(SCREENS.DASHBOARD)}
        onGoRegister={() => setScreen(SCREENS.REGISTER)}
      />
    );
  }

  return <Dashboard onLogout={() => setScreen(SCREENS.REGISTER)} />;
};

export default App;
