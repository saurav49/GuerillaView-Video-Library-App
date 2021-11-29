import React, { createContext, useReducer, useState } from "react";
import axios from "axios";
import { backEndURL } from "../utils";
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
    playlists: []
  });

  const fetchVideos = async ({ dispatchType, dataType, endPoint }) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backEndURL}/${endPoint}`);

      if (data.success) {
        setLoading(false);
        dispatch({
          type: dispatchType,
          payload: data[dataType]
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
        progress: undefined
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
          video: { _id: videoId }
        });

        if (response.data.success) {
          setLoading(false);
          dispatch({
            type: dispatchType,
            payload: response.data[dataType]
          });
          toast.dark(`added to ${type} videos`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
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
          progress: undefined
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
          progress: undefined
        }
      );
    }
  };

  const handleRemoveVideo = async (videoId, type, dispatchType) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${backEndURL}/${type}/${videoId}`);

      if (data.success) {
        dispatch({
          type: dispatchType,
          payload: videoId
        });
        setLoading(false);
        toast.dark(`removed from ${type} videos`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
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
        progress: undefined
      });
    }
  };

  console.log({ state });

  return (
    <UserDataContext.Provider
      value={{
        state,
        dispatch,
        fetchVideos,
        loading,
        setLoading,
        handleRemoveVideo,
        handleAddVideo
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
