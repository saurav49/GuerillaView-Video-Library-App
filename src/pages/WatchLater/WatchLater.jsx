import React, { useEffect, useState } from "react";
import styles from "./WatchLater.module.css";
import { Thumbnail } from "../../component/Thumbnail/Thumbnail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme, useUserData } from "../../hooks/index";
import Loader from "react-loader-spinner";
import { watchLaterURL } from "../../urls";
import { EmptyComponent } from "../../component/index";

const WatchLater = () => {
  const { theme } = useTheme();
  const [localLoading, setLocalLoading] = useState(true);

  const {
    state: { watchLaterVideos },
    populateData,
  } = useUserData();

  useEffect(() => {
    populateData({
      url: `${watchLaterURL}`,
      dispatchType: "FETCH_WATCH_LATER_VIDEOS",
      dataEndPoint: "watchLaterVideos",
    });
  }, []);

  useEffect(() => {
    if (watchLaterVideos.hasOwnProperty("userId")) {
      watchLaterVideos.videos.length > 0
        ? watchLaterVideos.videos[0].hasOwnProperty("name")
          ? setLocalLoading(false)
          : setLocalLoading(true)
        : setLocalLoading(false);
    } else {
      setLocalLoading(true);
    }
  }, [watchLaterVideos.videos]);

  return (
    watchLaterVideos.hasOwnProperty("userId") &&
    (!localLoading ? (
      <div
        className={
          theme === "dark"
            ? `${styles.watchLaterContainer} ${styles.watchLaterDark}`
            : `${styles.watchLaterContainer} ${styles.watchLaterLight}`
        }
      >
        <h1>Watch Later</h1>
        {watchLaterVideos.videos.length > 0 ? (
          <div className={styles.watchLaterVideos}>
            {watchLaterVideos.videos.map(({ _id, id, name, desc, avatar }) => {
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

export { WatchLater };
