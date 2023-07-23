import React from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import NavbarSide from "../../component/navbarside";

function Topup() {
    return (
        <div className="flex flex-col min-h-screen">
        <div className="hidden lg:block"><Header/></div>
        <div className="flex-grow bg-gray-200 flex flex-row justify-normal pt-5 w-full  gap-x-10">
            <div className="hidden lg:block ml-10">
            <NavbarSide/>
            </div>
            <div className="w-2/3 bg-white rounded-lg px-5 py-5 flex flex-col gap-y-5">
                <h1 className="font-bold ">
                    How To Top Up
                </h1>
                <div className="bg-white drop-shadow-lg rounded-lg px-5 py-8 flex flex-row gap-x-5">
                    <span className="font-bold text-primary">1</span>
                    <p>Go to the nearest ATM or you can use E-Banking.</p>
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg px-5 py-8 flex flex-row gap-x-5">
                    <span className="font-bold text-primary">2</span>
                    <p>Type your security number on the ATM or E-Banking.</p>
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg px-5 py-8 flex flex-row gap-x-5">
                    <span className="font-bold text-primary">3</span>
                    <p>Select “Transfer” in the menu.</p>
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg px-5 py-8 flex flex-row gap-x-5">
                    <span className="font-bold text-primary">4</span>
                    <p>Type the virtual account number that we provide you at the top.</p>
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg px-5 py-8 flex flex-row gap-x-5">
                    <span className="font-bold text-primary">5</span>
                    <p>Type the amount of the money you want to top up.</p>
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg px-5 py-8 flex flex-row gap-x-5">
                    <span className="font-bold text-primary">6</span>
                    <p>Read the summary details</p>
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg px-5 py-8 flex flex-row gap-x-5">
                    <span className="font-bold text-primary">7</span>
                    <p>Press transfer / top up.</p>
                </div>
                <div className="bg-white drop-shadow-lg rounded-lg px-5 py-8 flex flex-row gap-x-5">
                    <span className="font-bold text-primary">8</span>
                    <p>You can see your money in Zwallet within 3 hours.</p>
                </div>

            </div>
        </div>
        <div className="hidden lg:block lg:bottom">
            <Footer/>
        </div>
        </div>
    )
}

export default Topup