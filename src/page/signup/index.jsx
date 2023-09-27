import React, {useEffect, useState} from 'react'
import Sidebar from '../../component/sidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import withAuth from '../../helpers/withAuth'


const Signup = () => {

    const [form, setForm] = useState({})
    const [status, setStatus] = useState(0)
    const navigate = useNavigate()
    const {isAuth} = useSelector((s) => s.users)
    const [btnState, setBtnState] = useState(true)
    const inputChange = (e)=>{
        const data = {...form}
        data[e.target.name] = e.target.value
        setForm(data)
    }

    console.log(form)
    
    const Register = async() =>{
        await axios({
            method: 'POST',
            url: "http://localhost:8888/user/",
            data: form
        })
        .then(({data}) => {
            console.log('Registrasi Berhasil', data)
            setStatus(data.status)
        })
        .catch((er)=>{
            console.error(er.message)
        })
    }

    useEffect(() =>{
        if(!form.first_name || !form.last_name || !form.password || !form.email ){
            setBtnState(true)
        }else{
            setBtnState(false)
        }
    },[status, form])

    useEffect(() =>{
        if(isAuth){
            navigate('/home')
        }
    },[])
    
    return (
    <div>
      <Sidebar/>

      <div className='md:absolute w-[90%] mx-auto md:top-3 md:right-0 md:-me-0 md:p-5 md:inline-block  md:w-2/5 md:mx-10'>
        <div className='text-semibold md:text-xl mb-2 xs:hidden md:block'>
            <p>Start Accessing Banking Needs
            With All Devices and All Platforms
            With 30.000+ Users</p>
        </div>

        <div className='text-gray-500 mb-5 md:text-xs xs:hidden md:block'>
            <p>Transfering money is eassier than ever, 
            you can access Zwallet wherever you are. 
            Desktop, laptop, mobile phone? we cover all of that for you!</p>
        </div>

        <div className=' font-semibold text-3xl xs:flex xs:justify-center xs:items-center  pt-10 mt-10 rounded-lg text-primary md:hidden sm:mx-5 md:mx-0'>
            <h1>Zwallet</h1>
            
        </div>
        <h2 className='font-semibold text-2xl text-center md:hidden mt-32 mb-4'>Sign Up</h2>
        <p className=' text-center text-gray-400 mb-10 md:hidden'>Create your account to access Zwallet</p>
        <div className='mb-5 sm:mx-5 md:mx-0 md:mt-0'>
            <div className='flex flex-row xs:gap-x-3 md:gap-x-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <input
                placeholder='Enter your firstname'
                className=' border-gray-200 w-full md:text-sm pb-3'
                type='text'
                name="first_name"
                onChange={inputChange}
                />
            </div>
            <hr className='w-full bg-gray-200 h-0.5'></hr>
        </div>

        <div className='mb-5 sm:mx-5 md:mx-0'>
        <div className='flex flex-row xs:gap-x-3 md:gap-x-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <input
            placeholder='Enter lastname'
            className=' border-gray-200 w-full md:text-sm pb-3'
            type="text"
            name="last_name"
            onChange={inputChange}
            />
        </div>
        <hr className='w-full bg-gray-200 h-0.5'></hr>
    </div>

        <div className=' mb-5 sm:mx-5 md:mx-0'>
            <div className='flex flex-row xs:gap-x-3 md:gap-x-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <input
                placeholder='Enter your e-mail'
                className=' border-gray-200 w-full md:text-sm pb-3'
                type="email"
                name="email"
                onChange={inputChange}
                />
            </div>
            <hr className='w-full bg-gray-200 h-0.5'></hr>
        </div>

        <div className=' mb-5 sm:mx-5 md:mx-0'>
            <div className='w-full flex flex-row'>
                <div className='flex flex-row xs:gap-x-3 md:gap-x-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
            
                    <input
                    placeholder='Create your password'
                    className=' border-gray-200 w-full md:text-sm pb-3'
                    type="password"
                    name="password"
                    onChange={inputChange}
                    />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 xs:ms-8 sm:hidden md:block md:ms-8 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            </div>

            <hr className='w-full bg-gray-200 h-0.5'></hr>
        </div>



        <div className='bg-gray-300 text-center rounded-md mb-2 sm:mx-5 md:mx-0'>
            <button className=' btn bg-primary text-white w-full ' onClick={Register} disabled={btnState}>
                Sign Up
            </button>
        </div>

        <div className='text-center md:text-xs  sm:mx-5 md:mx-0'>
            <p>Already Have an account? Let's <Link to='/login' className='text-blue-500'>Login</Link></p>
        </div>
        {
            status == 201 ? <p className=' font-semibold text-center mt-4'>Check your email for activation account</p> : status == 400 ?  <p className=' font-semibold text-center mt-4'>Email has been registered</p> : ''
        }

      </div>
    </div>
  )
}

export default Signup
