import { useState, useEffect } from "react";
import styles from "./Playlists.module.css";
import { useTheme, useUserData } from "../../hooks/index";
import axios from "axios";
import { playlistURL } from "../../utils";
import { Thumbnail } from "../../component/Thumbnail/Thumbnail";

const Playlists = () => {
  const { theme } = useTheme();
  const {
    state: { playlists },
  } = useUserData();
  const [allPlaylistVids, setAllPlaylistVids] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${playlistURL}/playlistVids`);
        console.log({ response });
        setAllPlaylistVids(response.data.allPlaylistVids);
      } catch (error) {
        console.log({ error });
      }
    })();
  }, [playlists]);

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
        {allPlaylistVids.length > 0 &&
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
                      ({ _id: { _id, id, name, desc, avatar } }) => {
                        return (
                          <>
                            <Thumbnail
                              key={_id}
                              videoId={_id}
                              id={id}
                              name={name}
                              desc={desc}
                              avatar={avatar}
                            />
                          </>
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
          })}
      </div>
    </div>
  );
};

export { Playlists };
