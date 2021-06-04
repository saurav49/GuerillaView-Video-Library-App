import React, { useState } from "react";
import styles from "./Thumbnail.module.css";
import { FaEllipsisV } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { useTheme } from "../../context/useTheme";

const Thumbnail = ({ id, name, desc }) => {
  const imgSrc = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const { theme } = useTheme();
  const [showDetails, setDetails] = useState(false);

  const handleShowDetails = () => {
    setDetails((value) => !value);
  };

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.thumbnail} ${styles.thumbnailDark}`
          : `${styles.thumbnail} ${styles.thumbnailLight}`
      }
    >
      <img className={styles.imgDiv} src={imgSrc} alt="youtubeThumbnail" />
      <div className={styles.thumbnailDesc}>
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
          <li
            className={
              theme === "dark"
                ? `${styles.thumbnailDetailsList} ${styles.thumbnailDetailsListDark}`
                : `${styles.thumbnailDetailsList} ${styles.thumbnailDetailsListLight}`
            }
          >
            <FaBookmark className={styles.thumbnailDetailsListIcon} />
            <span> Watch Later </span>
          </li>
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
        </ul>
      )}
    </div>
  );
};

export { Thumbnail };
