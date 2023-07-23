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

    const { data } = useSelector ((s) => s.users)
    const getDataUser = async () =>{
        try {
            const {data} = await api('/user')
            setUser(data.data[0])
            dispatch(addData(data.data[0]))
        } catch (error) {
            
        }
    }

    useEffect(()=> {
        getDataUser()
    },[])

    return (
        <>
        <div className="hidden lg:block"><Header /></div>
        <main className="w-full bg-gray-100">
        <div className="flex flex-row w-[100%] max-w-7xl mx-auto bg-gray-100 gap-x-4 ">

            <NavbarSide />            
            <div className="bg-white rounded-lg px-10 py-10 w-full flex flex-col gap-y-5 mt-5">
            <img src={failedLogo} alt="" className="object-contain max-h-24"/>
            <h1 className="font-bold text-center">Transfer Failed</h1>
            <p className="text-center text-gray-400">We can’t transfer your money at the moment, we recommend you to check your <br></br>internet connection and try again.</p>
            {userReceiver.map((v) => {
                return <Contact image={v.photo_profile} first_name={v.first_name} last_name={v.last_name} phone={v.phone_number} />
            })}
            <h1>Details</h1>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Amount</p>
                <p>{convertRupiah.convert(data.amount)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Balance Left</p>
                <p>{convertRupiah.convert(data.balance)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Date & Time</p>
                <p></p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p>Notes</p>
                <p>{data.note}</p>
            </div>
            <div className="flex flex-row items-end justify-end ">
                <button className="px-10 bg-primary text-white rounded-lg btn">
                    Try Again</button> <div/>
            </div>
            </div>

        </div>
        </main>
        <div className="hidden lg:block"><Footer /></div>
        </>
    )
}

export default Failed