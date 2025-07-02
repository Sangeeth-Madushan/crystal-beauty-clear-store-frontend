// // src/context/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     setIsLoggedIn(!!token);
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('authToken', token);
//     setIsLoggedIn(true);
//     navigate('/'); // Redirect after login
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     setIsLoggedIn(false);
//     navigate('/login'); // Redirect after logout
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }