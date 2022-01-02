import React, { useState } from "react";
import styles from "./Login.module.css";
import { useTheme } from "../../hooks/useTheme";
import {
  AiOutlineEyeInvisible,
  BsEye,
  RiLoginCircleFill,
} from "../../Icons/Icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";

const Login = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const btnTheme = theme === "dark" ? "light" : "dark";
  const defaultUser = { email: "user1@gmail.com", password: "Users49!" };

  const { handleLogin, isAuthLoading } = useAuth();

  const [email, setEmail] = useState(defaultUser.email);
  const [password, setPassword] = useState(defaultUser.password);
  const [togglePassword, setTogglePassword] = useState(false);

  const handleUserCredentials = async () => {
    const backendResponse = await handleLogin(email, password);

    if (backendResponse) {
      setEmail("");
      setPassword("");
      setTogglePassword(false);
    }
  };

  const handleGoToSignUpPage = () => {
    navigate("/signup");
  };

  return (
    <>
      <div
        className={
          theme === "dark"
            ? `${styles.loginContainer} ${styles.loginContainerDark}`
            : `${styles.loginContainer} ${styles.loginContainerLight}`
        }
      >
        <div
          className={
            theme === "dark"
              ? `${styles.loginDiv} ${styles.loginDivDark}`
              : `${styles.loginDiv} ${styles.loginDivLight}`
          }
        >
          <div className={styles.loginBrandDiv}>
            <img
              src={`https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/PWG_Logo.svg/800px-PWG_Logo.svg.png`}
              alt="brand"
              className={styles.brandImg}
            />
            <p className={styles.loginBrandName}>Welcome to Guerrilla View</p>
          </div>

          <div className={styles.inputDiv}>
            <div
              className={
                theme === "dark"
                  ? `${styles.input} ${styles.inputDark}`
                  : `${styles.input} ${styles.inputLight}`
              }
            >
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className={
                theme === "dark"
                  ? `${styles.input} ${styles.inputDark}`
                  : `${styles.input} ${styles.inputLight}`
              }
            >
              <label htmlFor="Password">Password</label>
              <input
                type={togglePassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {togglePassword ? (
                <AiOutlineEyeInvisible
                  onClick={(togglePassword) =>
                    setTogglePassword((togglePassword) => !togglePassword)
                  }
                  className={styles.inputIcon}
                />
              ) : (
                <BsEye
                  onClick={(togglePassword) =>
                    setTogglePassword((togglePassword) => !togglePassword)
                  }
                  className={styles.inputIcon}
                />
              )}
            </div>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleUserCredentials}
            className={`btn btn-${btnTheme}`}
          >
            {isAuthLoading ? (
              <Loader type="ThreeDots" color="#333" height={30} width={30} />
            ) : (
              <>
                <span>Login</span>
                <RiLoginCircleFill
                  style={{ marginLeft: "0.5em", fontSize: "0.9rem" }}
                />
              </>
            )}
          </button>
          <p className={styles.loginMsg}>
            Not Register? <span onClick={handleGoToSignUpPage}>SIGNUP</span>
          </p>

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
      </div>
    </>
  );
};

export { Login };
