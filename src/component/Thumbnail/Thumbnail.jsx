import React, { useState } from "react";
import styles from "./Thumbnail.module.css";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV, FaFolderPlus } from "../../Icons/Icons";
import { useTheme, useAuth, useUserData } from "../../hooks/index";
import { WatchLaterBtn, HistoryBtn, PlaylistBtn } from "../index";

const Thumbnail = ({ videoId, id, name, desc, avatar, notes }) => {
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
      state: { id, name, desc, avatar, videoId, token, notes },
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
            <PlaylistBtn showText={true} videoId={videoId} />
          </li>
          <HistoryBtn videoId={videoId} />
        </ul>
      )}
    </div>
  );
};

export { Thumbnail };
