import React, { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar";
import useApi from "../../helpers/useApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from "react-router-dom";



function Reset() {

    const [password, setPassword] = useState('')
    const [checkPass, setCheckPass] = useState('')
    const [status, setStatus] = useState()
    const {code} = useParams()
    const api = useApi()
    const navigate = useNavigate()

    const verifyCode = async () =>{
        try {
            const {data} = await api({
                url: `/auth/reset`,
                method: 'POST',
                data: {
                    token: code
                }
            })
            if(data.status === 400){
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
        verifyCode()
    }, [])

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
                    <span className="hidden md:block md:text-lg lg:text-3xl font-medium lg:leading-relaxed  mb-12">Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</span>
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
                            <input onChange={(e) => setPassword(e.target.value)} className="text-lg md:placeholder:text-sm lg:placeholder:text-lg bg-inherit ml-8 md:w-4/5 lg:w-full" type="password" placeholder="Create new password" />
                        </div>
                        <FontAwesomeIcon className="pl-16 md:pl-0 lg:pl-52" icon={faEyeSlash} color="gray" size="sm" />
                    </div>
                    <div className="flex items-center border-b-3 pb-3 ">
                        <FontAwesomeIcon className="md:h-5 lg:h-6" icon={faLock} color="gray" size="xl" />
                        <div className="flex items-center ">
                            <input onChange={(e) => setCheckPass(e.target.value)} className="text-lg md:placeholder:text-sm lg:placeholder:text-lg bg-inherit ml-8 md:w-4/5 lg:w-full" type="password" placeholder="Confirm new password" />

                        </div>
                        <FontAwesomeIcon className="pl-16 md:pl-0 lg:pl-52" icon={faEyeSlash} color="gray" size="sm" />
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