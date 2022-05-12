import { useEffect } from "react";
import axios from "axios";
import { useData } from "./hooks/useData";
import { useUserData } from "./hooks/useUserData";
import { getALLvideosURL } from "./urls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validator = (email, password) => {
  // const usernameRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  // const isValidUsername = usernameRegex.test(username);
  const isValidEmail = emailRegex.test(email);
  const isValidPassword = passwordRegex.test(password);

  return { isValidEmail, isValidPassword };
};

const isVideoInWatchLater = (watchLaterList, videoId) => {
  if (watchLaterList.hasOwnProperty("userId")) {
    if (watchLaterList.videos.length > 0) {
      return (
        watchLaterList.videos.find((video) => video._id === videoId) !==
        undefined
      );
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const isVideoInHistory = (historyList, videoId) => {
  const condition =
    historyList.hasOwnProperty("userId") && historyList.videos.length > 0;

  return condition
    ? historyList.videos.find((video) => video._id === videoId) !== undefined
    : false;
};

const isVideoInLiked = (likedList, videoId) => {
  const condition =
    likedList.hasOwnProperty("userId") && likedList.videos.length > 0;

  return condition
    ? likedList.videos.find((video) => video._id === videoId) !== undefined
    : false;
};

const isVideoInPlaylist = (playlistVideoList, videoId) => {
  const condition =
    playlistVideoList.hasOwnProperty("userId") &&
    playlistVideoList.videos.length > 0;

  return condition
    ? playlistVideoList.videos.find((video) => video._id === videoId) !==
        undefined
    : false;
};

const InitializeApp = () => {
  const { setVideoData } = useData();
  const { fetchVideos, fetchAllPlaylist } = useUserData();

  useEffect(() => {
    (async function () {
      try {
        const {
          data: { videos },
        } = await axios.get(getALLvideosURL);
        setVideoData(videos);
      } catch (error) {
        toast.error(
          `error while loading videos, don't worry we are woking on it`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    fetchVideos({
      dispatchType: "FETCH_WATCH_LATER_VIDEOS",
      dataType: "watchLaterVideos",
      endPoint: "watchLater",
    });
  }, []);

  useEffect(() => {
    fetchVideos({
      dispatchType: "FETCH_HISTORY_VIDEOS",
      dataType: "historyVideos",
      endPoint: "history",
    });
  }, []);

  useEffect(() => {
    fetchVideos({
      dispatchType: "FETCH_LIKED_VIDEOS",
      dataType: "likedVideos",
      endPoint: "liked",
    });
  }, []);

  useEffect(() => {
    fetchAllPlaylist({
      dispatchType: "FETCH_ALL_PLAYLIST",
    });
  }, []);
};

export {
  validator,
  isVideoInWatchLater,
  isVideoInHistory,
  isVideoInLiked,
  isVideoInPlaylist,
  InitializeApp,
};
