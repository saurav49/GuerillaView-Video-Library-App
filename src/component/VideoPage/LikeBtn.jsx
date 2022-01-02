import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useTheme } from "../../hooks/useTheme";
import styles from "./VideoPage.module.css";
import { useUserData } from "../../hooks/useUserData";
import { isVideoInLiked } from "../../utils";

const LikeBtn = ({ videoId }) => {
  const { theme } = useTheme();
  const token = JSON.parse(localStorage.getItem("token"));

  const {
    state: { likedVideos },
    fetchVideos,
    handleAddVideo,
    handleRemoveVideo,
  } = useUserData();

  useEffect(() => {
    fetchVideos({
      dispatchType: "FETCH_LIKED_VIDEOS",
      dataType: "likedVideos",
      endPoint: "liked",
    });
  }, []);

  return (
    <>
      {isVideoInLiked(likedVideos, videoId) ? (
        <button
          style={{ background: "none", border: "none", cursor: "pointer" }}
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
          style={{ background: "none", border: "none", cursor: "pointer" }}
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
