import React, { useState, useEffect } from "react";
import styles from "./LikedVideos.module.css";
import { Thumbnail } from "../../component/Thumbnail/Thumbnail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme, useUserData } from "../../hooks/index";
import Loader from "react-loader-spinner";
import { EmptyComponent } from "../../component/index";
import { likedURL } from "../../urls";

const LikedVideos = () => {
  const { theme } = useTheme();
  const [localLoading, setLocalLoading] = useState(true);

  const {
    state: { likedVideos },
    populateData,
  } = useUserData();

  useEffect(() => {
    populateData({
      url: `${likedURL}`,
      dispatchType: "FETCH_LIKED_VIDEOS",
      dataEndPoint: "likedVideos",
    });
  }, []);

  useEffect(() => {
    if (likedVideos.hasOwnProperty("userId")) {
      likedVideos.videos.length > 0
        ? likedVideos.videos[0].hasOwnProperty("name")
          ? setLocalLoading(false)
          : setLocalLoading(true)
        : setLocalLoading(false);
    } else {
      setLocalLoading(true);
    }
  }, [likedVideos.videos]);

  return (
    likedVideos.hasOwnProperty("userId") &&
    (!localLoading ? (
      <div
        className={
          theme === "dark"
            ? `${styles.likedContainer} ${styles.likedDark}`
            : `${styles.likedContainer} ${styles.likedLight}`
        }
      >
        <h1>Liked Videos</h1>

        {likedVideos.videos.length > 0 ? (
          <div className={styles.likedVideos}>
            {likedVideos.videos.map(({ _id, id, name, desc, avatar }) => {
              return (
                <Thumbnail
                  key={_id}
                  videoId={_id}
                  id={id}
                  name={name}
                  desc={desc}
                  avatar={avatar}
                />
              );
            })}
          </div>
        ) : (
          <EmptyComponent
            msg="Nothing to see here"
            goToUrl="/"
            btnMsg="Go back to Home"
          />
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
    ) : (
      <div className={styles.loaderWrapper}>
        <Loader type="ThreeDots" color="#333" height={130} width={130} />
      </div>
    ))
  );
};

export { LikedVideos };
