import React from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import NavbarSide from "../../component/navbarside";
import Contact from "../../component/Contact";
import { useState, useEffect } from "react";
import useApi from "../../helpers/useApi";
import { useParams } from "react-router-dom";
import OtpInput from 'react-otp-input';
import { useSelector } from 'react-redux/es/hooks/useSelector'
import convertRupiah from 'rupiah-format'


function Confirmation () {
    const [otp, setOtp] = useState('');
    const params = useParams()
    const api = useApi()
    const [dateTransfer, setDateTransfer] = useState('')
    const [dateJSON, setDateJSON] = useState('')
    const [user, setUser] = useState ([])
    const [showModal, setShowModal] = React.useState(false);
    const { amount, note, data } = useSelector ((s) => s.users)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };


    const transfer = async () => {
      try {
        const response = await api.post('transaction?receiver_id=' + params.id, {
          amount: amount,
          note: note,
          transfer_date: dateJSON
        });
        console.log(response)
      } catch (error) {
        
      }
    }

    const getUserTransfer = async () => {
        try {
            const {data} = await api.get('/user/all?id=' +params.id)
            setUser(data.data)
        } catch (error) {
            
        }
    }
    useEffect(()=> {
        getUserTransfer()
        const date = new Date()
        setDateTransfer(date.toLocaleDateString(undefined, options)+' - '+ date.toLocaleTimeString('it-IT'))
        setDateJSON(date.toJSON())
    },[])
    return (
        <>
        <Header/>
        <main className="flex flex-row w-full bg-gray-300 gap-x-10 px-20">
        <div className="w-1/3">
            <NavbarSide/>
        </div>
        <div className="bg-white rounded-lg px-10 py-10 w-2/3 flex flex-col gap-y-5">
            <h1>Transfer To</h1>
            {user.map((v) => {
                return <Contact image={v.photo_profile} first_name={v.first_name} last_name={v.last_name} phone={v.phone_number} disabled/>
            })}
            <h1>Details</h1>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Amount</p>
                <p>{convertRupiah.convert(amount)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Balance Left</p>
                <p>{convertRupiah.convert(data.balance-amount)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Date & Time</p>
                <p>{dateTransfer}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Notes</p>
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
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                inputStyle="border border-gray-300 py-2 rounded-lg" 
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
                    onClick={transfer}

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
            
        </div>
        
   

        </main>
        <Footer/>
        </>
    )
}

export default Confirmation