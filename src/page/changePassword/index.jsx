import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import NavbarSide from '../../component/navbarside'
import useApi from '../../helpers/useApi'
import { useDispatch, useSelector } from 'react-redux'
import convertRupiah from 'rupiah-format'
import Card from '../../component/card'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { login, logout } from '../../store/reducer/user'

function ChangePassword() {
    const api = useApi()
    const navigate  = useNavigate()
    const {data, isAuth} = useSelector((s) => s.users)
    const email = data.email
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [status, setStatus] = useState(0)
    const [btnState, setBtnState] = useState(true)
    const dispatch = useDispatch()
    const handleClick = async () =>{
        if(newPassword !== confirmPassword){
            setStatus(500)
        }else{
            const {data} = await api.patch('/user/update',{password: newPassword, oldPassword : password, email: email})
            console.log(data)
            setStatus(data.status)
            console.log(data.status)
        }
    }
    
    useEffect(() =>{
        console.log(newPassword)
        if(!newPassword || !password  || !confirmPassword){
            setBtnState(true)
        }else{
            setBtnState(false)
        }

        if(status === 200){
            setTimeout(() => {
                dispatch(logout())
                navigate('/login')
            },[])
        }
    },[status, password, confirmPassword, newPassword])
   
    useEffect(() =>{
        if(!isAuth){
            navigate('/')
        }
    },[])
  return (
    <>
    <Header/>
    <main className=" bg-gray-100">
        <div className='md:hidden flex flex-row items-center gap-x-4 pt-10 pl-4'>
            <FontAwesomeIcon icon={faArrowLeft} style={{color: "#45546e"}} className=' w-10 h-8' onClick={() => navigate('/home')}/>
            <h1 className=' font-semibold text-2xl'>Change Password</h1>
        </div>


        <div className="flex w-[100%] mx-auto max-w-7xl gap-x-4 h-[800px] md:h-[875px] ">
            <NavbarSide />
            <div className=" block w-[100%] md:bg-white  rounded-lg  my-5">
                <p className='ml-14 mt-8 font-semibold text-xl hidden md:block'>Change Password</p>
                <p className=' ml-2 mt-10 text-gray-500 md:ml-14 '>
                    You must enter your current password and then <br /> type your new password twice
                </p>



            <div className=' relative flex flex-col md:w-[50%] mx-auto md:max-w-xl'>

            <div className=' mt-20 mx-4 flex justify-between border-b-2'>
                <div className='flex flex-row w-full xs:gap-x-3 md:gap-x-5  '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" className=' stroke-gray-400' />
                    </svg>
            
                    <input
                    placeholder='Current password'
                    className=' w-full md:text-sm py-1 bg-gray-100 md:bg-white'
                    type="password"
                    name="password"
                    onChange={ (e) => setPassword(e.target.value)}
                    />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ms-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            </div>
            {
               status === 404 ?  <p className=' font-semibold text-red-500 mx-auto pt-5 absolute top-[105px] left-[20px]'>Password is wrong</p> : ''

            }

            <div className=' mt-20  mx-4 flex justify-between border-b-2'>
                <div className='flex flex-row w-full xs:gap-x-3 md:gap-x-5  '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" className=' stroke-gray-400' />
                    </svg>
            
                    <input
                    placeholder='New password'
                    className=' w-full md:text-sm py-1 bg-gray-100 md:bg-white'
                    type="password"
                    name="password"
                    onChange={ (e) => setNewPassword(e.target.value)}

                    />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ms-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            </div>

            <div className=' mt-20  mx-4 flex justify-between border-b-2'>
                <div className='flex flex-row w-full xs:gap-x-3 md:gap-x-5  '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" className=' stroke-gray-400' />
                    </svg>
            
                    <input
                    placeholder='Repeat new password'
                    className=' w-full md:text-sm py-1 bg-gray-100 md:bg-white'
                    type="password"
                    name="password"
                    onChange={ (e) => setConfirmPassword(e.target.value)}

                    />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ms-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>

            </div>
            {
                    status === 500 ? <p className=' font-semibold text-red-500 mx-auto pt-5 absolute top-[330px] left-[20px]'>Confirm password not same</p> 
                    : status === 200 ? <p className=' font-semibold text-green-500 mx-auto pt-5 absolute top-[330px] left-[20px]'>Update password success</p> 
                    : ''
            }       
            <button onClick={handleClick} disabled={btnState} className=' btn mx-4 flex mt-52'>Change Password</button>
                     
            </div>
                       

            </div>
        </div>
    </main>
    <Footer />
    </>  )
}

export default ChangePassword