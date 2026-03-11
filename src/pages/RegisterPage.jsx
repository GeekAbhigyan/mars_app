import { useState } from 'react';
import colors from '../constants/colors';
import AuthLayout from '../layouts/AuthLayout';

const ROLES = ['Super User', 'User'];

const RegisterPage = ({ onRegister, onGoLogin }) => {
  const [email, setEmail] = useState('aakaash.pattanayak@effem.com');
  const [role, setRole] = useState('Super User');

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
          Register your account
        </h2>

        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="register-email"
            style={{ display: 'block', fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 500 }}
          >
            Email ID
          </label>
          <input
            id="register-email"
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

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#555', marginBottom: 10, fontWeight: 500 }}>Role</div>
          <div style={{ display: 'flex', gap: 20 }} role="radiogroup" aria-label="Role">
            {ROLES.map((item) => (
              <label
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#333',
                }}
              >
                <input
                  type="radio"
                  name="register-role"
                  checked={role === item}
                  onChange={() => setRole(item)}
                  style={{ accentColor: colors.marsOrange }}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onRegister}
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
          Register
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#777', margin: 0 }}>
          Already have an account?{' '}
          <button
            type="button"
            onClick={onGoLogin}
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
            Login
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
