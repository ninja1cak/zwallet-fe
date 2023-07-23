import React, {useState}from 'react'
import NavbarSide from '../../component/navbarside'
import Header from '../../component/header'
import Footer from '../../component/footer'
import useApi from '../../helpers/useApi'
import { useNavigate } from 'react-router-dom'

function ChangePin ()  {

    const [form, setForm] = useState([])


    const api = useApi()
    const navigate = useNavigate()

    const inputChange = (e) =>{
        const pin1 = document.getElementById('pin1').value
        const pin2 = document.getElementById('pin2').value
        const pin3 = document.getElementById('pin3').value
        const pin4 = document.getElementById('pin4').value
        const pin5 = document.getElementById('pin5').value
        const pin6 = document.getElementById('pin6').value

        let mergePin = ''

        if(isNaN(pin1)){
            return alert('kolom 1 bukan angka')
        }
        else if(pin1==''){
            alert('mohon masukkan angka di kolom 1')
        }

        if(isNaN(pin2)){
            return alert('kolom 2 bukan angka')
        }
        else if(pin2==''){
            alert('mohon masukkan angka di kolom 2')
        }

        if(isNaN(pin3)){
            return alert('kolom 3 bukan angka')
        }
        else if(pin3==''){
            alert('mohon masukkan angka di kolom 3')
        }

        if(isNaN(pin4)){
            return alert('kolom 4 bukan angka')
        }
        else if(pin4==''){
            alert('mohon masukkan angka di kolom 4')
        }

        if(isNaN(pin5)){
            return alert('kolom 5 bukan angka')
        }
        else if(pin5==''){
            alert('mohon masukkan angka di kolom 5')
        }

        if(isNaN(pin6)){
            return alert('kolom 6 bukan angka')
        }
        else if(pin6==''){
            alert('mohon masukkan angka di kolom 6')
        }

        mergePin = pin1.concat(pin2, pin3,pin4, pin5, pin6)

        setForm({pin: mergePin})
    }
    const updatePin = async () =>{
        await api({
            method: 'PATCH',
            url: '/user/update',
            data: form
        })
        .then(({data}) => {
            //console.log('Nomor handphone berhasil di update', data)
            alert('PIN berhasil di update!')
            setTimeout(()=>{
                navigate('/personal_info')
            })
        },3000)
        .catch((er)=>{
            console.log(er)
        })
    }
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
                        <div className='w-full mt-36 bg-gray-300 rounded-md text-center p-2'>
                            <button className="btn btn-ghost" onClick={updatePin}>    
                                Confirm
                            </button>
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
