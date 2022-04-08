import React, { createContext, useContext, useState } from "react";
import { validator } from "../utils";
import { backEndURL } from "../urls";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedToken =
    JSON.parse(localStorage?.getItem("guerillaview__token")) || null;
  const id = JSON.parse(localStorage?.getItem("guerillaview__userId")) || "";

  const navigate = useNavigate();
  const { state } = useLocation();

  const [error, setError] = useState("");
  const [token, setToken] = useState(savedToken);
  const [userId, setUserId] = useState(id);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const handleSignUp = (username, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setError("password and confirm password doesnot match");
    } else {
      const { isValidEmail, isValidPassword } = validator(email, password);

      if (!isValidEmail || !isValidPassword) {
        !isValidEmail && setError("use valid email id");
        !isValidPassword &&
          setError(
            "password should have between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
          );
      } else {
        (async function () {
          try {
            setIsAuthLoading(true);
            const response = await axios.post(`${backEndURL}/users/signup`, {
              user: { username, email, password },
            });

            console.log("new user created", { response });
            if (response.data.success) {
              setIsAuthLoading(false);
              toast.dark(
                `${response.data.user.username} has successfully signed in`,
                {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );

              localStorage?.setItem(
                "guerillaview__token",
                JSON.stringify(response.data.token)
              );
              localStorage?.setItem(
                "guerillaview__userId",
                JSON.stringify(response.data.user._id)
              );
              setToken(response.data.token);
              setUserId(response.data.user._id);

              setTimeout(() => {
                navigate("/");
              }, 1500);

              return response.data.success;
            }
          } catch (error) {
            toast.dark(`error while signing`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })();

        setError("");
      }
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setIsAuthLoading(true);
      const response = await axios.post(`${backEndURL}/users/login`, {
        user: { email, password },
      });

      if (response.data.success) {
        loginUser(response.data);
        return response.data.success;
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
        progress: undefined,
      });

      console.log({ error });
    }
  };

  const loginUser = ({ token, user }) => {
    localStorage?.setItem("guerillaview__token", JSON.stringify(token));
    localStorage?.setItem("guerillaview__userId", JSON.stringify(user._id));
    setToken(token);
    setUserId(user._id);
    setIsAuthLoading(false);

    toast.dark(`${user.username} has successfully logged in`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      navigate(state?.from ? state.from : "/");
    }, 1000);
  };

  const handleLogOut = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("guerillaview__token");
    localStorage.removeItem("guerillaview__userId");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <AuthContext.Provider
      value={{
        error,
        setError,
        token,
        userId,
        handleSignUp,
        handleLogin,
        handleLogOut,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
