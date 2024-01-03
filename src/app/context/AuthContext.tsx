"use client"
import { useContext, createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { auth } from "../../../config/firebase";

const AuthContext = createContext<any>({});
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, resetPassword, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
}