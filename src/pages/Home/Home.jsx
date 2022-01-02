import React from "react";
import { VideoListing } from "../../component/index";
import { useData, useTheme } from "../../hooks/index";
import styles from "./Home.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InitializeApp } from "../../utils";

const Home = () => {
  const { videoData } = useData();
  const { theme } = useTheme();

  InitializeApp();

  return (
    <div
      style={{ minHeight: "100vh" }}
      className={
        theme === "dark" ? `${styles.homeDark}` : `${styles.homeLight}`
      }
    >
      <VideoListing videoData={videoData} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export { Home };
