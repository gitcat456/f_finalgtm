import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the admin app and provides auth state + actions.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getUser());
  const [loading, setLoading] = useState(true);

  // On mount, verify the stored token is still valid
  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      const verifiedUser = await authService.verifyToken();
      if (!cancelled) {
        setUser(verifiedUser);
        setLoading(false);
      }
    };

    if (authService.isAuthenticated()) {
      verify();
    } else {
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username, password) => {
    const data = await authService.login(username, password);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
