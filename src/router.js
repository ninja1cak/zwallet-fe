import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './page/home'
import Login from './page/login'


function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        </BrowserRouter>
    ) 
}

export default Router