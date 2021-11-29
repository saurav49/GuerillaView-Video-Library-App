import React, { useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import { useTheme } from "../../hooks/useTheme";
import styles from "./VideoPage.module.css";
import { useUserData } from "../../hooks/useUserData";
import { isVideoInWatchLater } from "../../utils";
import { FaBookmark } from "react-icons/fa";

const WatchLaterBtnPage = ({ videoId, token }) => {
  const { theme } = useTheme();

  const {
    state: { watchLaterVideos },
    fetchVideos,
    handleAddVideo,
    handleRemoveVideo
  } = useUserData();

  useEffect(() => {
    fetchVideos({
      dispatchType: "FETCH_WATCH_LATER_VIDEOS",
      dataType: "watchLaterVideos",
      endPoint: "watchLater"
    });
  }, []);

  return (
    <>
      {isVideoInWatchLater(watchLaterVideos, videoId) ? (
        <button
          style={{ background: "none", border: "none" }}
          onClick={() =>
            handleRemoveVideo(
              videoId,
              "watchLater",
              "REMOVE_VIDEO_FROM_WATCHLATER"
            )
          }
        >
          <FaBookmark
            style={{ color: "#2563EB" }}
            className={
              theme === "dark"
                ? `${styles.videoIcon} ${styles.videoIconDark}`
                : `${styles.videoIcon} ${styles.videoIconLight}`
            }
          />
        </button>
      ) : (
        <button
          style={{ background: "none", border: "none" }}
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
          <FaBookmark
            className={
              theme === "dark"
                ? `${styles.videoIcon} ${styles.videoIconDark}`
                : `${styles.videoIcon} ${styles.videoIconLight}`
            }
          />
        </button>
      )}
    </>
  );
};

export { WatchLaterBtnPage };
