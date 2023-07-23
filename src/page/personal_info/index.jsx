import React, { useEffect, useState } from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import profile from "../../assets/profile.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import NavbarSide from "../../component/navbarside";
import { Link } from "react-router-dom";
import useApi from "../../helpers/useApi";
import { useSelector } from "react-redux";


function PersonalInfo() {
    const { data } = useSelector((s)=>s.users)
    console.log(data)
    useEffect(() => {
        
    },[])

    return (
        <>
            <div className="bg-gray-100">
                <div className="hidden md:block"><Header /></div>
                <div className="flex gap-8 w-[100%] mx-auto max-w-7xl my-14">
                <NavbarSide />
                    <div className="w-full bg-white md:rounded-3xl shadow-lg">
                        <div className="flex items-center md:hidden pl-16 ">
                            <Link to='/profile'><FontAwesomeIcon icon={faArrowLeft} className="text-gray-500 pr-5" size="xl" /></Link>
                            <h1 className="text-xl font-medium ">Personal Information</h1>
                            </div>
                        <div className="flex flex-col py-12 md:py-10 px-8">
                            <div className="md:w-full lg:w-1/2">
                                <h1 className="hidden md:block text-2xl font-medium mb-12">Personal Information</h1>
                                <span className=" md:text-lg text-gray-400 leading-loose">We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</span>
                            </div>
                            <div className="flex flex-col w-full px-0 md:px-0 mt-10">
                                <div className="shadow-lg border-t-2 border-slate-100 h-24 md:h-28 rounded-lg px-6 py-4">
                                    <span className=" md:text-lg text-gray-500 mb-3">First Name</span>
                                    <h1 className="text-xl md:text-2xl font-medium mt-2">{data.first_name}</h1>
                                </div>
                                <div className="shadow-lg border-t-2 border-slate-100 h-24 md:h-28 rounded-lg px-6 py-4 mt-5">
                                    <span className="md:text-lg text-gray-500 mb-3">Last Name</span>
                                    <h1 className="text-xl md:text-2xl font-medium mt-2">{data.last_name}</h1>
                                </div>
                                <div className="shadow-lg border-t-2 border-slate-100 text-24 md:h-28 rounded-lg px-6 py-4 mt-5">
                                    <span className="md:text-lg text-gray-500 mb-3">Verified E-mail</span>
                                    <h1 className="text-xl md:text-2xl font-medium mt-2">{data.email}</h1>
                                </div>
                                <div className="shadow-lg border-t-2 border-slate-100 h-24 md:h-28 rounded-lg px-6 py-4 mt-5">
                                    <span className="md:text-lg text-gray-500 mb-3">Phone Number</span>
                                    <div className="flex justify-between">
                                        <h1 className="text-xl md:text-2xl font-medium mt-2">{ data.phone_number == null ? 'Phone number not set' : data.phone_number }</h1>
                                        <Link to="/change-number" className="pr-2 md:pr-5 text-sm md:text-lg text-primary font-medium">Manage</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block"><Footer /></div>
            </div>
        </>
    )
}

export default PersonalInfo