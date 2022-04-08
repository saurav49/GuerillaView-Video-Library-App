import "./styles.css";
import { Navbar, VideoPage, Sidebar } from "./component/index";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import {
  Home,
  Login,
  SignUp,
  WatchLater,
  LikedVideos,
  History,
  Playlists,
  PrivateRoute,
} from "./pages/index";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useAuth } from "./hooks/index";

const App = () => {
  let { token } = useAuth();
  !token && (token = JSON.parse(localStorage?.getItem("guerillaview__token")));
  token && (axios.defaults.headers.common["Authorization"] = token);

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App">
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <PrivateRoute path="/video/:id" element={<VideoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/watch-later" element={<WatchLater />} />
        <PrivateRoute path="/history" element={<History />} />
        <PrivateRoute path="/liked-videos" element={<LikedVideos />} />
        <PrivateRoute path="/playlists" element={<Playlists />} />
      </Routes>
    </div>
  );
};

export default App;
