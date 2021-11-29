import React, { useState } from "react";
import styles from "./Thumbnail.module.css";
import { FaEllipsisV, FaFolderPlus } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { WatchLaterBtn } from "./WatchLaterBtn";
import { HistoryBtn } from "./HistoryBtn";
import { useUserData } from "../../hooks/useUserData";

const Thumbnail = ({ videoId, id, name, desc, avatar }) => {
  const imgSrc = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const { theme } = useTheme();
  const [showDetails, setDetails] = useState(false);

  const navigate = useNavigate();
  const { token } = useAuth();

  const { handleAddVideo } = useUserData();

  const handleShowDetails = () => {
    setDetails((value) => !value);
  };

  const handleVideoPage = (id, name, desc, avatar, videoId, token) => {
    handleAddVideo(
      videoId,
      token,
      "history",
      "ADD_VIDEO_TO_HISTORY",
      "historyVideos"
    );

    navigate(`/video/${id}`, {
      state: { id, name, desc, avatar, videoId, token }
    });
  };

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.thumbnail} ${styles.thumbnailDark}`
          : `${styles.thumbnail} ${styles.thumbnailLight}`
      }
    >
      <img
        className={styles.imgDiv}
        src={imgSrc}
        alt="youtubeThumbnail"
        onClick={() => handleVideoPage(id, name, desc, avatar, videoId, token)}
      />
      <div className={styles.thumbnailDesc}>
        <span className={`avatar-frame`}>
          <img className={`avatar avatar-sm`} src={avatar} alt="avatar" />
        </span>
        <p className={styles.thumbnailTitle}> {name} </p>
        <button
          onClick={handleShowDetails}
          className={
            theme === "dark"
              ? `${styles.thumbnailbtn} ${styles.thumbnailBtnDark}`
              : `${styles.thumbnailbtn} ${styles.thumbnailBtnLight}`
          }
        >
          <FaEllipsisV />
        </button>
      </div>
      {showDetails && (
        <ul className={styles.thumbnailDetails}>
          <WatchLaterBtn videoId={videoId} token={token} />
          <li
            className={
              theme === "dark"
                ? `${styles.thumbnailDetailsList} ${styles.thumbnailDetailsListDark}`
                : `${styles.thumbnailDetailsList} ${styles.thumbnailDetailsListLight}`
            }
          >
            <FaFolderPlus className={styles.thumbnailDetailsListIcon} />
            <span> Add to Playlist</span>
          </li>
          <HistoryBtn videoId={videoId} />
        </ul>
      )}
    </div>
  );
};

export { Thumbnail };
