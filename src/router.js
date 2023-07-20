import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './page/landing_page'
import Home from './page/home'
import Login from './page/login'
import Reset from './page/reset'
import Forgot from './page/forgot'
import Blank from './page/blank'
import Profile from './page/profile'


function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
        </BrowserRouter>
    ) 
}

export default Router