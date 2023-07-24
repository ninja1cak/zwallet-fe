import React, {useEffect, useState} from 'react'
import Sidebar from '../../component/sidebar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import OtpInput from 'react-otp-input';

const CreatePin = () => {
    const navigate = useNavigate()
    const {code} = useParams()
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('');
    const [btnState, setBtnState] = useState(true)

    useEffect(() =>{
        if(otp.length <6){
            setBtnState(true)
        }else{
            setBtnState(false)
        }
    }, [otp])


    const inputPin = async () =>{
            await axios({
                method: "PUT",
                url: `http://localhost:8888/user?email=${email}`,
                data: {
                    pin: otp
                }
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
    
            <div className='md:absolute w-[90%] mx-auto md:top-3 md:right-0 md:-me-0 md:p-5 md:inline-block  md:w-2/5 md:mx-10'>
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
                <div className=' font-semibold text-3xl xs:flex xs:justify-center xs:items-center  pt-10 mt-10 rounded-lg text-primary md:hidden sm:mx-5 md:mx-0'>
                    <h1>Zwallet</h1>            
                </div>
                <h2 className='font-bold text-2xl text-center md:hidden mt-32 mb-4'>Create Security PIN</h2>
                <p className=' text-center text-gray-400 mb-10 md:hidden'>Create a PIN that's contain 6 digits number for <br /> security purpose in Zwallet</p>
    
                <div className='w-full flex flex-row justify-center mb-10'>
                            <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className=' ml-5'> </span>}
                            renderInput={(props) => <input {...props} />}
                            inputType='number'
                            inputStyle={{width:"35px", height: "40px", border: "solid 2px gray", borderRadius: "10px"}}
                            />

                </div>
    
                <button className=' btn  w-full mt-40 ' onClick={inputPin} disabled={btnState}>
                    Confirm
                </button>

            </div>
    
    
    
        </div>
      )
}

export default CreatePin
