import React from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import NavbarSide from "../../component/navbarside";
import Contact from "../../component/Contact";
import { useState, useEffect } from "react";
import useApi from "../../helpers/useApi";
import { useNavigate, useParams } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { useSelector } from 'react-redux/es/hooks/useSelector'
import convertRupiah from 'rupiah-format'
import { Show } from "../../helpers/toast";
import withAuth from "../../helpers/withAuth";


function Confirmation () {
    const [otp, setOtp] = useState('');
    const params = useParams()
    const api = useApi()
    const navigate = useNavigate()
    const [dateTransfer, setDateTransfer] = useState('')
    const [dateJSON, setDateJSON] = useState('')
    const [user, setUser] = useState ([])
    const [transaction, setTransaction] = useState ([])
    const [showModal, setShowModal] = React.useState(false);
    const { amount, note, data } = useSelector ((s) => s.users)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const {isAuth} = useSelector ((s) => s.users)

    const validatePin = () => {
      return data.pin === otp
    }
    const transfer = async () => {
      if (validatePin()){
      try {
        const response = await api.post('transaction?receiver_id=' + params.id, {
          amount: amount,
          note: note,
          transfer_date: dateJSON
        });
        Show('Transfer Success', 'success')
        setTimeout(()=> {
          navigate('/success')
        },3000)
      } catch (error) {
        
      }
    } else {
      Show('INVALID PIN please try again',"error")
    }
  }


    const getUserTransfer = async () => {
        try {
            const {data} = await api.get('/user/all?id=' +params.id)
            setUser(data.data)
        } catch (error) {
            
        }
    }

    const getTransaction = async () => {
      try {
        const {data} = await api.get ('/transaction')
        setTransaction = (data.data)
      } catch (error) {
        
      }
    }
    useEffect(()=> {
        getUserTransfer()
        getTransaction()
        const date = new Date()
        setDateTransfer(date.toLocaleDateString(undefined, options)+' - '+ date.toLocaleTimeString('it-IT'))
        setDateJSON(date.toLocaleDateString(undefined, options) + ' ' + date.toLocaleTimeString('it-IT'))
    },[])
    

    return (
      <>
      <div className="hidden lg:block"><Header /></div>
      <main className="w-full bg-gray-100">
      <div className="flex flex-row w-full max-w-7xl mx-auto bg-gray-100 gap-x-4 ">

          <NavbarSide />            
          <div className="bg-gray-100 lg:bg-white rounded-lg px-10 py-10 w-full flex flex-col gap-y-5 mt-4">
            <div className="flex items-center lg:hidden gap-x-5 top-4 absolute ">
                <svg onClick={() => {navigate('/transfer')}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
                <h1 className="text-xl font-medium lg:hidden">Confirmation</h1>
            </div>
            <h1 className="font-bold">Transfer To</h1>
            {user.map((v) => {
                return <Contact image={v.photo_profile} first_name={v.first_name} last_name={v.last_name} phone={v.phone_number} disabled/>
            })}
            <h1 className="font-bold">Details</h1>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p className="font-bold">Amount</p>
                <p>{convertRupiah.convert(amount)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p className="font-bold">Balance Left</p>
                <p>{convertRupiah.convert(data.balance-amount)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p className="font-bold">Date & Time</p>
                <p>{dateTransfer}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p className="font-bold">Notes</p>
                <p>{note}</p>
            </div>
            <div className="flex flex-row items-end justify-end mr-20 ">
            <button className="bg-primary text-white text-2xl  px-10 py-3 rounded-lg"  onClick={() => setShowModal(true)} >Continue</button>
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
                    Enter PIN to Tranfer
                  </h3>
                  <p className="text-gray-400 mt-5">
                    Enter your 6 digits PIN for confirmation <br></br>to continue transferring money.
                  </p>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-col items-center flex justify-center">
                            <OtpInput
                value={otp}
                name="pin"
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                inputStyle={{width:"35px", height: "40px", border: "solid 2px gray", borderRadius: "10px"}}
                inputContainerStyle="inline-block mx-1"
                shouldAutoFocus
                renderInput={(props) => <input {...props} />}
                />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="px-8 py-5 text-red-500 bg-transparent font-bold uppercase rounded-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:shadow-lg"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary px-8 py-5 text-white font-bold rounded-lg hover:shadow-lg"
                    type="button"
                    onClick={transfer}>
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
        </div>

      </div>
      </main>
      <Footer />
      </>
    )
}

export default withAuth(Confirmation) 