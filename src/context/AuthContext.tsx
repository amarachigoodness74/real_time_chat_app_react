import { useState, useEffect, createContext } from "react";
import {
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { AuthContextType } from "../@types/@types.users";
import { AuxProps } from "../@types/@types.children";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: AuxProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const onAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setPersistence(auth, browserLocalPersistence)
          .then(() => null)
          .catch((_) => {
            console.error("Error setting persistence:");
          });
      }
    });

    return () => {
      onAuth();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
