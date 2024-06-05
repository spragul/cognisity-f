import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loginpage from "./pages/loginpage";
import SiteObservation from "./Components/siteObservation/SiteObservation";
import ListSiteObservation from "./Components/siteObservation/ListSiteObservation";
import { Forgot } from "./pages/ForgotPassword/ForgotPassword";
import Reset from "./pages/ResetPassword/ResetPassword";
import Firstpage from "./pages/Firstpage";


function App() {
const token=sessionStorage.getItem("token");

  return (
    <Routes>
      <Route path="/"  element={<Firstpage/>} />
      <Route path="/dashboard" element={<ListSiteObservation/>}/>
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/forgotpassword" element={<Forgot/>}/>
      <Route path="/resetpassword/:id/:token" element={<Reset/>}/>
      <Route path="/site/add" element={<SiteObservation/>}/>
    </Routes>
  );
}

export default App;
