import { useState, useEffect } from "react";
import styles from "./Playlists.module.css";
import { useTheme, useUserData, useAuth } from "../../hooks/index";
import axios from "axios";
import { playlistURL } from "../../urls";
import { Thumbnail } from "../../component/Thumbnail/Thumbnail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Playlists = () => {
  const { theme } = useTheme();
  const {
    state: { playlists },
    fetchAllPlaylist,
  } = useUserData();
  const { userId } = useAuth();
  const [allPlaylistVids, setAllPlaylistVids] = useState([]);

  useEffect(() => {
    fetchAllPlaylist({
      dispatchType: "FETCH_ALL_PLAYLIST",
    });
  }, []);

  useEffect(() => {
    (async function () {
      try {
        if (playlists.length === 0) {
          return setAllPlaylistVids([]);
        }
        const response = await axios.get(`${playlistURL}/getAllVids/${userId}`);
        setAllPlaylistVids(response.data.populatePlaylistVids);
      } catch (error) {
        console.log({ error });
      }
    })();
  }, [playlists.length]);

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.playlistsContainer} ${styles.playlistsDark}`
          : `${styles.playlistsContainer} ${styles.playlistsLight}`
      }
    >
      <h1>My Playlists</h1>
      <div>
        {allPlaylistVids.length > 0 ? (
          allPlaylistVids.map((playlist) => {
            return (
              <div
                className={
                  theme === "dark"
                    ? `${styles.playlistsWrapper} ${styles.playlistWrapperDark}`
                    : `${styles.playlistsWrapper} ${styles.playlistWrapperLight}`
                }
                key={playlist._id}
              >
                <p className={styles.playlistName}>{playlist.name}</p>
                {playlist.videoList.length > 0 ? (
                  <div
                    className={styles.playlistVidsWrapper}
                    key={playlist._id}
                  >
                    {playlist.videoList.map(
                      ({ _id, id, name, desc, avatar }) => {
                        return (
                          <div style={{ margin: "1em" }} key={_id}>
                            <Thumbnail
                              key={_id}
                              videoId={_id}
                              id={id}
                              name={name}
                              desc={desc}
                              avatar={avatar}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div className={styles.playlistMsg}>
                    <p>No Videos in this playlist</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div
            className={
              theme === "dark"
                ? `${styles.playlistsWrapper} ${styles.playlistWrapperDark}`
                : `${styles.playlistsWrapper} ${styles.playlistWrapperLight}`
            }
          >
            <h1
              style={{ margin: "0em", padding: "2em 0em", textAlign: "center" }}
            >
              No Playlist Here!
            </h1>
          </div>
        )}
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
        {/* Same as */}
        <ToastContainer />
      </div>
    </div>
  );
};

export { Playlists };
