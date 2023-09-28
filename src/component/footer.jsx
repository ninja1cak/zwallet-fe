import React from "react";


function Footer() {
    return (
        <>
            <footer className="bg-primary h-24 px-5 py-8">
                <div className="flex justify-between items-center w-[100%] max-w-7xl mx-auto">
                    <span className="text-md  w-[200px] md:w-[300px] md:text-xl text-white">2020 Zwallet. All right reserved.</span>
                    <div className=" flex flex-col md:block md:">
                        <span className="text-white md:mr-10">+62 5637 8882 9901</span>
                        <span className="text-white">contact@zwallet.com</span>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer