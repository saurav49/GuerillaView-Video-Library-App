import React from "react";
import { useTheme } from "../../hooks/useTheme";
import styles from "./VideoPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { LikeBtn } from "./LikeBtn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RiMenuAddLine, RiEdit2Fill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { WatchLaterBtnPage } from "./WatchLaterBtnPage";
import { Modal } from "../index";

const VideoPage = () => {
  const { theme } = useTheme();

  const btnTheme = theme === "dark" ? "light" : "dark";
  let { state } = useLocation();

  const navigate = useNavigate();

  if (state === null) {
    state = JSON.parse(localStorage?.getItem("videoData"));
  } else {
    localStorage?.setItem("videoData", JSON.stringify(state));
  }

  const videoId = `https://www.youtube.com/embed/${state.id}`;

  const goBackHandler = () => {
    navigate("/");
  };

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.videoPageWrapper} ${styles.videoPageWrapperDark}`
          : `${styles.videoPageWrapper} ${styles.videoPageWrapperLight}`
      }
    >
      <button
        style={theme === "dark" ? { color: "#fff" } : { color: "#333" }}
        onClick={() => goBackHandler()}
      >
        <IoMdArrowRoundBack />
      </button>
      <div
        className={
          theme === "dark"
            ? `${styles.videoPage} ${styles.videoPageDark}`
            : `${styles.videoPage} ${styles.videoPageLight}`
        }
      >
        <div
          className={
            theme === "dark"
              ? `${styles.videoTitle} ${styles.videoTitleDark}`
              : `${styles.videoTitle} ${styles.videoTitleLight}`
          }
        >
          <div className={styles.iframeContainer}>
            <iframe
              src={videoId}
              className={styles.iframeVideo}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          </div>
          <div className={styles.videoDesc}>
            <div className={styles.titleAndAvatar}>
              <span className={`avatar-frame`}>
                <img
                  className={`avatar avatar-sm`}
                  src={state.avatar}
                  alt="avatar"
                />
              </span>
              <p className={styles.videoName}>{state.name}</p>
            </div>
            <div className={styles.videoIconsContainer}>
              <LikeBtn videoId={state.videoId} token={state.token} />
              <WatchLaterBtnPage videoId={state.videoId} token={state.token} />
              <RiMenuAddLine
                className={
                  theme === "dark"
                    ? `${styles.videoIcon} ${styles.videoIconDark}`
                    : `${styles.videoIcon} ${styles.videoIconLight}`
                }
              />
            </div>
            <p className={styles.videoSummary}> {state.desc} </p>
          </div>
        </div>
        <div
          className={
            theme === "dark"
              ? `${styles.note} ${styles.noteDark}`
              : `${styles.note} ${styles.noteLight}`
          }
        >
          <p>Notes</p>
          <div
            className={
              theme === "dark"
                ? `${styles.noteDisplay} ${styles.noteDisplayDark}`
                : `${styles.noteDisplay} ${styles.noteDisplayLight}`
            }
          ></div>
          <div
            className={
              theme === "dark"
                ? `${styles.noteInput} ${styles.noteInputDark}`
                : `${styles.noteInput} ${styles.noteInputLight}`
            }
          >
            <textarea name="txtarea" id="txtarea"></textarea>
            <button className={`btn btn-${btnTheme} btn-sm`}>
              <RiEdit2Fill
                className={
                  theme === "dark"
                    ? `${styles.videoIcon} ${styles.videoIconLight}`
                    : `${styles.videoIcon} ${styles.videoIconDarK}`
                }
              />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export { VideoPage };
