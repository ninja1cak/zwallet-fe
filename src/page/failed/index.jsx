import React from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import NavbarSide from "../../component/navbarside";
import Contact from "../../component/Contact";
import { useState, useEffect } from "react";
import useApi from "../../helpers/useApi";
import failedLogo from '../../assets/failed.png'
import convertRupiah from 'rupiah-format'
import { useDispatch } from "react-redux";
import { addData } from "../../store/reducer/user";
import { useSelector } from 'react-redux/es/hooks/useSelector'


function Failed () {
    const [user, setUser] = useState ([])
    const [userReceiver, setUserReceiver] = useState ([])
    const api = useApi()
    const dispatch = useDispatch()
    const [dataTransfer, setDataTransfer] = useState ([])
      const getUserTransfer = async () => {
        try {
            const {data} = await api.get(`/user/all?id=${dataTransfer[0].receiver_id}`)
            setUserReceiver(data.data)
        } catch (error) {
        }
    }

    const { data } = useSelector ((s) => s.users)
    const getDataUser = async () =>{
        try {
            const {data} = await api('/user')
            setUser(data.data[0])
            console.log(data.data[0])
            dispatch(addData(data.data[0]))
        } catch (error) {
            
        }
    }
    const getTransaction = async () => {
        try {
          const {data} = await api.get ('/transaction')
          console.log(data)
          setDataTransfer (data.data[0])
        } catch (error) {
          
        }
      }
    useEffect(()=> {
        getUserTransfer()
        getTransaction()
        getDataUser()
    },[])

    return (
        <>
        <Header/>
        <main className="flex flex-row w-full bg-gray-300 gap-x-10 px-20">
        <div className="w-1/3">
            <NavbarSide/>
        </div>
        <div className="bg-white rounded-lg px-10 py-10 w-2/3 flex flex-col gap-y-5">
            <img src={failedLogo} alt="" className="object-contain max-h-24"/>
            <h1></h1>
            {userReceiver.map((v) => {
                return <Contact image={v.photo_profile} first_name={v.first_name} last_name={v.last_name} phone={v.phone_number} />
            })}
            <h1>Details</h1>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Amount</p>
                <p>{convertRupiah.convert(dataTransfer.amount)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Balance Left</p>
                <p>{convertRupiah.convert(data.balance)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Date & Time</p>
                <p>{dataTransfer.transfer_date}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Notes</p>
                <p>{dataTransfer.note}</p>
            </div>
            <div className="flex flex-row items-end justify-end mr-20 "> <div/>
            </div>
            </div>
            </main>
            <Footer />
        </>
    )
}

export default Failed