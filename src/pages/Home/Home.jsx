import React from "react";
import { VideoListing } from "../../component/index";
import { useDataContext } from "../../context/dataContext";
import { useTheme } from "../../context/useTheme";
import styles from "./Home.module.css";

const Home = () => {
  const { videoData } = useDataContext();
  const { theme } = useTheme();

  return (
    <div
      style={{ minHeight: "100vh" }}
      className={
        theme === "dark" ? `${styles.homeDark}` : `${styles.homeLight}`
      }
    >
      <VideoListing videoData={videoData} />
    </div>
  );
};

export { Home };
