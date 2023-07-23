import React from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import NavbarSide from "../../component/navbarside";

function Topup() {
    return (
        <>
        <div className="hidden lg:block"><Header /></div>
        <main className="w-full bg-gray-100">
        <div className="flex flex-row w-[100%] max-w-7xl mx-auto bg-gray-100 gap-x-4 ">

            <NavbarSide />            
            <div className="w-full  bg-white rounded-lg px-10 py-10 flex flex-col gap-y-5 mt-4">
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
        </main>
        <div className="hidden lg:block"><Footer /></div>
        </>
    )
}

export default Topup