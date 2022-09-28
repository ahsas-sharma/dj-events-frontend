import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    console.log('AuthContext: useEffect()');
    checkUserLoggedIn();
  });
  // Register User
  const register = async (user) => {
    console.log(user);
  };

  // Login User
  const login = async ({ email, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setUser(data.user);
      router.push('/account/dashboard');
    } else {
      console.log(`Setting error state to: ${data.message}`);
      setError(data.message);
      // console.log(`Error State: ${error}`);
      // setError(null);
    }
  };

  // Logout User
  const logout = async () => {
    console.log('Logged out');
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
