import React, { useState, useEffect } from "react";
import Sidebar from "../../component/sidebar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";



function Forgot() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState(0)
    const handleClick =  async () =>{
        try {
            const {data} = await axios.get(`http://localhost:8888/auth/forget_password?email=${email}`)
            setStatus(data.status)
            window.my_modal_1.showModal()
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() =>{
    //     console.log(email)
    // }, [email])

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
                    <span className="hidden md:block md:text-sm lg:text-lg text-gray-400 md:leading-relaxed lg:leading-loose">To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</span>
                    <div className="block md:hidden text-center py-10 px-4">
                        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
                        <span className="text-lg text-gray-400">
                        Enter your Zwallet e-mail so we can send you a password reset link.
                        </span>
                    </div>
                    <div className="md:mt-10 lg:mt-12">
                        <div className="border-b-3 pb-3 ">
                            <FontAwesomeIcon className="md:h-5 lg:h-6" icon={faEnvelope} color="gray" size="xl" />
                            <input onChange={(e) => setEmail(e.target.value)} className="text-lg md:placeholder:text-sm lg:placeholder:text-lg bg-inherit ml-8" type="text" placeholder="Enter your e-mail" />
                        </div>
                    </div>

                    <div className="my-12">
                        <button onClick={handleClick} className="btn w-full h-16 rounded-2xl text-2xl text-white capitalize bg-primary">Confirm</button>
                        <dialog id="my_modal_1" className="modal">
                            <form method="dialog" className="modal-box">
                                <h3 className="font-bold text-lg">Message</h3>
                                {
                                     status === 400 ? <p className="py-4 text-red-700 tracking-wider font-bold">Email not registered</p> : <p className="py-4">Check your email</p>

                                }
                                <div className="modal-action">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                                </div>
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgot