import { useState } from 'react';
import colors from '../constants/colors';
import AuthLayout from '../layouts/AuthLayout';

const LoginPage = ({ onLogin, onGoRegister }) => {
  const [email] = useState('aakaash.pattanayak@effem.com');

  const cardStyle = {
    background: '#fff',
    borderRadius: 14,
    padding: '36px 32px',
    boxShadow: '0 4px 30px rgba(0,0,0,0.09)',
    border: '1px solid #f0f0f0',
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

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: '#777', textAlign: 'center', marginBottom: 4 }}>Username</div>
          <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 14, color: colors.marsBlueDark }}>
            {email}
          </div>
        </div>

        <button
          type="button"
          onClick={onLogin}
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
