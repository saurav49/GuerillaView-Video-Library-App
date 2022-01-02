import React, { useState } from "react";
import styles from "../Login/Login.module.css";
import { useTheme } from "../../hooks/useTheme";
import { BsPeopleFill, BsEye, AiOutlineEyeInvisible } from "../../Icons/Icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const btnTheme = theme === "dark" ? "light" : "dark";

  const { error, handleSignUp } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  const handleUserCredentials = async () => {
    const backendResponse = await handleSignUp(
      username,
      email,
      password,
      confirmPassword
    );

    if (backendResponse) {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      togglePassword(false);
    }
  };

  const handleGoToLoginPage = () => {
    navigate("/login");
  };

  return (
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
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
                className={styles.inputIcon}
                onClick={(togglePassword) =>
                  setTogglePassword((togglePassword) => !togglePassword)
                }
              />
            ) : (
              <BsEye
                className={styles.inputIcon}
                onClick={(togglePassword) =>
                  setTogglePassword((togglePassword) => !togglePassword)
                }
              />
            )}
          </div>
          <div
            className={
              theme === "dark"
                ? `${styles.input} ${styles.inputDark}`
                : `${styles.input} ${styles.inputLight}`
            }
          >
            <label htmlFor="Confirm Password">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={`btn btn-${btnTheme}`}
          onClick={handleUserCredentials}
        >
          <span>SignUp</span>
          <BsPeopleFill style={{ marginLeft: "0.5em", fontSize: "0.9rem" }} />
        </button>
        <p className={styles.loginMsg}>
          Already Have an Account?
          <span onClick={handleGoToLoginPage}> LOGIN </span>
        </p>
        {error && <p className={styles.loginMsg}> {error} </p>}
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
  );
};

export { SignUp };
