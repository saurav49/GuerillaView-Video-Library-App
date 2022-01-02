import React from "react";
import { FaSun, BsMoon, GiHamburgerMenu } from "../../Icons/Icons";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useTheme, useAuth } from "../../hooks/index";

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const { theme, setTheme } = useTheme();
  const { token, handleLogOut } = useAuth();

  const btnTheme = theme === "dark" ? "light" : "dark";

  const navigate = useNavigate();

  const handleThemeChange = () => {
    setTheme(() => (theme === "dark" ? "light" : "dark"));
  };

  const handleGoToLoginPage = () => {
    navigate("/login");
  };

  const handleGoToHomePage = () => {
    navigate("/");
  };

  return (
    <div className={styles.nav_fixed}>
      <div className={`nav-container nav-container-${theme}`}>
        <nav className={styles.navbar}>
          <div className={styles.brandContainer}>
            <button
              onClick={() => setShowSidebar((value) => !value)}
              className={
                theme === "dark"
                  ? `${styles.hamburgerBtn} ${styles.hamburgerBtnDark}`
                  : `${styles.hamburgerBtn} ${styles.hamburgerBtnLight}`
              }
            >
              <GiHamburgerMenu />
            </button>
            <div className={`brand`} onClick={handleGoToHomePage}>
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
              {token ? (
                <button
                  onClick={handleLogOut}
                  className={`btn btn-${btnTheme}`}
                >
                  LOGOUT
                </button>
              ) : (
                <button
                  onClick={handleGoToLoginPage}
                  className={`btn btn-${btnTheme}`}
                >
                  LOGIN
                </button>
              )}
            </li>
            <button
              onClick={handleThemeChange}
              style={{ marginTop: "0.35em" }}
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
