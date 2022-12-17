import { useContext, useEffect, createContext } from 'react';
import { useLocalStorage } from 'react-use';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

import { auth } from '../firebase';

interface Context {
  token: string | undefined;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<Context | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage<string>('token', '', {
    raw: true,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const token = user && (await user.getIdToken());

      if (token) {
        setToken(token);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    token,
    login: (email: string, password: string) =>
      signInWithEmailAndPassword(auth, email, password),
    signup: (email: string, password: string) =>
      createUserWithEmailAndPassword(auth, email, password),
    logout: () => signOut(auth).then(() => removeToken()),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
