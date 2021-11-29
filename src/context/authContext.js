import React, { createContext, useContext, useState } from "react";
import { backEndURL, validator } from "../utils";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { token: savedToken } = JSON.parse(localStorage?.getItem("login")) || {
    token: null
  };

  const navigate = useNavigate();
  const { state } = useLocation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(savedToken);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError("password and confirm password doesnot match");
    } else {
      const { isValidUsername, isValidEmail, isValidPassword } = validator(
        username,
        email,
        password
      );

      if (!isValidUsername || !isValidEmail || !isValidPassword) {
        !isValidUsername &&
          setError(
            " username should have between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
          );

        !isValidEmail && setError("use valid email id");
        !isValidPassword &&
          setError(
            "password should have between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
          );
      } else {
        (async function () {
          try {
            const response = await axios.post(`${backEndURL}/users/signup`, {
              user: { username, email, password }
            });

            console.log("new user created", { response });
            if (response.data.success) {
              toast.dark(
                `${response.data.savedUser.username} has successfully signed in`,
                {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined
                }
              );

              setTimeout(() => {
                navigate("/login");
              }, 3000);
            }
          } catch (error) {
            toast.dark(`error while signing`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          }
        })();

        // clear input fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backEndURL}/users/login`, {
        user: { email, password }
      });

      // clear input fields
      setEmail("");
      setPassword("");

      if (response.data.success) {
        loginUser(response.data);
      }
    } catch (error) {
      alert("error while login");

      toast.dark(`Error in Logging, please try again`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      console.log({ error });
    }
  };

  const loginUser = ({ token, username }) => {
    var storage = localStorage?.setItem("login", JSON.stringify({ token }));
    setToken(token);
    toast.dark(`${username} has successfully logged in`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    setTimeout(() => {
      navigate(state?.from ? state.from : "/");
    }, 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        setError,
        togglePassword,
        setTogglePassword,
        token,
        handleSignUp,
        handleLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
