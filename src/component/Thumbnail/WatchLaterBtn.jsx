import React, { useEffect } from "react";
import styles from "./Thumbnail.module.css";
import { isVideoInWatchLater } from "../../utils";
import { useUserData, useTheme } from "../../hooks/index";
import { FaBookmark } from "../../Icons/Icons";
import { watchLaterURL } from "../../urls";

const WatchLaterBtn = ({ videoId, token }) => {
  const {
    state: { watchLaterVideos },
    populateData,
    handleRemoveVideo,
    handleAddVideo,
  } = useUserData();

  useEffect(() => {
    populateData({
      url: `${watchLaterURL}`,
      dispatchType: "FETCH_WATCH_LATER_VIDEOS",
      dataEndPoint: "watchLaterVideos",
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
