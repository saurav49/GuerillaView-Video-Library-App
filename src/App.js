import "./styles.css";
import { Navbar } from "./component/Navbar/Navbar";
import { Sidebar } from "./component/Sidebar/Sidebar";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/index";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App">
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
