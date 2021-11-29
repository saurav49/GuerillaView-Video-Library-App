import React, { useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import { useTheme } from "../../hooks/useTheme";
import styles from "./VideoPage.module.css";
import { useUserData } from "../../hooks/useUserData";
import { isVideoInLiked } from "../../utils";

const LikeBtn = ({ videoId, token }) => {
  const { theme } = useTheme();

  const {
    state: { likedVideos },
    fetchVideos,
    handleAddVideo,
    handleRemoveVideo
  } = useUserData();

  useEffect(() => {
    fetchVideos({
      dispatchType: "FETCH_LIKED_VIDEOS",
      dataType: "likedVideos",
      endPoint: "liked"
    });
  }, []);

  return (
    <>
      {isVideoInLiked(likedVideos, videoId) ? (
        <button
          style={{ background: "none", border: "none" }}
          onClick={() =>
            handleRemoveVideo(videoId, "liked", "REMOVE_VIDEO_FROM_LIKED")
          }
        >
          <AiFillLike
            style={{ color: "#2563EB" }}
            className={
              theme === "dark"
                ? `${styles.videoIcon} ${styles.videoIconDark}`
                : `${styles.videoIcon} ${styles.videoIconLight}`
            }
          />
        </button>
      ) : (
        <button
          style={{ background: "none", border: "none" }}
          onClick={() =>
            handleAddVideo(
              videoId,
              token,
              "liked",
              "ADD_VIDEO_TO_LIKED",
              "saveLikedVideo"
            )
          }
        >
          <AiFillLike
            className={
              theme === "dark"
                ? `${styles.videoIcon} ${styles.videoIconDark}`
                : `${styles.videoIcon} ${styles.videoIconLight}`
            }
          />
        </button>
      )}
    </>
  );
};

export { LikeBtn };