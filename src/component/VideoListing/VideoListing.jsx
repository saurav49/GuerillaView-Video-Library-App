import React from "react";
import { Thumbnail } from "../Thumbnail/Thumbnail";
import { Category } from "../index";
import styles from "./VideoListing.module.css";
import { useDataContext } from "../../context/dataContext";

const VideoListing = ({ videoData }) => {
  const { currentCategory } = useDataContext();
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
        {filteredData.map(({ id, name, desc }) => {
          return <Thumbnail id={id} name={name} desc={desc} />;
        })}
      </div>
    </div>
  );
};

export { VideoListing };
