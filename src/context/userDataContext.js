import React, { createContext, useReducer, useState } from "react";
import axios from "axios";
import { backEndURL, playlistURL } from "../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reducerFunction } from "../reducer/reducerFunction";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducerFunction, {
    watchLaterVideos: [],
    likedVideos: [],
    unlikeVideos: [],
    historyVideos: [],
    playlists: [],
  });

  const fetchVideos = async ({ dispatchType, dataType, endPoint }) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backEndURL}/${endPoint}`);

      if (data.success) {
        setLoading(false);
        dispatch({
          type: dispatchType,
          payload: data[dataType],
        });
      }
    } catch (error) {
      console.log({ error });
      toast.dark(`error while fetching videos from watch later`, {
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

  const handleAddVideo = async (
    videoId,
    token,
    type,
    dispatchType,
    dataType
  ) => {
    try {
      if (token) {
        setLoading(true);
        const response = await axios.post(`${backEndURL}/${type}`, {
          video: { _id: videoId },
        });

        if (response.data.success) {
          setLoading(false);
          dispatch({
            type: dispatchType,
            payload: response.data[dataType],
          });
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

  const handleRemoveVideo = async (token, videoId, type, dispatchType) => {
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
      setLoading(true);
      const { data } = await axios.delete(`${backEndURL}/${type}/${videoId}`);

      if (data.success) {
        dispatch({
          type: dispatchType,
          payload: videoId,
        });
        setLoading(false);
        toast.dark(`removed from ${type} videos`, {
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
      response.data.success &&
        dispatch({
          type: "REMOVE_VIDEO_FROM_PLAYLIST",
          payload: response.data.savePlaylist,
        });
      console.log("deleteVideo1", { response });
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
    console.log(
      { token },
      { newPlaylistName },
      { videoId },
      { setNewPlaylistName }
    );
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
        playlist: { name: newPlaylistName, videoList: [{ _id: videoId }] },
      });

      dispatch({
        type: "ADD_NEW_PLAYLIST",
        payload: response.data.saveNewPlaylist,
      });
      setNewPlaylistName("");
      console.log({ response });
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
        video: { _id: videoId },
      });
      response.data.success &&
        dispatch({
          type: "ADD_NEW_VIDEO_TO_PLAYLIST",
          payload: response.data.savePlaylist,
        });
      console.log("deleteVideo2", { response });
    } catch (error) {
      console.log("2", { error });
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
      response.data.success &&
        dispatch({
          type: "DELETE_PLAYLIST",
          payload: response.data.deletedPlaylist._id,
        });
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
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
