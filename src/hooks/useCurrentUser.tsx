import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useCurrentUser() {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  return currentUser;
}
