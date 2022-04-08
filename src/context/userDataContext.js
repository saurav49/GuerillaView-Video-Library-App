import React, { createContext, useReducer, useState } from "react";
import axios from "axios";
import { backEndURL, playlistURL } from "../urls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reducerFunction } from "../reducer/reducerFunction";
import { useAuth } from "../hooks/index";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  const [state, dispatch] = useReducer(reducerFunction, {
    watchLaterVideos: {},
    likedVideos: {},
    unlikeVideos: {},
    historyVideos: {},
    playlists: [],
  });

  const populateData = async ({ url, dispatchType, dataEndPoint }) => {
    try {
      const { data } = await axios.get(`${url}/${userId}`);
      if (data.success) {
        dispatch({
          type: dispatchType,
          payload: data[dataEndPoint],
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchVideos = async ({ dispatchType, dataType, endPoint }) => {
    try {
      if (!JSON.parse(localStorage?.getItem("guerillaview__token"))) {
        console.log(JSON.parse(localStorage?.getItem("guerillaview__token")));
        return;
      }
      const { data } = await axios.post(`${backEndURL}/${endPoint}`, {
        userId: userId,
      });

      if (data.success) {
        dispatch({
          type: dispatchType,
          payload: data[dataType],
        });
      }
    } catch (error) {
      console.log({ error });
      // toast.dark(`error while fetching ${dataType}`, {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    }
  };

  const fetchAllPlaylist = async ({ dispatchType }) => {
    try {
      if (userId) {
        const { data } = await axios.get(`${playlistURL}/user/${userId}`);

        if (data.success) {
          dispatch({
            type: dispatchType,
            payload: data.allPlaylist,
          });
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleAddVideo = async (
    videoId,
    token,
    type,
    dispatchType,
    dataType
  ) => {
    try {
      if (token) {
        const response = await axios.post(`${backEndURL}/${type}/${userId}`, {
          video: { _id: videoId },
        });

        if (response.data.success) {
          dispatch({
            type: dispatchType,
            payload: response.data[dataType],
          });
          if (dispatchType === "ADD_VIDEO_TO_HISTORY") return;
          toast.dark(`added to ${type} videos`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.dark(`you are not signed in, please sign in to continue`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log("watchlater", error);
      toast.dark(
        `error while adding video to ${type} videos, please try again`,
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
    }
  };

  const handleRemoveVideo = async (videoId, type, dispatchType) => {
    try {
      const { data } = await axios.delete(`${backEndURL}/${type}/${userId}`, {
        data: { video: `${videoId}` },
      });

      if (data.success) {
        dispatch({
          type: dispatchType,
          payload: videoId,
        });
        toast.dark(`removed from ${type} videos`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.dark(`${data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.dark(`error while removing video from ${type} videos`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleRemoveVideoFromPlaylist = async (token, playlistId, videoId) => {
    try {
      if (!token) {
        toast.dark(`you are not signed in, please sign in to continue`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      const response = await axios.delete(
        `${playlistURL}/${playlistId}/${videoId}`
      );
      if (response.data.success) {
        dispatch({
          type: "REMOVE_VIDEO_FROM_PLAYLIST",
          payload: response.data.playlistId,
          reqdPlaylist: response.data.savePlaylist,
        });
        toast.dark(`video removed from playlist`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log("1", { error });
    }
  };

  const handleAddNewPlaylist = async (
    token,
    newPlaylistName,
    videoId,
    setNewPlaylistName
  ) => {
    try {
      if (!token) {
        toast.dark(`you are not signed in, please sign in to continue`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      }
      if (newPlaylistName === "") return;

      const response = await axios.post(playlistURL, {
        playlistInfo: { userId, name: newPlaylistName, videoId },
      });

      dispatch({
        type: "ADD_NEW_PLAYLIST",
        payload: response.data.playlists,
      });
      toast.dark(`playlist ${response.data.playlists.name} created`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setNewPlaylistName("");
    } catch (error) {
      console.log({ error });
    }
  };

  const handleAddVideoToPlaylist = async (token, playlistId, videoId) => {
    try {
      if (!token) {
        toast.dark(`you are not signed in, please sign in to continue`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      const response = await axios.post(`${playlistURL}/${playlistId}`, {
        video: videoId,
      });

      if (response.data.success) {
        dispatch({
          type: "ADD_NEW_VIDEO_TO_PLAYLIST",
          payload: response.data.videoId,
          playlistId: response.data.playlistId,
        });
        toast.dark(`video added to playlist ${response.data.playlist.name}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeletePlaylist = async (token, playlistId) => {
    try {
      if (!token) {
        toast.dark(`you are not signed in, please sign in to continue`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      }
      const response = await axios.delete(`${playlistURL}/${playlistId}`);

      if (response.data.success) {
        dispatch({
          type: "DELETE_PLAYLIST",
          payload: response.data.deletedPlaylistId,
        });
        toast.dark(`playlist deleted`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  // console.log({ state });

  return (
    <UserDataContext.Provider
      value={{
        state,
        dispatch,
        fetchVideos,
        loading,
        setLoading,
        handleRemoveVideo,
        handleAddVideo,
        handleRemoveVideoFromPlaylist,
        handleAddNewPlaylist,
        handleAddVideoToPlaylist,
        handleDeletePlaylist,
        populateData,
        fetchAllPlaylist,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
