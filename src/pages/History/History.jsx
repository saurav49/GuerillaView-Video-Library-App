import React, { useEffect } from "react";
import styles from "./History.module.css";
import { Thumbnail } from "../../component/Thumbnail/Thumbnail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../hooks/useTheme";
import { useUserData } from "../../hooks/useUserData";

const History = () => {
  const { theme } = useTheme();

  const {
    state: { historyVideos },
    fetchVideos
  } = useUserData();

  useEffect(() => {
    fetchVideos({
      dispatchType: "FETCH_HISTORY_VIDEOS",
      dataType: "historyVideos",
      endPoint: "history"
    });
  }, []);

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.historyContainer} ${styles.historyDark}`
          : `${styles.historyContainer} ${styles.historyLight}`
      }
    >
      <h1>History</h1>
      <div className={styles.historyVideos}>
        {historyVideos
          .slice(0)
          .reverse()
          .map(({ _id, id, name, desc, avatar }) => {
            return (
              <Thumbnail
                key={_id}
                videoId={_id}
                id={id}
                name={name}
                desc={desc}
                avatar={avatar}
              />
            );
          })}
      </div>
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

export { History };
