import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [videoData, setVideoData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");

  return (
    <DataContext.Provider
      value={{ videoData, setVideoData, currentCategory, setCurrentCategory }}
    >
      {children}
    </DataContext.Provider>
  );
};
