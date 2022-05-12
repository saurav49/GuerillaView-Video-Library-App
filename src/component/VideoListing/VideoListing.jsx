import React from "react";
import { Thumbnail } from "../Thumbnail/Thumbnail";
import { Category } from "../index";
import styles from "./VideoListing.module.css";
import { useData } from "../../hooks/useData";

const VideoListing = ({ videoData }) => {
  const { currentCategory } = useData();
  let filteredData;

  if (currentCategory === "All") {
    filteredData = videoData;
  } else {
    filteredData = videoData.filter(
      (data) => data.category === currentCategory
    );
  }

  return (
    <div className={styles.videoListingDiv}>
      <Category />
      <div className={styles.videoListing}>
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map(({ _id, id, name, desc, avatar, notes }) => {
            return (
              <Thumbnail
                key={_id}
                videoId={_id}
                id={id}
                name={name}
                desc={desc}
                avatar={avatar}
                notes={notes}
              />
            );
          })
        ) : (
          <h1>No videos available</h1>
        )}
      </div>
    </div>
  );
};

export { VideoListing };
