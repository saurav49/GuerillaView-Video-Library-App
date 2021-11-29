import React, { useEffect } from "react";
import styles from "./Thumbnail.module.css";
import { isVideoInHistory } from "../../utils";
import { useUserData } from "../../hooks/useUserData";
import { useTheme } from "../../hooks/useTheme";
import { FaHistory } from "react-icons/fa";

const HistoryBtn = ({ videoId }) => {
  const {
    state: { historyVideos },
    fetchVideos,
    handleRemoveVideo
  } = useUserData();

  useEffect(() => {
    fetchVideos({
      dispatchType: "FETCH_HISTORY_VIDEOS",
      dataType: "historyVideos",
      endPoint: "history"
    });
  }, []);

  const { theme } = useTheme();

  return (
    <>
      {isVideoInHistory(historyVideos, videoId) && (
        <li
          className={
            theme === "dark"
              ? `${styles.thumbnailDetailsList} ${styles.thumbnailDetailsListDark}`
              : `${styles.thumbnailDetailsList} ${styles.thumbnailDetailsListLight}`
          }
          onClick={() =>
            handleRemoveVideo(videoId, "history", "REMOVE_VIDEO_FROM_HISTORY")
          }
        >
          <FaHistory className={styles.thumbnailDetailsListIcon} />
          <span> Remove From History </span>
        </li>
      )}
    </>
  );
};

export { HistoryBtn };
