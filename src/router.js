import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './page/home'
import Login from './page/login'
import Reset from './page/reset'
import Forgot from './page/forgot'


function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/forgot" element={<Forgot />} />
        </Routes>
        </BrowserRouter>
    ) 
}

export default Router