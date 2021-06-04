import React, { useContext, createContext, useState } from "react";
import { videoData as Data } from "../videoData";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [videoData, setVideoData] = useState(Data);
  const [currentCategory, setCurrentCategory] = useState("All");

  return (
    <DataContext.Provider
      value={{ videoData, setVideoData, currentCategory, setCurrentCategory }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
