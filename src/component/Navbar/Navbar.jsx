import React from "react";
import { FaSun } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "./Navbar.module.css";

import { useTheme } from "../../context/useTheme";

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(() => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <div className={styles.nav_fixed}>
      <div className={`nav-container nav-container-${theme}`}>
        <nav className={styles.navbar}>
          <div className={styles.brandContainer}>
            <GiHamburgerMenu
              onClick={() => setShowSidebar((value) => !value)}
              className={styles.hamburgerImg}
            />
            <div className={`brand`}>
              <img
                src={`https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/PWG_Logo.svg/800px-PWG_Logo.svg.png`}
                alt="brand"
                className={styles.brandImg}
              />
              <h1 className={styles.brandTitle}>GUERRILLA VIEW</h1>
            </div>
          </div>

          <ul className={`nav-list`}>
            <li
              className={`nav-item`}
              style={{ margin: "0.2em 2em 0em 0em", cursor: "pointer" }}
            >
              <a
                href="www.google.com"
                className={`nav-link nav-link-btn-${theme}`}
              >
                LOGIN
              </a>
            </li>
            <button
              onClick={handleThemeChange}
              className={
                theme === "dark" ? styles.themeBtnDark : styles.themeBtnLight
              }
            >
              {theme === "dark" ? <FaSun /> : <BsMoon />}
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export { Navbar };
