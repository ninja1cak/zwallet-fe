import React from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import profile from "../../assets/profile.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import NavbarSide from "../../component/navbarside";


function Profile() {
    return (
        <>
            <div className="bg-gray-100">
                <div className="hidden md:block"><Header /></div>
                <div className="flex gap-8 w-[100%] mx-auto max-w-7xl my-14">
                    <div className="hidden md:block w-1/4"><NavbarSide /></div>
                    <div className="w-full md:w-3/4 bg-white md:rounded-3xl shadow-lg">
                        <div className="block md:hidden pl-16 "><FontAwesomeIcon icon={faArrowLeft} className="text-gray-500" size="xl" /></div>
                        <div className="flex flex-col justify-center items-center py-12 md:py-24">
                            <div>
                                <div className="flex flex-col justify-center items-center">
                                    <img src={profile} className="w-20 md:w-28" alt="profile_picture" />
                                    <span className="flex items-center gap-4 mt-3">
                                        <FontAwesomeIcon icon={faPenToSquare} className="text-gray-500" />
                                        <h4 className="text-nd md:text-xl text-gray-500">Edit</h4>
                                    </span>
                                </div>
                                <div className="text-center">
                                    <h1 className="text-2xl md:text-3xl font-medium mb-3 mt-8 ">Robert Chandler</h1>
                                    <h3 className="text-md md:text-xl text-gray-500 mb-12 md:mb-16">+62 813-9387-7946</h3>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full px-10 md:px-0">
                                <button className="btn btn-active text-xl w-full md:w-3/5 h-20 capitalize flex justify-between px-6 mb-6">
                                    <span>Personal Information</span>
                                    <FontAwesomeIcon icon={faArrowRight} className="text-gray-500" />
                                </button>
                                <button className="btn btn-active text-xl w-full md:w-3/5 h-20 capitalize flex justify-between px-6 mb-6">
                                    <span>Change Password</span>
                                    <FontAwesomeIcon icon={faArrowRight} className="text-gray-500" />
                                </button>
                                <button className="btn btn-active text-xl w-full md:w-3/5 h-20 capitalize flex justify-between px-6 mb-6">
                                    <span>Change PIN</span>
                                    <FontAwesomeIcon icon={faArrowRight} className="text-gray-500" />
                                </button>
                                <button className="btn btn-active block md:hidden text-xl w-full md:w-3/5 h-20 capitalize flex justify-between px-6 mb-6">
                                    <span>Notification</span>
                                    <input type="checkbox" className="toggle toggle-primary" checked />
                                </button>
                                <button className="btn btn-active text-xl w-full md:w-3/5 h-20 capitalize flex justify-between px-6">
                                    <span>Logout</span>
                                    <div></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block"><Footer /></div>
            </div>
        </>
    )
}

export default Profile