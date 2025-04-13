'use client';

import { createContext, useContext } from 'react';

type AuthContextType = {
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  signInWithGoogle: async () => {
    alert('✅ Mock: Google Sign In clicked!');
  },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const value: AuthContextType = {
    signInWithGoogle: async () => {
      alert('✅ Mock: Google Sign In clicked!');
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
