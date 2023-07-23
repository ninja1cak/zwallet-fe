import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './page/landing_page'
import Home from './page/home'
import Login from './page/login'
import Register from './page/signup'
import Reset from './page/reset'
import Forgot from './page/forgot'
import Blank from './page/blank'
import Profile from './page/profile'
import PersonalInfo from './page/personal_info'
import Transfer from './page/transfer'
import CreatePin from "./page/create_pin";
import NavbarSide from "./component/navbarside";
import TransferD from './page/transfer_detail'
import ChangePin from "./page/change_pin_phone/changepin";
import ChangeNumber from "./page/change_pin_phone/changenumber";
import Confirmation from "./page/confirmation";
import TransactionHistory from "./page/transaction_history";
import Success from "./page/success"
import Failed from './page/failed'
import Topup from "./page/top_up";

function Router() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-pin" element={<CreatePin/>}/>
            <Route path="/create-pin/:code" element={<CreatePin/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/reset/:code" element={<Reset />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/personal_info" element={<PersonalInfo />} />
            <Route path="/change-pin" element={<ChangePin/>} />
            <Route path="/change-number" element={<ChangeNumber/>} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/navbar-side" element={<NavbarSide/>}/>
            <Route path="/transfer/:id" element={<TransferD />} />
            <Route path="/confirmation/:id" element={<Confirmation />} />
            <Route path="/history" element={<TransactionHistory />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failed" element={<Failed />} />
            <Route path="/topup" element={<Topup />} />

        </Routes>
        </BrowserRouter>
    ) 
}

export default Router