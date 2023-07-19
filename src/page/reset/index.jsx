import React from "react";
import Sidebar from "../../component/sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";



function Reset() {
    return (
        <>
            <div className="bg-gray-100 block md:grid grid-cols-2">
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                <div className="block md:hidden text-center pt-20 mb-28">
                    <h1 className="text-3xl font-medium text-primary">Zwallet</h1>
                </div>
                <div className="bg-white rounded-t-3xl md:rounded-none px-8 md:px-0 md:pl-12 lg:pl-16 md:pr-20 lg:pr-36 md:py-16 lg:py-20">
                    <span className="hidden md:block md:text-lg lg:text-3xl font-medium lg:leading-relaxed block mb-12">Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</span>
                    <span className="hidden md:block md:text-sm lg:text-lg text-gray-400 md:leading-relaxed lg:leading-loose">Now you can create a new password for your Zwallet account. Type your password twice so we can confirm your new passsword.</span>
                    <div className="block md:hidden text-center py-10 px-4">
                        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
                        <span className="text-lg text-gray-400">
                        Create and confirm your new password so you can login to Zwallet.
                        </span>
                    </div>
                    <div className="flex items-center border-b-3 pb-3 mb-2 md:mb-12 md:mt-8 lg:mt-12 mb-6 md:mb-4 lg:mb-4">
                        <FontAwesomeIcon className="md:h-5 lg:h-6" icon={faLock} color="gray" size="xl" />
                        <div className="flex items-center ">
                            <input className="text-lg md:placeholder:text-sm lg:placeholder:text-lg bg-inherit ml-8 md:w-4/5 lg:w-full" type="password" placeholder="Create new password" />
                        </div>
                        <FontAwesomeIcon className="pl-16 md:pl-0 lg:pl-52" icon={faEyeSlash} color="gray" size="sm" />
                    </div>
                    <div className="flex items-center border-b-3 pb-3 mb-2 md:mb-12 mb-8">
                        <FontAwesomeIcon className="md:h-5 lg:h-6" icon={faLock} color="gray" size="xl" />
                        <div className="flex items-center ">
                            <input className="text-lg md:placeholder:text-sm lg:placeholder:text-lg bg-inherit ml-8 md:w-4/5 lg:w-full" type="password" placeholder="Create new password" />
                        </div>
                        <FontAwesomeIcon className="pl-16 md:pl-0 lg:pl-52" icon={faEyeSlash} color="gray" size="sm" />
                    </div>
                    <div className="mb-12">
                        <button className="btn w-full h-16 rounded-2xl text-2xl text-white capitalize bg-primary">Reset Password</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset