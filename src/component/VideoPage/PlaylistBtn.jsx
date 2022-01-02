import { useState } from "react";
import { Modal } from "../index";
import { RiMenuAddLine } from "../../Icons/Icons";
import thumbnailStyles from "../Thumbnail/Thumbnail.module.css";
import styles from "./VideoPage.module.css";
import { useTheme } from "../../hooks";

const PlaylistBtn = ({ videoId, showText }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const { theme } = useTheme();

  const handleToggleShowModal = () => {
    setIsShowModal(true);
  };

  return (
    <>
      <button
        className={
          theme === "dark"
            ? `${styles.playlistBtn} ${styles.playlistBtnDark}`
            : `${styles.playlistBtn} ${styles.playlistBtnLight}`
        }
        onClick={() => handleToggleShowModal()}
      >
        <RiMenuAddLine className={thumbnailStyles.thumbnailDetailsListIcon} />
        {showText && <span> Add to Playlist</span>}
      </button>
      <Modal
        videoId={videoId}
        toggleShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </>
  );
};

export { PlaylistBtn };
