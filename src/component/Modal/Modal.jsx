import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";
import { useTheme } from "../../hooks/useTheme";
import { AiFillCloseCircle } from "react-icons/ai";
import { useUserData } from "../../hooks/useUserData";
import { isVideoInPlaylist } from "../../utils";

const Modal = ({ videoId }) => {
  const { theme } = useTheme();
  const [isChecked, setChecked] = useState(false);
  const [isShowModal, setShowModal] = useState(true);
  const [isCreatePlaylist, setCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const {
    state: { playlists }
  } = useUserData();

  // flatten the array
  const allSongsInAllPlaylists = playlists.reduce(
    (acc, curr) => acc.concat(curr.videoList),
    []
  );

  useEffect(() => {
    isVideoInPlaylist(allSongsInAllPlaylists, videoId)
      ? setChecked(true)
      : setChecked(false);
  }, [isChecked]);

  return (
    <>
      {isShowModal && (
        <div className={styles.modal_container}>
          <div
            className={
              theme === "dark"
                ? `${styles.modal} ${styles.modal_dark}`
                : `${styles.modal} ${styles.modal_light}`
            }
          >
            <button
              className={styles.modal_close}
              onClick={() => setShowModal(false)}
            >
              <AiFillCloseCircle />
            </button>
            {isCreatePlaylist ? (
              <>
                <p className={styles.modal_heading}>Playlist</p>
                {playlists.map((playlist) => {
                  return (
                    <div className={styles.inputCheckbox}>
                      <input type="checkbox" checked={isChecked} />
                      <p className={styles.inputText}>{playlist.name}</p>
                    </div>
                  );
                })}
                <button className={`btn btn-outline-primary btn-sm`}>
                  Create Playlist
                </button>
              </>
            ) : (
              <>
                <p className={styles.modal_heading}>Create Playlist</p>
                <input
                  className={
                    theme === "dark "
                      ? `${styles.inputStyle} ${styles.inputStyleDark}`
                      : `${styles.inputStyle} ${styles.inputStyleLight}`
                  }
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <div className={styles.btnContainer}>
                  <button className={`btn btn-outline-primary btn-sm`}>
                    cancel
                  </button>
                  <button className={`btn btn-primary btn-sm mx-1`}>
                    Create
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export { Modal };
