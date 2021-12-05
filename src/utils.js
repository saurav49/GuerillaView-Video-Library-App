import { useEffect } from "react";
import axios from "axios";
import { useData } from "./hooks/useData";
import { useUserData } from "./hooks/useUserData";

const backEndURL = `https://guerrillaViewBackend.saurav49.repl.co`;
const getALLvideosURL = `${backEndURL}/videos`;
const playlistURL = `${backEndURL}/playlist`;
const videoNoteURL = `${backEndURL}/videos/notes`;

const validator = (username, email, password) => {
  const usernameRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  const isValidUsername = usernameRegex.test(username);
  const isValidEmail = emailRegex.test(email);
  const isValidPassword = passwordRegex.test(password);

  return { isValidUsername, isValidEmail, isValidPassword };
};

const isVideoInWatchLater = (watchLaterList, videoId) => {
  return watchLaterList.find((video) => video._id === videoId) !== undefined;
};

const isVideoInHistory = (historyList, videoId) => {
  return historyList.find((video) => video._id === videoId) !== undefined;
};

const isVideoInLiked = (likedList, videoId) => {
  return likedList.find((video) => video._id === videoId) !== undefined;
};

const isVideoInPlaylist = (playlistVideoList, videoId) => {
  console.log(
    { playlistVideoList },
    { videoId },
    playlistVideoList.find((video) => video._id === videoId) !== undefined
  );
  return playlistVideoList.find((video) => video._id === videoId) !== undefined;
};

const InitializeApp = () => {
  const { setVideoData } = useData();
  const { fetchVideos } = useUserData();

  useEffect(() => {
    (async function () {
      const {
        data: { videos },
      } = await axios.get(getALLvideosURL);
      setVideoData(videos);
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
    fetchVideos({
      dispatchType: "FETCH_ALL_PLAYLIST",
      dataType: "allPlaylist",
      endPoint: "playlist",
    });
  }, []);
};

export {
  backEndURL,
  validator,
  isVideoInWatchLater,
  isVideoInHistory,
  isVideoInLiked,
  isVideoInPlaylist,
  InitializeApp,
  playlistURL,
  getALLvideosURL,
  videoNoteURL,
};
