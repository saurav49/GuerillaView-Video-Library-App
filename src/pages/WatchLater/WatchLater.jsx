import React, { useEffect } from "react";
import styles from "./WatchLater.module.css";
import { Thumbnail } from "../../component/Thumbnail/Thumbnail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../hooks/useTheme";
import { useUserData } from "../../hooks/useUserData";

const WatchLater = () => {
  const { theme } = useTheme();

  const {
    state: { watchLaterVideos },
    fetchVideos
  } = useUserData();

  useEffect(() => {
    fetchVideos({
      dispatchType: "FETCH_WATCH_LATER_VIDEOS",
      dataType: "watchLaterVideos",
      endPoint: "watchLater"
    });
  }, []);

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.watchLaterContainer} ${styles.watchLaterDark}`
          : `${styles.watchLaterContainer} ${styles.watchLaterLight}`
      }
    >
      <h1>Watch Later</h1>
      <div className={styles.watchLaterVideos}>
        {watchLaterVideos.map(({ _id, id, name, desc, avatar }) => {
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

export { WatchLater };
