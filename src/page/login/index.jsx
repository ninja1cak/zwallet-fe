import React, { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../helpers/useApi";
import { login } from "../../store/reducer/user";


function Login() {
    const {isAuth} = useSelector((s) => s.users)
    const [form, setForm] = useState({})
    const api = useApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [btnState, setBtnState] = useState(true)


    const inputChange = (e) =>{
        const data = {...form}
        data[e.target.name] = e.target.value
        setForm(data)
    }

    const goLogin = async () =>{
        try {
            console.log(form)
            const {data} = await api({
                method: 'POST',
                data: form,
                url:'/auth/'
            })

            if(data.status == 201){
                const token = data.token
                dispatch(login(token))
                navigate('/home')

            }
            console.log(data)
        } catch (error) {
            console.log(error)
            return error
        }
    }
    useEffect(() =>{
        if(isAuth)(
            navigate('/home')
        )
    },[])

    useEffect(() =>{
        if(!form.password || !form.email ){
            setBtnState(true)
        }else{
            setBtnState(false)
        }
    },[form])
    return (
        <>
            <Sidebar />
            <div className="absolute md:top-0 md:right-0 md:-me-0 md:p-5 md:inline-block  md:w-2/5 mx-10 md:pb-0">
                <div className="hidden md:block">
                </div>
                <div className="block md:hidden text-center pt-20 mb-28">
                    <h1 className="text-3xl font-medium text-primary">Zwallet</h1>
                </div>
                <div className="bg-white rounded-t-3xl md:rounded-none px-8 md:px-0 md:pl-12 lg:pl-16 md:pr-20 lg:pr-36 md:py-16 lg:py-20">
                    <span className="hidden md:block md:text-lg lg:text-3xl font-medium lg:leading-relaxed block mb-12">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</span>
                    <span className="hidden md:block md:text-sm lg:text-lg text-gray-400 md:leading-relaxed lg:leading-loose">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</span>
                    <div className="block md:hidden text-center py-10 px-4">
                        <h1 className="text-3xl font-bold mb-6">Login</h1>
                        <span className="text-lg text-gray-400">
                        Login to your existing account to access all the features in Zwallet.
                        </span>
                    </div>
                    <div className="md:mt-10 lg:mt-12">
                        <div className="border-b-3 pb-3 mb-12">
                            <FontAwesomeIcon className="md:h-5 lg:h-6" icon={faEnvelope} color="gray" size="xl" />
                            <input className="text-lg md:placeholder:text-sm lg:placeholder:text-lg bg-inherit ml-8" type="text" name='email' onChange={inputChange} placeholder="Enter your e-mail" />
                        </div>
                        <div className="flex items-center border-b-3 pb-3 mb-2 md:mb-12">
                            <FontAwesomeIcon className="md:h-5 lg:h-6" icon={faLock} color="gray" size="xl" />
                            <div className="flex items-center ">
                                <input className="text-lg md:placeholder:text-sm lg:placeholder:text-lg bg-inherit ml-8 md:w-4/5 lg:w-full" type="password" name='password' onChange={inputChange} placeholder="Enter your password" />
                            </div>
                            <FontAwesomeIcon className="pl-16 md:pl-0 lg:pl-52" icon={faEyeSlash} color="gray" size="sm" />
                        </div>
                    </div>
                    <div className="text-end md:text-center lg:text-end mb-14 md:mb-16 lg:mb-44">
                        <Link to="/forgot" className="text-lg">Forgot password?</Link>
                    </div>
                    <div className="mb-4">
                        <button className="btn btn-primary w-full h-16 rounded-2xl text-lg capitalize" onClick={goLogin} disabled={btnState}>Login</button>
                    </div>
                    <div className="text-center">
                        <span>Don't have an account?</span>
                        <span className="ml-1 mr-2">Let's</span>
                        <Link to="/register" className="text-primary text-lg font-bold">Sign Up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login