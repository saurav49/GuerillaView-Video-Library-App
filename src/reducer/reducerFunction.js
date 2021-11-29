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
        likedVideos: [...state.likedVideos, { ...action.payload }]
      };

    case "ADD_VIDEO_TO_HISTORY":
      return {
        ...state,
        historyVideos: [...state.historyVideos, { ...action.payload }]
      };

    case "ADD_VIDEO_TO_WATCHLATER":
      return {
        ...state,
        watchLaterVideos: [...state.watchLaterVideos, { ...action.payload }]
      };

    case "REMOVE_VIDEO_FROM_LIKED":
      return {
        ...state,
        likedVideos: state.likedVideos.filter(
          (video) => video._id !== action.payload
        )
      };

    case "REMOVE_VIDEO_FROM_HISTORY":
      return {
        ...state,
        historyVideos: state.historyVideos.filter(
          (video) => video._id !== action.payload
        )
      };

    case "REMOVE_VIDEO_FROM_WATCHLATER":
      return {
        ...state,
        watchLaterVideos: state.watchLaterVideos.filter(
          (video) => video._id !== action.payload
        )
      };

    default:
      console.log("something went wrong in reducer function");
      return state;
  }
};
