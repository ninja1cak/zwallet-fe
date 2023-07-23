import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addData, logout } from '../store/reducer/user'

const NavbarSide = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goLogout = () =>{
        dispatch(logout())
        dispatch(addData(''))
        navigate('/')
    }
    useEffect(() =>{
    }, [])
  return (
    
        <section id = 'navbar side' className=" min-w-[200px] hidden lg:block w-[30%] min-h-[87%] relative pb-10 bg-white py-5 pe-5 my-5 rounded-lg">
            <Link to='/home' className='flex flex-row gap-x-5 hover:border-l-2 hover:border-primary hover:text-primary ps-2 pl-8 py-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                </svg>
                <p>Dashboard</p>
            </Link>
            <Link to='/transfer' className='flex flex-row gap-x-5 mt-5 hover:border-l-2 hover:border-primary hover:text-primary pl-8 py-4 ps-2 active:border-primary active:text-primary'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                </svg>
                <p>Transfer</p>
            </Link>
            <Link to='/topup' className='flex flex-row gap-x-5 mt-5 hover:border-l-2 hover:border-primary hover:text-primary ps-2 pl-8 py-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>          
                <p>Top Up</p>
            </Link>
            <Link to='/profile' className='flex flex-row gap-x-5 mt-5 hover:border-l-2 hover:border-primary hover:text-primary ps-2 pl-8 py-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>                   
                <p>Profile</p>
            </Link>

            <btn  onClick={goLogout} className=' cursor-pointer w-full flex flex-row gap-x-5 absolute bottom-7 hover:border-l-2 hover:border-primary hover:text-primary ps-2 pl-8 py-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Log Out                 
            </btn>

        </section>
  )
}

export default  NavbarSide



