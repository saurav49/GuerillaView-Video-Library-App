import { useState, useEffect } from "react";
import styles from "./Playlists.module.css";
import { useTheme, useUserData, useAuth } from "../../hooks/index";
import axios from "axios";
import { playlistURL } from "../../urls";
import { Thumbnail } from "../../component/Thumbnail/Thumbnail";

const Playlists = () => {
  const { theme } = useTheme();
  const {
    state: { playlists },
  } = useUserData();
  const { userId } = useAuth();
  const [allPlaylistVids, setAllPlaylistVids] = useState([]);

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
  }, [playlists]);

  console.log({ playlists }, { allPlaylistVids });

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
                          <div style={{ margin: "1em" }}>
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
      </div>
    </div>
  );
};

export { Playlists };
