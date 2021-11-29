import "./styles.css";
import { Navbar } from "./component/Navbar/Navbar";
import { Sidebar } from "./component/Sidebar/Sidebar";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  SignUp,
  WatchLater,
  LikedVideos,
  History
} from "./pages/index";
import { PrivateRoute } from "./pages/PrivateRoute";
import { VideoPage, Modal } from "./component/index";
import { InitializeApp } from "./utils";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { token } = useAuth();

  InitializeApp();

  return (
    <div className="App">
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Modal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute
          isLogin={token ? true : false}
          path="/watch-later"
          element={<WatchLater />}
        />
        <PrivateRoute
          isLogin={token ? true : false}
          path="/history"
          element={<History />}
        />
        <PrivateRoute
          isLogin={token ? true : false}
          path="/liked-videos"
          element={<LikedVideos />}
        />
      </Routes>
    </div>
  );
};

export default App;
