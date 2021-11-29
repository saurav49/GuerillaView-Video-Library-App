import { useContext } from "react";
import { UserDataContext } from "../context/userDataContext";

export const useUserData = () => {
  return useContext(UserDataContext);
};
