import React, { useEffect, useState} from "react";
import NavbarSide from "../../component/navbarside";
import Header from "../../component/header";
import Footer from "../../component/footer";
import {useNavigate, useParams} from 'react-router-dom'
import useApi from "../../helpers/useApi";
import search from '../../assets/edit-2.png'
import Contact from "../../component/Contact";
import { useSelector } from 'react-redux/es/hooks/useSelector'
import convertRupiah from 'rupiah-format'
import { useDispatch } from "react-redux";
import { confirmation } from "../../store/reducer/user";
import { Show } from "../../helpers/toast";

function TransferDetail (id) {
    const params = useParams()
    const navigate = useNavigate()
    const api = useApi()
    const dispatch = useDispatch()
    const [user, setUser] = useState ([])
    const { data } = useSelector ((s) => s.users)
    const [storeData, setStoreData] = useState({})
    const {isAuth} = useSelector ((s) => s.users)

    const inputChange = (e) => {
        const data = {...storeData}
        data[e.target.name] = e.target.value
        setStoreData(data)
       
      }
    
    const handleContinue = () => {
        if (!storeData.amount) {
            Show("Please enter Transfer Amount","warning");
            return;
          }
        const amountValue = parseFloat(storeData.amount);
        const balanceValue = parseFloat(data.balance);
        if (amountValue > balanceValue) {
        Show("Insufficient Balance.","warning");
        return;}
        dispatch(confirmation(storeData))
        navigate(`/confirmation/${user[0].user_id}`);
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
    },[])
    useEffect(()=> {
        if (!isAuth) {
            navigate ('/')
          }
    },[isAuth,inputChange])
    return (
        <>
        <div className="hidden lg:block"><Header /></div>
        <main className="w-full bg-gray-100">
        <div className="flex flex-row w-[100%] max-w-7xl mx-auto  bg-gray-100 gap-x-4 ">

            <NavbarSide />            

            <div className="flex flex-col w-full px-10 py-10 bg-gray-100 lg:bg-white mt-4 rounded-lg pb-10">
            <div className="flex items-center lg:hidden gap-x-5 top-4 absolute ">
                <svg onClick={() => {navigate('/transfer')}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
                <h1 className="text-xl font-medium lg:hidden">Transfer Money</h1>
            </div>
            <h1 className="text-2xl font-bold mb-5 hidden lg:block">Transfer Money</h1>
            {user.map((v) => {
                return <Contact image={v.photo_profile} first_name={v.first_name} last_name={v.last_name} phone={v.phone_number} disabled/>
            })}
            <p className="mt-10 hidden lg:block">Type the amount you want to transfer and then</p>
            <p className=" hidden lg:block">press Continue to the next steps.</p>
            <input type="number" name="amount" onChange={inputChange} className=" text-primary border-none w-full py-10 bg-gray-100 lg:bg-white text-6xl text-center  focus:outline-0  mt-10" placeholder="0.00" />
            <p className="text-center font-bold text-xl">{convertRupiah.convert(data.balance)} Available</p>
            <div className=" border-b border-gray-400 flex flex-row py-5 mt-10 w-1/2 mx-auto focus:outline-0 gap-x-5">
                <img src={search} alt="" className="ml-5"/>
                <input  type="text"  name="note" onChange={inputChange} className="border-none w-full focus:outline-0 text-base bg-gray-100 lg:bg-white text-gray-400" placeholder="Add some notes (optional)"/>
            </div>
            <div className="flex flex-row items-end justify-end mr-20 mt-20">
            <button className="bg-primary text-white text-2xl  px-10 py-3 rounded-lg"  onClick={handleContinue} >Continue</button>
            </div>
        </div>

        </div>
        </main>
        <Footer />
        </>

    )
}

export default TransferDetail