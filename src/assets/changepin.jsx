import React, {useEffect, useState}from 'react'
import NavbarSide from '../../component/navbarside'
import Header from '../../component/header'
import Footer from '../../component/footer'
import useApi from '../../helpers/useApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ChangePin ()  {

    const [form, setForm] = useState({})
    const [pinMerge, setPinMerge]= useState('')
    const {data} = useSelector((s) => s.users)
    const [status, setStatus] = useState(0)
    const [btnState, setBtnState] = useState(true)
    const api = useApi()
    const navigate = useNavigate()

    const inputChange = (e) =>{
        const data = {...form}
        data[e.target.id] = e.target.value
        console.log('data', data)
        setForm(data)

        let mergePin = ''

        if(isNaN(form.pin1)){
            return alert('kolom 1 bukan angka')
        }
        if(isNaN(form.pin2)){
            return alert('kolom 2 bukan angka')
        }

        if(isNaN(form.pin3)){
            return alert('kolom 3 bukan angka')
        }

        if(isNaN(form.pin4)){
            return alert('kolom 4 bukan angka')
        }
        if(isNaN(form.pin5)){
            return alert('kolom 5 bukan angka')
        }

        if(isNaN(form.pin6)){
            return alert('kolom 6 bukan angka')
        }

        // mergePin = pin1.concat(pin2, pin3,pin4, pin5, pin6)

    }

    const checkPin = () =>{
        if(form === data.pin){
            console.log(true)
            // setStatus(201)
        }else{
            console.log(false)
            // setStatus(404)
        }
    }

    const updatePin = async () =>{      

        try {
            const {data} = await api({
                method: 'PATCH',
                url: '/user/update',
                data: form
            })
        } catch (error) {
            
        }            
    }

    useEffect(() =>{
        if(!form.pin1 || !form.pin2 || !form.pin3 || !form.pin4 || !form.pin5 || !form.pin6){
            setBtnState(true)
        }else{
            setBtnState(false)
        }
        console.log(form)
    }, [form])

  return (
    <div>
        <div className="bg-gray-100">
            <div className="hidden md:block"><Header /></div>
            <div className="flex gap-4 w-[100%] mx-auto max-w-7xl">
                <NavbarSide />
                <div className="w-full  bg-white md:rounded-3xl my-4 md:h-[700px]">
                    <div className="flex flex-col py-12 md:py-10 px-8 gap-y-24 md:h-[700px]">
                        <div>
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
                        type='text'
                        id='pin1'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        required
                        maxLength={1}/>
                    </div>
    
                    <div className='w-full'>
                        <input 
                        type='text'
                        id='pin2'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        required
                        maxLength={1}/>
                    </div>
    
                    <div className='w-full'>
                        <input 
                        type='text'
                        id='pin3'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        required
                        maxLength={1}/>
                    </div>
    
                    <div className='w-full'>
                        <input 
                        type='text'
                        id='pin4'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        required
                        maxLength={1}/>
                    </div>
    
                    <div className='w-full'>
                        <input 
                        type='text'
                        id='pin5'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        required
                        maxLength={1}/>
                    </div>
    
                    <div className='w-full'>
                        <input 
                        type='text'
                        id='pin6'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        required
                        maxLength={1}/>
                    </div>
                </div>
                        </div>
                        <button 
                                disabled = {btnState}
                                className="w-[50%] btn mx-auto " 
                                onClick={updatePin}>    
                                Confirm
                            </button>


                    </div>
                </div>
            </div>
            <div className="hidden md:block"><Footer /></div>
        </div>
    </div>
  )
}

export default ChangePin
