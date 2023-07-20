import React from 'react'
import Sidebar from '../../component/sidebar'

const CreatePin = () => {
  return (
    <div>
      
        <Sidebar/>

        <div className='absolute md:top-3 md:right-0 md:-me-0 md:p-5 md:inline-block  md:w-2/5 mx-10'>
            <div className='text-semibold md:text-xl mb-2 xs:hidden md:block'>
                <p>Secure Your Account, Your Wallet,
                and Your Data With 6 Digits PIN
                That You Created Yourself.</p>
            </div>

            <div className='text-gray-500 mb-5 md:text-xs xs:hidden md:block'>
                <p>Create 6 digits pin to secure all your money and your data in Zwallet app. 
                Keep it secret and don’t tell anyone about your 
                Zwallet account password and the PIN.</p>
            </div>

            <div className='w-full flex flex-row py-5 xs:mt-48 sm:mx-5 md:mx-0 md:mt-0'>
                <div className='w-full'>
                    <input 
                    type='number'
                    className='w-10 border rounded-md p-2 text-center'/>
                </div>

                <div className='w-full'>
                    <input 
                    type='number'
                    className='w-10 border rounded-md p-2 text-center'/>
                </div>

                <div className='w-full'>
                    <input 
                    type='number'
                    className='w-10 border rounded-md p-2 text-center'/>
                </div>

                <div className='w-full'>
                    <input 
                    type='number'
                    className='w-10 border rounded-md p-2 text-center'/>
                </div>

                <div className='w-full'>
                    <input 
                    type='number'
                    className='w-10 border rounded-md p-2 text-center'/>
                </div>

                <div className='w-full'>
                    <input 
                    type='number'
                    className='w-10 border rounded-md p-2 text-center'/>
                </div>
            </div>

            <div className='bg-gray-300 text-center p-2 rounded-md mb-2 sm:w-full sm:mx-5 md:mx-0'>
                Confirm
            </div>

        </div>



    </div>
  )
}

export default CreatePin
