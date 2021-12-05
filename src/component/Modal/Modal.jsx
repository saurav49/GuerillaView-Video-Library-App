import React, { useState } from "react";
import styles from "./Modal.module.css";
import { useTheme, useUserData, useAuth } from "../../hooks/index";
import { AiFillCloseCircle, HiMinusCircle } from "../../Icons/Icons";
import { InitializeApp } from "../../utils";

const Modal = ({ videoId, toggleShowModal, setIsShowModal }) => {
  const { theme } = useTheme();
  const { token } = useAuth();
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const {
    state: { playlists },
    handleRemoveVideoFromPlaylist,
    handleAddNewPlaylist,
    handleAddVideoToPlaylist,
    handleDeletePlaylist,
  } = useUserData();

  InitializeApp();

  // flatten the array
  // const allSongsInAllPlaylists = playlists.reduce(
  //   (acc, curr) => acc.concat(curr.videoList),
  //   []
  // );

  const handleCreatePlaylist = () => {
    handleAddNewPlaylist(token, newPlaylistName, videoId, setNewPlaylistName);
  };

  const handleCheckboxPlaylist = (playlistId) => {
    if (isCheckInPlaylist(playlistId, videoId)) {
      handleRemoveVideoFromPlaylist(token, playlistId, videoId);
    } else {
      handleAddVideoToPlaylist(token, playlistId, videoId);
    }
  };

  const isCheckInPlaylist = (playlistId, videoId) => {
    const videoList = playlists.filter(
      (playlist) => playlist._id === playlistId
    )[0].videoList;
    return videoList.find((video) => video._id === videoId) !== undefined;
  };

  const deletePlaylistBtnClicked = (playlistId) => {
    handleDeletePlaylist(token, playlistId);
  };

  return (
    <>
      {toggleShowModal && (
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
              onClick={() => setIsShowModal(false)}
            >
              <AiFillCloseCircle />
            </button>
            <>
              {playlists.map((playlist) => {
                return (
                  <div className={styles.inputCheckbox} key={playlist._id}>
                    <input
                      type="checkbox"
                      defaultChecked={isCheckInPlaylist(playlist._id, videoId)}
                      onChange={() => handleCheckboxPlaylist(playlist._id)}
                    />
                    <p className={styles.inputText}>{playlist.name}</p>
                    <button
                      className={
                        theme === "dark"
                          ? `${styles.deletePlaylistBtn} ${styles.deletePlaylistBtnDark}`
                          : `${styles.deletePlaylistBtn} ${styles.deletePlaylistBtnLight}`
                      }
                      onClick={() => deletePlaylistBtnClicked(playlist._id)}
                    >
                      <HiMinusCircle />
                    </button>
                  </div>
                );
              })}
            </>
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
                <button
                  onClick={() => setIsShowModal(false)}
                  className={`btn btn-outline-primary btn-sm`}
                >
                  cancel
                </button>
                <button
                  onClick={() => handleCreatePlaylist()}
                  className={`btn btn-primary btn-sm mx-1`}
                >
                  Create
                </button>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export { Modal };
