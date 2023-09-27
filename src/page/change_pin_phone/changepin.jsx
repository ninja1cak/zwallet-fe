import React, {useEffect, useState}from 'react'
import NavbarSide from '../../component/navbarside'
import Header from '../../component/header'
import Footer from '../../component/footer'
import useApi from '../../helpers/useApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import withAuth from '../../helpers/withAuth'

function ChangePin ()  {

    const [form, setForm] = useState({})
    const [pin, setPin]= useState('')
    const [response, setResponse] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const {data, isAuth} = useSelector((s) => s.users)
    const [status, setStatus] = useState(0)
    const [btnState, setBtnState] = useState(true)
    const api = useApi()
    const navigate = useNavigate()
    const [otp, setOtp] = useState('');


    const checkPin = () =>{
        if(otp === data.pin){
            console.log(true)
            setStatus(201)
        }else{
            console.log(false)
            setStatus(404)
        }
    }

    const updatePin = async () =>{      

        try {
            console.log(otp)
            const {data} = await api({
                method: 'PATCH',
                url: '/user/update',
                data: {pin: otp}
            })
            setShowModal(true)
            setResponse(data.status)
            console.log(data)
        } catch (error) {
            
        }            
    }

    useEffect(() =>{
        if(otp.length <6){
            setBtnState(true)
        }else{
            setBtnState(false)
        }
    }, [otp])



  return (
    <div>
        <div className="bg-gray-100">
            <div className="hidden md:block"><Header /></div>
            <div className="flex gap-4 w-[100%] mx-auto max-w-7xl">
                <NavbarSide />
                <div className="w-full bg-gray-100  md:bg-white md:rounded-3xl my-4 h-[800px] md:h-[700px]">
                    <div className="flex flex-col py-12 md:py-10 px-8 gap-y-24 h-[800px] justify-between md:h-[700px]">
                        <div >
                        <div className="flex items-center md:hidden gap-x-5 top-4 absolute ">
                            <svg onClick={() => {navigate('/profile')}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                            </svg>
                            <h1 className="text-xl font-medium ">Change PIN</h1>
                        </div>
                        <div className="md:w-full lg:w-1/2">
                            <h1 className="hidden md:block text-2xl font-medium mb-12">Change PIN</h1>
                            {
                                status === 201 ? 
                                <span 
                                className=" md:text-lg text-gray-400 leading-loose">
                                Type your new 6 digits security PIN to use in Zwallet.
                                </span>
                                :
                                <span 
                                className=" md:text-lg text-gray-400 leading-loose">
                                Enter your current 6 digits Zwallet PIN below to continue to the next steps.
                                </span>

                            }

                        </div>
                        <div className=' flex flex-col gap-y-4 items-center mt-24'>
                            <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className=' ml-5'> </span>}
                            renderInput={(props) => <input {...props} />}
                            inputType='number'
                            inputStyle={{width:"35px", height: "40px", border: "solid 2px gray", borderRadius: "10px"}}
                            />
                            {
                                status === 404 ? <p className=' text-red-500 font-semibold'>Wrong pin</p> : null
                            }
                        </div>


                        </div>
                        {
                            status === 201 ?
                            <button 
                                    disabled = {btnState}
                                    className="w-[50%] btn mx-auto " 
                                    onClick={updatePin}>    
                                    Confirm
                            </button>
                            :
                            <button 
                                disabled = {btnState}
                                className="w-[100%] md:w-[50%] btn mx-auto " 
                                onClick={checkPin}>    
                                Confirm
                            </button>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>

        {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full "
          >
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Status
                  </h3>
                  {
                    response === 200 ? 
                    <p className="text-gray-400 mt-5">
                        Update pin success
                    </p>
                    :
                    <p className="text-gray-400 mt-5">
                        Update pin failed
                    </p>

                  }

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="px-8 py-5 text-red-500 bg-transparent font-bold uppercase rounded-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:shadow-lg"
                    type="button"
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary px-8 py-5 text-white font-bold rounded-lg hover:shadow-lg"
                    type="button"
                    onClick={() => navigate('/home')}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export default withAuth(ChangePin) 
