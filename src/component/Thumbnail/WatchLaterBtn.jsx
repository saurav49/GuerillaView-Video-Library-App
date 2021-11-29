import React, { useEffect } from "react";
import styles from "./Thumbnail.module.css";
import { isVideoInWatchLater } from "../../utils";
import { useUserData } from "../../hooks/useUserData";
import { useTheme } from "../../hooks/useTheme";
import { FaBookmark } from "react-icons/fa";

const WatchLaterBtn = ({ videoId, token }) => {
  const {
    state: { watchLaterVideos },
    fetchVideos,
    handleRemoveVideo,
    handleAddVideo
  } = useUserData();

  useEffect(() => {
    fetchVideos({
      dispatchType: "FETCH_WATCH_LATER_VIDEOS",
      dataType: "watchLaterVideos",
      endPoint: "watchLater"
    });
  }, []);

  const { theme } = useTheme();

  return (
    <>
      {isVideoInWatchLater(watchLaterVideos, videoId) ? (
        <li
          className={
            theme === "dark"
              ? `${styles.thumbnailDetailsList} ${styles.thumbnailDetailsListDark}`
              : `${styles.thumbnailDetailsList} ${styles.thumbnailDetailsListLight}`
          }
          onClick={() =>
            handleRemoveVideo(
              videoId,
              "watchLater",
              "REMOVE_VIDEO_FROM_WATCHLATER"
            )
          }
        >
          <FaBookmark className={styles.thumbnailDetailsListIcon} />
          <span> Remove From Watch Later </span>
        </li>
      ) : (
        <li
          className={
            theme === "dark"
              ? `${styles.thumbnailDetailsList} ${styles.thumbnailDetailsListDark}`
              : `${styles.thumbnailDetailsList} ${styles.thumbnailDetailsListLight}`
          }
          onClick={() =>
            handleAddVideo(
              videoId,
              token,
              "watchLater",
              "ADD_VIDEO_TO_WATCHLATER",
              "saveWatchLaterVideo"
            )
          }
        >
          <FaBookmark className={styles.thumbnailDetailsListIcon} />
          <span> Watch Later </span>
        </li>
      )}
    </>
  );
};

export { WatchLaterBtn };
