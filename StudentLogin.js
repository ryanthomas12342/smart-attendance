// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';


// const StudentLogin = () => {
//   const [formData, setFormData] = useState({ rollNumber: '', password: '' });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const studentId = localStorage.getItem('studentId');

  

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/student/login', formData);
//       if (response.data.success) {
//         setMessage('Login successful!');
//         localStorage.setItem('studentId', response.data.studentId);
//         navigate('/student-dashboard');
//       } else {
//         setMessage('Incorrect roll number or password');
//       }
//     } catch (error) {
//       setMessage('Login failed: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('studentId'); // Remove student ID from localStorage
//     setMessage('You have been logged out');
//     navigate('/login/student'); // Redirect to login page after logout
//   };

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem' }}>
//       <div style={{ maxWidth: '28rem', margin: '0 auto', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
//         {studentId ? (
//           // If the user is logged in, show the logout button
//           <div>
//             <h2>Do you want to </h2>
//             <button
//               onClick={handleLogout}
//               style={{
//                 backgroundColor: '#EF4444',
//                 color: 'white',
//                 padding: '0.75rem 1.5rem',
//                 borderRadius: '0.375rem',
//                 fontWeight: 'bold',
//                 width: '100%',
//                 transition: 'background-color 0.3s ease',
//               }}
//               onMouseEnter={(e) => e.target.style.backgroundColor = '#DC2626'}
//               onMouseLeave={(e) => e.target.style.backgroundColor = '#EF4444'}
//             >
//               Logout
//             </button>
//             <p>{message}</p>
//           </div>
//         ) : (
//           // If the user is not logged in, show the login form
//           <div>
//             <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Student Login</h2>
//             <form onSubmit={handleSubmit}>
//               <div style={{ marginBottom: '1rem' }}>
//                 <input
//                   type="text"
//                   name="rollNumber"
//                   placeholder="Roll Number"
//                   onChange={handleChange}
//                   required
//                   style={{
//                     border: '1px solid #E2E8F0',
//                     padding: '0.5rem',
//                     borderRadius: '0.375rem',
//                     width: '100%',
//                     fontSize: '1rem',
//                     marginBottom: '1rem',
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: '1.5rem' }}>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   onChange={handleChange}
//                   required
//                   style={{
//                     border: '1px solid #E2E8F0',
//                     padding: '0.5rem',
//                     borderRadius: '0.375rem',
//                     width: '100%',
//                     fontSize: '1rem',
//                     marginBottom: '1rem',
//                   }}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 style={{
//                   backgroundColor: '#3B82F6',
//                   color: 'white',
//                   padding: '0.75rem 1.5rem',
//                   borderRadius: '0.375rem',
//                   fontWeight: 'bold',
//                   width: '100%',
//                   transition: 'background-color 0.3s ease',
//                 }}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#2563EB'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = '#3B82F6'}
//               >
//                 Login
//               </button>
//             </form>
//             {message && <p style={{ color: '#EF4444', marginTop: '1rem' }}>{message}</p>}
//             <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
//               Don’t have an account? <Link to="/student-signup" style={{ color: '#3B82F6' }}>Sign up</Link>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentLogin;














import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const StudentLogin = () => {
  const [formData, setFormData] = useState({ rollNumber: '', password: '' });
  const [message, setMessage] = useState('');
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false); // State to control logout prompt visibility
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId');

  // Function to handle the back navigation (when user presses back arrow)
  const handleBeforeUnload = (event) => {
    if (studentId) {
      // Display a custom prompt when the user tries to navigate away
      event.preventDefault();
      event.returnValue = ''; // Required for the browser to display the confirmation
    }
  };

  // Attach the beforeunload event directly in the constructor or method
  const addBeforeUnloadListener = () => {
    window.addEventListener('beforeunload', handleBeforeUnload);
  };

  const removeBeforeUnloadListener = () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };

  // When the component mounts or the user is logged in, add the event listener
  if (studentId) {
    addBeforeUnloadListener();
  } else {
    removeBeforeUnloadListener();
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/student/login', formData);
      if (response.data.success) {
        setMessage('Login successful!');
        localStorage.setItem('studentId', response.data.studentId);
        navigate('/student-dashboard');
      } else {
        setMessage('Incorrect roll number or password');
      }
    } catch (error) {
      setMessage('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentId'); // Remove student ID from localStorage
    setMessage('You have been logged out');
    navigate('/login/student'); // Redirect to login page after logout
  };

  const handleCancelLogout = () => {
    setShowLogoutPrompt(false); // Close the logout prompt without logging out
  };

  const showLogoutConfirmation = () => {
    setShowLogoutPrompt(true); // Show the logout confirmation modal
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem' }}>
      <div style={{ maxWidth: '28rem', margin: '0 auto', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '2rem' }}>
        {studentId ? (
          // If the user is logged in, show the logout button
          <div>
            <h2>Do you want to logout?</h2>
            <button
              onClick={showLogoutConfirmation}
              style={{
                backgroundColor: '#EF4444',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                fontWeight: 'bold',
                width: '100%',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#DC2626'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#EF4444'}
            >
              Logout
            </button>
            <p>{message}</p>
          </div>
        ) : (
          // If the user is not logged in, show the login form
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Student Login</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  name="rollNumber"
                  placeholder="Roll Number"
                  onChange={handleChange}
                  required
                  style={{
                    border: '1px solid #E2E8F0',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    width: '100%',
                    fontSize: '1rem',
                    marginBottom: '1rem',
                  }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  style={{
                    border: '1px solid #E2E8F0',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    width: '100%',
                    fontSize: '1rem',
                    marginBottom: '1rem',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  fontWeight: 'bold',
                  width: '100%',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563EB'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3B82F6'}
              >
                Login
              </button>
            </form>
            {message && <p style={{ color: '#EF4444', marginTop: '1rem' }}>{message}</p>}
            <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              Don’t have an account? <Link to="/student-signup" style={{ color: '#3B82F6' }}>Sign up</Link>
            </p>
          </div>
        )}
      </div>

      {/* Modal for logout confirmation */}
      {showLogoutPrompt && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3>Are you sure you want to logout?</h3>
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#EF4444',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  fontWeight: 'bold',
                  marginRight: '1rem',
                }}
              >
                Yes, Log out
              </button>
              <button
                onClick={handleCancelLogout}
                style={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.375rem',
                  fontWeight: 'bold',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLogin;
