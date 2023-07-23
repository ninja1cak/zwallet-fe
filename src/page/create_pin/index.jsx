import React, {useEffect, useState} from 'react'
import Sidebar from '../../component/sidebar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CreatePin = () => {
    const [form, setForm] = useState([])
    const navigate = useNavigate()
    const {code} = useParams()
    const [email, setEmail] = useState('')


    const inputChange = (e) =>{
        const pin1 = document.getElementById('pin1').value
        const pin2 = document.getElementById('pin2').value
        const pin3 = document.getElementById('pin3').value
        const pin4 = document.getElementById('pin4').value
        const pin5 = document.getElementById('pin5').value
        const pin6 = document.getElementById('pin6').value
        // if(isNaN(pin1)|| pin1 == ''){
        //     console.log('ini adalah huruf dan huruf kosong')
        // }
        // else if(pin1 == ''){
        //     console.log('ini adalah kosong')
        // }
        // else{
        //     console.log('ini adalah huruf')
        // }
        // console.log(pin2)
        let mergePin = ''

        if(isNaN(pin1)){
            return alert('kolom 1 bukan angka')
        }
        else if(pin1==''){
            alert('mohon masukkan angka di kolom pertama')
        }

        if(isNaN(pin2)){
            return alert('kolom 2 bukan angka')
        }
        else if(pin2==''){
            alert('mohon masukkan angka di kolom kedua')
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


        //console.log(mergePin)
        setForm({pin: mergePin})


    }
    console.log(form)
    // console.error()


    const inputPin = async () =>{
            await axios({
                method: "PUT",
                url: `http://localhost:8888/user?email=${email}`,
                data: form
            })
            .then(({data}) => {
                console.log('PIN Berhasil ditambahkan!', data)
                
                setTimeout(()=>{
                    navigate('/login')
                }, 3000)
            
            })
            
            .catch((er)=>{
                console.log(er.message)
            })

    } 
    
    const updateStatus = async() =>{
        try {
            const {data} = await axios(`http://localhost:8888/auth/${code}`)
            if(data.status != 200){
                navigate('/')
            }

            if(data.status == 200){
                setEmail(data.email)
            }


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() =>{
        updateStatus()
    },[])
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
