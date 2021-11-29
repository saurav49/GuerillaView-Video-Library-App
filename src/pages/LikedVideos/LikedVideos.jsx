import React from "react";
import styles from "./LikedVideos.module.css";
import { Thumbnail } from "../../component/Thumbnail/Thumbnail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../hooks/useTheme";
import { useUserData } from "../../hooks/useUserData";

const LikedVideos = () => {
  const { theme } = useTheme();

  const {
    state: { likedVideos }
  } = useUserData();

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.likedContainer} ${styles.likedDark}`
          : `${styles.likedContainer} ${styles.likedLight}`
      }
    >
      <h1>Liked Videos</h1>
      <div className={styles.likedVideos}>
        {likedVideos.map(({ _id, id, name, desc, avatar }) => {
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

export { LikedVideos };
