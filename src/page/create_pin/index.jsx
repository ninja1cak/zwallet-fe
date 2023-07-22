import React, {useState} from 'react'
import Sidebar from '../../component/sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePin = () => {
    const [form, setForm] = useState([])
    const navigate = useNavigate
    

    const inputChange = (e) =>{

        //let validationNumber = /^[0-9]+$/
        const pin1 = document.getElementById('pin1').value
        const pin2 = document.getElementById('pin2').value
        const pin3 = document.getElementById('pin3').value
        const pin4 = document.getElementById('pin4').value
        const pin5 = document.getElementById('pin5').value
        const pin6 = document.getElementById('pin6').value

        const mergePin = pin1.concat(pin2, pin3,pin4, pin5, pin6)

        // if(!validationNumber.test(pin1)){
        //     alert('harap masukkan angka')
        // }else if(!validationNumber.test(pin2)){
        //     alert('harap masukkan angka')
        // }else if(!validationNumber.test(pin3)){
        //     alert('harap masukkan angka')
        // }else if(!validationNumber.test(pin4)){
        //     alert('harap masukkan angka')
        // }else if(!validationNumber.test(pin5)){
        //     alert('harap masukkan angka')
        // }else if(!validationNumber.test(pin6)){
        //     alert('harap masukkan angka')   
        // }

    //     if (!validationNumber.test(pin1) ||
    //     !validationNumber.test(pin2) ||
    //     !validationNumber.test(pin3) ||
    //     !validationNumber.test(pin4) ||
    //     !validationNumber.test(pin5) ||
    //     !validationNumber.test(pin6)) {
    //   alert('Harap masukkan angka pada setiap digit PIN.');
    //   return;
    // }

        //console.log(mergePin)
        setForm({pin: mergePin})


    }
    console.log(form)

    const inputPin = async () =>{

        await axios({
            method: "PUT",
            url: "http://localhost:8888/user",
            data: form
        })
        .then(({data}) => {
            console.log('PIN Berhasil ditambahkan!', data)

            setTimeout(()=>{
                navigate('/login')
            }, 3000)
        })
        .catch((er)=>{
            console.error(er.message)
        })

    } 
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
                        type='text'
                        id='pin1'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        maxLength={1}/>
                    </div>
    
                    <div className='w-full'>
                        <input 
                        type='text'
                        id='pin2'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        maxLength={1}/>
                    </div>
    
                    <div className='w-full'>
                        <input 
                        type='text'
                        id='pin3'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        maxLength={1}/>
                    </div>
    
                    <div className='w-full'>
                        <input 
                        type='text'
                        id='pin4'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        maxLength={1}/>
                    </div>
    
                    <div className='w-full'>
                        <input 
                        type='text'
                        id='pin5'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        maxLength={1}/>
                    </div>
    
                    <div className='w-full'>
                        <input 
                        type='text'
                        id='pin6'
                        className='pin w-10 border rounded-md p-2 text-center'
                        name='pin'
                        onChange={inputChange}
                        maxLength={1}/>
                    </div>
                </div>
    
                <div className='bg-gray-300 text-center p-2 rounded-md mb-2 sm:w-full sm:mx-5 md:mx-0' onClick={inputPin}>
                    <button className=' btn btn-ghost w-full ' onClick={inputPin}>
                        Confirm
                    </button>
                </div>
    
            </div>
    
    
    
        </div>
      )
}

export default CreatePin
