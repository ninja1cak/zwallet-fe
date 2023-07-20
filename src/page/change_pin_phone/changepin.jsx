import React from 'react'
import NavbarSide from '../../component/navbarside'
import Header from '../../component/header'
import Footer from '../../component/footer'

function ChangePin ()  {
  return (
    <div>
        <div className="bg-gray-100">
            <div className="hidden md:block"><Header /></div>
            <div className="flex gap-8 w-[100%] mx-auto max-w-7xl my-14">
                <div className="hidden md:block w-1/4"><NavbarSide /></div>
                <div className="w-full md:w-3/4 bg-white md:rounded-3xl shadow-lg">
                    <div className="flex flex-col py-12 md:py-10 px-8">

                        <div className="flex items-center md:hidden gap-x-5 top-4 absolute ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                            </svg>
                            <h1 className="text-xl font-medium ">Change PIN</h1>
                        </div>
                        <div className="md:w-full lg:w-1/2">
                            <h1 className="hidden md:block text-2xl font-medium mb-12">Change PIN</h1>
                            <span 
                            className=" md:text-lg text-gray-400 leading-loose">
                            Enter your current 6 digits Zwallet PIN below to continue to the next steps.
                            </span>
                        </div>


                        <div className="flex flex-row w-full justify-center xs:mx-2  md:mx-5 mx-auto px-0 md:px-0 mt-10">
                            <div className='w-full'>
                                <input 
                                type='number'
                                className='xs:w-9 sm:w-10 border border-gray-400 rounded-md p-2 text-center'/>
                            </div>

                            <div className='w-full'>
                                <input 
                                type='number'
                                className='xs:w-9 sm:w-10 border border-gray-400 rounded-md p-2 text-center'/>
                            </div>

                            <div className='w-full'>
                                <input 
                                type='number'
                                className='xs:w-9 sm:w-10 border border-gray-400 rounded-md p-2 text-center'/>
                            </div>

                            <div className='w-full'>
                                <input 
                                type='number'
                                className='xs:w-9 sm:w-10 border border-gray-400 rounded-md p-2 text-center'/>
                            </div>

                            <div className='w-full'>
                                <input 
                                type='number'
                                className='xs:w-9 sm:w-10 border border-gray-400 rounded-md p-2 text-center'/>
                            </div>

                            <div className='w-full'>
                                <input 
                                type='number'
                                className='xs:w-9 sm:w-10 border border-gray-400 rounded-md p-2 text-center'/>
                            </div>
                        </div>

                        <div className='w-full mt-36 bg-gray-300 rounded-md text-center p-2'>
                            Confirm
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden md:block"><Footer /></div>
        </div>
    </div>
  )
}

export default ChangePin
