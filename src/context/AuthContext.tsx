import { useState, useEffect, createContext } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { AuthContextType } from "../@types/@types.users";
import { AuxProps } from "../@types/@types.children";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({
  children,
}: AuxProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const onAuth = onAuthStateChanged(auth, (user) => setCurrentUser(user));

    return () => {
      onAuth();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
