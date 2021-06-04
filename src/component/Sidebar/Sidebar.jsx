import React from "react";
import styles from "./Sidebar.module.css";
import { FaHome } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { BsFillBookmarksFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { useTheme } from "../../context/useTheme";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(() => (theme === "dark" ? "light" : "dark"));
  };

  const btnTheme = theme === "dark" ? "light" : "dark";

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
          <a href="www.google.com">
            <FaHome className={styles.sidebarIcon} />
            <span> Home </span>
          </a>

          <a href="www.google.com">
            <FaHistory className={styles.sidebarIcon} />
            <span> History </span>
          </a>

          <a href="www.google.com">
            <BsFillBookmarksFill className={styles.sidebarIcon} />
            <span> Saved Videos </span>
          </a>

          <a href="www.google.com">
            <AiFillLike className={styles.sidebarIcon} />
            <span> Liked Videos </span>
          </a>

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
