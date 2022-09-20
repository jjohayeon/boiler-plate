import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Navbar from "./views/NavBar/Navbar";
import LandingPage from "./views/LandingPage/LandingPage";
import Auth from "../hoc/Auth";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
          <Routes>
            <Route path="/" element={Auth(LandingPage, null)} />
            <Route path="/login" element={Auth(LoginPage, null)} />
            <Route path="/register" element={Auth(RegisterPage, null)} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
