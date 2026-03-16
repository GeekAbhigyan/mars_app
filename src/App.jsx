import { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './layouts/Dashboard';

const SCREENS = {
  REGISTER: 'register',
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
};

const App = () => {
  const [screen, setScreen] = useState(SCREENS.REGISTER);
  const [users, setUsers] = useState([
    { email: 'aakaash.pattanayak@effem.com', password: 'effem2025' },
  ]);

  const [loginError, setLoginError] = useState('');

  const handleRegister = ({ email, password }) => {
    setUsers((prevUsers) => [...prevUsers, { email, password }]);
    setScreen(SCREENS.LOGIN);
  };

  const handleLogin = ({ email, password }) => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      setLoginError('Invalid credentials. Please verify and try again.');
      return;
    }
    setLoginError('');
    setScreen(SCREENS.DASHBOARD);
  };

  const handleLogout = () => {
    setScreen(SCREENS.REGISTER);
  };

  if (screen === SCREENS.REGISTER) {
    return <RegisterPage onRegister={handleRegister} onGoLogin={() => setScreen(SCREENS.LOGIN)} />;
  }

  if (screen === SCREENS.LOGIN) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoRegister={() => setScreen(SCREENS.REGISTER)}
        error={loginError}
      />
    );
  }

  return <Dashboard onLogout={handleLogout} />;
};

export default App;
