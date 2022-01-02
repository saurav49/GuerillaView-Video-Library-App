import React, { useEffect, useState } from "react";
import styles from "./History.module.css";
import { Thumbnail, EmptyComponent } from "../../component/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme, useUserData } from "../../hooks/index";
import { historyURL } from "../../urls";
import Loader from "react-loader-spinner";

const History = () => {
  const { theme } = useTheme();
  const {
    state: { historyVideos },
    populateData,
  } = useUserData();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    populateData({
      url: `${historyURL}`,
      dispatchType: "FETCH_HISTORY_VIDEOS",
      dataEndPoint: "historyVideos",
    });
  }, []);

  useEffect(() => {
    if (historyVideos.hasOwnProperty("userId")) {
      historyVideos.videos.length > 0
        ? historyVideos.videos[0].hasOwnProperty("name")
          ? setLocalLoading(false)
          : setLocalLoading(true)
        : setLocalLoading(false);
    } else {
      setLocalLoading(true);
    }
  }, [historyVideos.videos]);

  return (
    historyVideos.hasOwnProperty("userId") &&
    (!localLoading ? (
      <div
        className={
          theme === "dark"
            ? `${styles.historyContainer} ${styles.historyDark}`
            : `${styles.historyContainer} ${styles.historyLight}`
        }
      >
        <h1>History</h1>
        {historyVideos.videos.length > 0 ? (
          <div className={styles.historyVideos}>
            {historyVideos.videos
              .slice(0)
              .reverse()
              .map(({ _id, id, name, desc, avatar }) => {
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

export { History };
