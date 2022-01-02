import React, { useEffect } from "react";
import styles from "./Thumbnail.module.css";
import { isVideoInHistory } from "../../utils";
import { useUserData, useTheme } from "../../hooks/index";
import { FaHistory } from "../../Icons/Icons";
import { historyURL } from "../../urls";

const HistoryBtn = ({ videoId }) => {
  const {
    state: { historyVideos },
    populateData,
    handleRemoveVideo,
  } = useUserData();

  useEffect(() => {
    populateData({
      url: `${historyURL}`,
      dispatchType: "FETCH_HISTORY_VIDEOS",
      dataEndPoint: "historyVideos",
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
