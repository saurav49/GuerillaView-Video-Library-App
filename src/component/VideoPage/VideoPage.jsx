import React, { useState, useEffect } from "react";
import { useTheme, useData } from "../../hooks/index";
import styles from "./VideoPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { LikeBtn, PlaylistBtn, WatchLaterBtnPage } from "../index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { videoNoteURL, getALLvideosURL } from "../../urls";
import axios from "axios";
import { RiEdit2Fill, IoMdArrowRoundBack } from "../../Icons/Icons";

const VideoPage = () => {
  const { theme } = useTheme();
  const [noteText, setNoteText] = useState("");
  const [reqdVideo, setReqdVideo] = useState([]);
  const { id } = useParams();
  const { videoData, setVideoData } = useData();

  useEffect(() => {
    (async function () {
      const {
        data: { videos },
      } = await axios.get(getALLvideosURL);
      setVideoData(videos);
    })();
  }, []);

  useEffect(() => {
    const vid = videoData.filter((video) => video.id === id);
    console.log({ vid });
    setReqdVideo(vid);
  }, [videoData]);

  const btnTheme = theme === "dark" ? "light" : "dark";

  const navigate = useNavigate();

  let videoId = "";
  if (reqdVideo.length > 0) {
    videoId = `https://www.youtube.com/embed/${reqdVideo[0].id}`;
  }

  const goBackHandler = () => {
    navigate("/");
  };

  const handleNoteSubmit = async (videoId) => {
    console.log({ videoId });
    try {
      const response = await axios.post(`${videoNoteURL}/${videoId}`, {
        note: noteText,
      });
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      {reqdVideo.length > 0 && (
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
                      src={reqdVideo[0].avatar}
                      alt="avatar"
                    />
                  </span>
                  <p className={styles.videoName}>{reqdVideo[0].name}</p>
                </div>
                <div className={styles.videoIconsContainer}>
                  <LikeBtn videoId={reqdVideo[0]._id} />
                  <WatchLaterBtnPage videoId={reqdVideo[0]._id} />
                  <PlaylistBtn showText={false} videoId={reqdVideo[0]._id} />
                </div>
                <p className={styles.videoSummary}> {reqdVideo[0].desc} </p>
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
              >
                {reqdVideo[0].notes.length > 0 && (
                  <>
                    {reqdVideo[0].notes.map(({ note, _id }) => {
                      return (
                        <div
                          className={
                            theme === "dark"
                              ? `${styles.noteText} ${styles.noteTextDark}`
                              : `${styles.noteText} ${styles.noteTextLight}`
                          }
                          key={_id}
                        >
                          <p>{note}</p>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              <div
                className={
                  theme === "dark"
                    ? `${styles.noteInput} ${styles.noteInputDark}`
                    : `${styles.noteInput} ${styles.noteInputLight}`
                }
              >
                <textarea
                  name="txtarea"
                  id="txtarea"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className={
                    theme === "dark"
                      ? styles.textareaDark
                      : styles.textareaLight
                  }
                ></textarea>
                <button
                  className={`btn btn-${btnTheme} btn-sm`}
                  onClick={() => handleNoteSubmit(reqdVideo[0].id)}
                >
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

          <ToastContainer />
        </div>
      )}
    </>
  );
};

export { VideoPage };
