export const reducerFunction = (state, action) => {
  switch (action.type) {
    case "FETCH_WATCH_LATER_VIDEOS":
      return { ...state, watchLaterVideos: action.payload };

    case "FETCH_HISTORY_VIDEOS":
      return { ...state, historyVideos: action.payload };

    case "FETCH_LIKED_VIDEOS":
      return { ...state, likedVideos: action.payload };

    case "FETCH_ALL_PLAYLIST":
      return { ...state, playlists: action.payload };

    case "ADD_VIDEO_TO_LIKED":
      return {
        ...state,
        likedVideos: { ...action.payload },
      };

    case "ADD_VIDEO_TO_HISTORY":
      return {
        ...state,
        historyVideos: { ...action.payload },
      };

    case "ADD_VIDEO_TO_WATCHLATER":
      return {
        ...state,
        watchLaterVideos: { ...action.payload },
      };

    case "REMOVE_VIDEO_FROM_LIKED":
      return {
        ...state,
        likedVideos: {
          ...state.likedVideos,
          videos: state.likedVideos.videos.filter(
            (video) => video._id !== action.payload
          ),
        },
      };

    case "REMOVE_VIDEO_FROM_HISTORY":
      return {
        ...state,
        historyVideos: {
          ...state.historyVideos,
          videos: state.historyVideos.videos.filter(
            (video) => video._id !== action.payload
          ),
        },
      };

    case "REMOVE_VIDEO_FROM_WATCHLATER":
      return {
        ...state,
        watchLaterVideos: {
          ...state.watchLaterVideos,
          videos: state.watchLaterVideos.videos.filter(
            (video) => video._id !== action.payload
          ),
        },
      };

    case "REMOVE_VIDEO_FROM_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist._id === action.payload ? action.reqdPlaylist : playlist
        ),
      };

    case "ADD_NEW_PLAYLIST":
      return {
        ...state,
        playlists: [...state.playlists, action.payload],
      };

    case "ADD_NEW_VIDEO_TO_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist._id === action.playlistId
            ? {
                ...playlist,
                videoList: [...playlist.videoList, action.payload],
              }
            : playlist
        ),
      };

    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist._id !== action.payload
        ),
      };

    case "ADD_NOTE":
      return {
        ...state,
      };

    default:
      console.log("something went wrong in reducer function");
      return state;
  }
};
