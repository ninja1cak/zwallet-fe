import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './page/landing_page'
import Home from './page/home'
import Login from './page/login'
import Register from './page/signup'
import Reset from './page/reset'
import Forgot from './page/forgot'
import Blank from './page/blank'
import Transfer from './page/transfer'


function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/reset" element={<Reset />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/transfer" element={<Transfer />} />
        </Routes>
        </BrowserRouter>
    ) 
}

export default Router