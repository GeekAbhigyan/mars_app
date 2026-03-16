import { useState } from 'react';
import colors from '../constants/colors';
import AuthLayout from '../layouts/AuthLayout';

const LoginPage = ({ onLogin, onGoRegister, error }) => {
  const [email, setEmail] = useState('aakaash.pattanayak@effem.com');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const cardStyle = {
    background: '#fff',
    borderRadius: 14,
    padding: '36px 32px',
    boxShadow: '0 4px 30px rgba(0,0,0,0.09)',
    border: '1px solid #f0f0f0',
    width: 360,
  };

  return (
    <AuthLayout>
      <div style={cardStyle}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 700,
            color: colors.marsBlueDark,
            marginBottom: 24,
          }}
        >
          Login to your account
        </h2>

        <div style={{ marginBottom: 12 }}>
          <label
            htmlFor="login-email"
            style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 500 }}
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #ddd',
              borderRadius: 7,
              fontSize: 13,
              color: '#333',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label
            htmlFor="login-password"
            style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 500 }}
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #ddd',
              borderRadius: 7,
              fontSize: 13,
              color: '#333',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </div>

        {(error || localError) && (
          <div style={{ color: '#b00020', marginBottom: 12, textAlign: 'center', fontSize: 12 }}>
            {localError || error}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            if (!email || !password) {
              setLocalError('Please enter both email and password.');
              return;
            }
            setLocalError('');
            onLogin({ email, password });
          }}
          style={{
            width: '100%',
            padding: '13px',
            background: colors.marsOrange,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            marginBottom: 18,
            letterSpacing: 0.5,
          }}
        >
          Log In
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#777', margin: 0 }}>
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onGoRegister}
            style={{
              color: colors.marsOrange,
              cursor: 'pointer',
              fontWeight: 600,
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: 13,
            }}
          >
            Register here
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
