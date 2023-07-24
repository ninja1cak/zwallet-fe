import React, { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar";
import useApi from "../../helpers/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";



function Reset() {
    const {isAuth} = useSelector((s) => s.users)
    const [password, setPassword] = useState('')
    const [checkPass, setCheckPass] = useState('')
    const [status, setStatus] = useState()
    const {code} = useParams()
    const api = useApi()
    const navigate = useNavigate()

    const verifyCode = async () =>{
        try {
            console.log(code)
            const {data} = await api({
                url: `/auth/reset`,
                method: 'POST',
                data: {
                    token: code
                }
            })
            if(data.status === 400 || data === undefined){
                console.log(data)
                navigate('/')
            }else{
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendPassword = async () =>{
        try {
            if(checkPass === password && password !=''){
                const {data} = await api({
                    url: `/auth/reset`,
                    method: 'POST',
                    data: {
                        token: code,
                        password: password
                    }
                })
                console.log('sama')
                setStatus(200)
                window.my_modal_1.showModal()
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
                // navigate('/login')
            }else{
                console.log('beda')
                setStatus(400)
            }

        } catch (error) {
            
        }
    }


    useEffect(() =>{
        if(isAuth){
            navigate('/home')
        }else{
            verifyCode()
        }
    }, [])

    return (
        <>
            <Sidebar />

            <div className="absolute md:top-0 md:right-0 md:-me-0 md:p-5 md:inline-block  md:w-2/5 mx-10 md:pb-0">
                <div className="hidden md:block">
                </div>
                <div className="block md:hidden text-center pt-20 mb-28">
                    <h1 className="text-3xl font-medium text-primary">Zwallet</h1>
                </div>
                <div className="bg-white rounded-t-3xl md:rounded-none px-8 md:px-0 md:mx-4  md:py-16  lg:px-4 ">
                    <span className="hidden md:block md:text-lg lg:text-3xl font-medium lg:leading-relaxed  mb-12">Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</span>
                    <span className="hidden md:block md:text-sm lg:text-lg text-gray-400 md:leading-relaxed lg:leading-loose">Now you can create a new password for your Zwallet account. Type your password twice so we can confirm your new passsword.</span>
                    <div className="block md:hidden text-center py-10 px-4">
                        <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
                        <span className="text-lg text-gray-400">
                        Create and confirm your new password so you can login to Zwallet.
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b-3 pb-3  md:mt-8 lg:mt-12 mb-6 md:mb-4 lg:mb-8">
                        <div className=" flex items-center">
                        <FontAwesomeIcon className="md:h-5 lg:h-6" icon={faLock} color="gray" size="xl" />
                        <div className="flex items-center ">
                            <input onChange={(e) => setPassword(e.target.value)} className="text-lg md:placeholder:text-sm lg:placeholder:text-lg bg-inherit ml-8 md:w-4/5 lg:w-full" type="password" placeholder="Create new password" />
                        </div>
                        </div>

                        <FontAwesomeIcon className="pl-16 md:pl-0" icon={faEyeSlash} color="gray" size="sm" />
                    </div>
                    <div className="flex justify-between items-center border-b-3 pb-3 ">
                        <div className=" flex items-center">
                            <FontAwesomeIcon className="md:h-5 lg:h-6" icon={faLock} color="gray" size="xl" />
                            <div className="flex items-center ">
                                <input onChange={(e) => setCheckPass(e.target.value)} className="text-lg md:placeholder:text-sm lg:placeholder:text-lg bg-inherit ml-8 md:w-4/5 lg:w-full" type="password" placeholder="Confirm new password" />

                            </div>
                        </div>

                        <FontAwesomeIcon className="pl-16 md:pl-0" icon={faEyeSlash} color="gray" size="sm" />
                    </div>
                    {
                                status === 400 ? <p className=" text-red-500 font-semibold tracking-wider mt-2">Password not same</p> : ''
                    }
                    <div className="mb-12 md:mt-12 mt-8">
                        <button onClick={sendPassword} className="btn w-full h-16 rounded-2xl text-2xl text-white capitalize bg-primary">Reset Password</button>
                        <dialog id="my_modal_1" className="modal">
                            <form method="dialog" className="modal-box">
                                <h3 className="font-bold text-lg">Message</h3>
                                {
                                     status === 200 ? <p className="py-4">Change password success</p> : ''

                                }
                                <div className="modal-action">
                                <button className="btn"  >Close</button>
                                </div>
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset