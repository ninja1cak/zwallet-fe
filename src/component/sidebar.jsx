import React from 'react'
import Card1 from '../assets/png-phone2.png'
import Card2 from '../assets/png-phone.png'

const Sidebar = () => {
  return (
    <div>
        <div className="md:w-3/5 h-screen bg-cover bg-primary relative pb-5 pt-5">
            <svg className="absolute z-3 inset-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fillOpacity={1} d="M0,256L60,229.3C120,203,240,149,360,138.7C480,128,600,160,720,197.3C840,235,960,277,1080,277.3C1200,277,1320,235,1380,213.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
            </svg>
            <p className="absolute text-blue-400 md:text-lg lg:mx-32 xl:mx-44 xl:mt-3 xl:text-2xl md:hidden lg:block  font-['Nunito']">Zwallet</p>
            <div className="flex flex-row justify-center relative z-5">
            <img src={Card1} className=" md:w-40 md:-me-10 xl:w-72 xl:-me-16" alt="" />
            <img src={Card2} className=" md:w-40 md:-ms-10 xl:w-72 xl:-ms-16" alt=""/>
            </div>
            <p className="absolute text-white md:text-lg mx-16 md:mx-52 md:-mt-3 lg:hidden font-mono">Zwallet</p>
            <div className="flex-block md:mx-10 text-white xl:mx-20">
            <p className="my-5 mx-20 font-bold font-mono md:text-md xl:-mt-3">App that Covering Banking Needs.</p>
            <p className="mx-20 md:text-sm">Zwallet is an application that focussing in banking needs for all users
                in the world. Always updated and always following world trends.
                5000+ users registered in Zwallet everyday with worldwide
                users coverage.
            </p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
