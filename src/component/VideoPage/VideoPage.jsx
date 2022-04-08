import React, { useState, useEffect } from "react";
import { useTheme, useData, useAuth } from "../../hooks/index";
import styles from "./VideoPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { LikeBtn, PlaylistBtn, WatchLaterBtnPage } from "../index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { videoNoteURL, getALLvideosURL } from "../../urls";
import axios from "axios";
import { RiEdit2Fill, IoMdArrowRoundBack, MdCancel } from "../../Icons/Icons";
import Loader from "react-loader-spinner";

const VideoPage = () => {
  const { theme } = useTheme();
  const [noteText, setNoteText] = useState("");
  const [reqdVideo, setReqdVideo] = useState([]);
  const [notesLength, setNotesLength] = useState(0);
  const [noteBtnLoader, setNoteBtnLoader] = useState(false);
  const [noteLoader, setNoteLoader] = useState(false);
  const { id } = useParams();
  const { videoData, setVideoData } = useData();
  let { userId } = useAuth();

  if (!userId) {
    userId = localStorage.getItem("guerillaview__userId");
  }
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
    if (vid && vid.length > 0 && vid[0].hasOwnProperty("_id")) {
      setNotesLength(vid[0].notes.length);
    }
    setReqdVideo(vid);
  }, [videoData.length, notesLength]);

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
    try {
      setNoteBtnLoader(true);
      setNoteLoader(true);
      const { data } = await axios.post(`${videoNoteURL}/${videoId}`, {
        note: noteText,
        userId,
        time: Date.now(),
      });
      if (data.success) {
        setVideoData((prevState) =>
          prevState.map((video) =>
            video.id === data.videoId
              ? { ...video, notes: [...video.notes, data.newNote] }
              : { ...video }
          )
        );
        setNotesLength((prevState) => prevState + 1);
        setNoteText("");
      }
      setNoteBtnLoader(false);
      setNoteLoader(false);
    } catch (error) {
      setNoteBtnLoader(false);
      setNoteLoader(false);
      console.log({ error });
    }
  };

  const handleDeleteNote = async (videoId, noteId) => {
    try {
      setNoteLoader(true);
      const { data } = await axios.delete(
        `${videoNoteURL}/${videoId}/${noteId}`
      );
      setVideoData((prevstate) =>
        prevstate.map((video) =>
          video.id === data.saveVideo.id ? { ...data.saveVideo } : { ...video }
        )
      );
      setNotesLength((prevState) => prevState - 1);
      setNoteLoader(false);
    } catch (error) {
      setNoteLoader(false);
      console.log({ error });
    }
  };

  const convertDateToUserFriendly = (timestamp) => {
    const UTCDate = new Date(timestamp);
    return {
      date: UTCDate.toString()
        .split("T")[0]
        .split(" ")
        .slice(0, UTCDate.toString().split("T")[0].split(" ").length - 2)
        .join(" "),
      time: UTCDate.toString().split("T")[0].split(" ")[
        UTCDate.toString().split("T")[0].split(" ").length - 2
      ],
    };
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
              {noteLoader ? (
                <div
                  className={
                    theme === "dark"
                      ? `${styles.noteDisplay} ${styles.noteDisplayDark}`
                      : `${styles.noteDisplay} ${styles.noteDisplayLight}`
                  }
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader
                    type="ThreeDots"
                    color="#eee"
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                <div
                  className={
                    theme === "dark"
                      ? `${styles.noteDisplay} ${styles.noteDisplayDark}`
                      : `${styles.noteDisplay} ${styles.noteDisplayLight}`
                  }
                >
                  {reqdVideo[0].notes.length > 0 && (
                    <>
                      {reqdVideo[0].notes.map(
                        ({
                          note,
                          noteCreatedAt,
                          username,
                          _id,
                          userNoteId,
                        }) => {
                          return (
                            <div
                              className={
                                theme === "dark"
                                  ? `${styles.noteText} ${styles.noteTextDark}`
                                  : `${styles.noteText} ${styles.noteTextLight}`
                              }
                              key={_id}
                            >
                              {userNoteId === userId && (
                                <button
                                  className={styles.noteDeleteBtn}
                                  onClick={() => handleDeleteNote(id, _id)}
                                >
                                  <MdCancel />
                                </button>
                              )}
                              <p>{note}</p>
                              <div className={styles.noteDesc}>
                                <p>{username}</p>
                                <div className={styles.noteDateAndTime}>
                                  <p>
                                    {convertDateToUserFriendly(noteCreatedAt)
                                      ?.date &&
                                      convertDateToUserFriendly(noteCreatedAt)
                                        ?.date}
                                  </p>
                                  <p>
                                    {convertDateToUserFriendly(noteCreatedAt)
                                      ?.time &&
                                      convertDateToUserFriendly(noteCreatedAt)
                                        ?.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </>
                  )}
                </div>
              )}
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
                {noteBtnLoader ? (
                  <button className={`btn btn-${btnTheme} btn-sm`}>
                    <Loader
                      type="ThreeDots"
                      color="#333"
                      height={20}
                      width={20}
                    />
                  </button>
                ) : (
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
                )}
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
