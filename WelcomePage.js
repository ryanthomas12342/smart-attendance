import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Briefcase } from 'lucide-react';

const Welcome = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', color: '#2D3748', marginBottom: '3rem' }}>
        Welcome to QRoll
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <Link
          to="/login/student"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)'}
          onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
        >
          <UserCircle size={48} style={{ marginBottom: '1rem', color: '#4A5568' }} />
          <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4A5568' }}>Student</span>
        </Link>
        <Link
          to="/login/employee"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)'}
          onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
        >
          <Briefcase size={48} style={{ marginBottom: '1rem', color: '#4A5568' }} />
          <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4A5568' }}>Teacher</span>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
