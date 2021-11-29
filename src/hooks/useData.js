import { useContext } from "react";
import { DataContext } from "../context/dataContext";

export const useData = () => {
  return useContext(DataContext);
};
