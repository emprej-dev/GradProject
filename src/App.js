import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Start from "./pages/Start";
import Faq from "./pages/Faq";
import KioskScreen from "./pages/KioskScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Start />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/kiosk" element={<KioskScreen />} /> {/* 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
