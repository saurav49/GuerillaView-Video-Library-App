import React from "react";
import styles from "./Sidebar.module.css";
import {
  FaHome,
  FaSun,
  BsMoon,
  FaHistory,
  BsFillBookmarksFill,
  AiFillLike,
  CgPlayList,
} from "../../Icons/Icons";
import { useTheme } from "../../hooks/index";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(() => (theme === "dark" ? "light" : "dark"));
  };

  const btnTheme = theme === "dark" ? "light" : "dark";
  const navigate = useNavigate();

  const handleGoToPage = (type) => {
    switch (type) {
      case "home":
        navigate("/");
        break;
      case "likedVideos":
        navigate("/liked-videos");
        break;
      case "watchLater":
        navigate("/watch-later");
        break;
      case "history":
        navigate("/history");
        break;
      case "playlists":
        navigate("/playlists");
        break;
      default:
        console.log("no route");
    }
  };

  return (
    <>
      {showSidebar && (
        <div
          className={styles.menu}
          onClick={() => setShowSidebar(!showSidebar)}
        ></div>
      )}
      <div
        className={
          showSidebar === true
            ? `${styles.showSidebar} ${styles.sidebarToggle}`
            : `${styles.showSidebar}`
        }
      >
        <aside
          className={
            theme === "dark" ? styles.sidebarDark : styles.sidebarLight
          }
        >
          <div onClick={() => handleGoToPage("home")}>
            <FaHome className={styles.sidebarIcon} />
            <span> Home </span>
          </div>

          <div onClick={() => handleGoToPage("history")}>
            <FaHistory className={styles.sidebarIcon} />
            <span> History </span>
          </div>

          <div onClick={() => handleGoToPage("watchLater")}>
            <BsFillBookmarksFill className={styles.sidebarIcon} />
            <span> Watch Later </span>
          </div>

          <div onClick={() => handleGoToPage("likedVideos")}>
            <AiFillLike className={styles.sidebarIcon} />
            <span> Liked Videos </span>
          </div>

          <div onClick={() => handleGoToPage("playlists")}>
            <CgPlayList className={styles.sidebarIcon} />
            <span> My Playlists </span>
          </div>

          {showSidebar && (
            <div>
              <button
                onClick={handleThemeChange}
                className={
                  theme === "dark"
                    ? styles.sidebarBtnDark
                    : styles.sidebarBtnLight
                }
              >
                {theme === "dark" ? <FaSun /> : <BsMoon />}
              </button>
            </div>
          )}

          {showSidebar && (
            <div>
              <button className={`btn btn-${btnTheme}`}>LOGIN</button>
            </div>
          )}
        </aside>
      </div>
    </>
  );
};

export { Sidebar };
