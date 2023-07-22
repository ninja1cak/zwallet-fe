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

function TransferDetail (id) {
    const params = useParams()
    const navigate = useNavigate()
    const api = useApi()
    const dispatch = useDispatch()
    const [user, setUser] = useState ([])
    const { data } = useSelector ((s) => s.users)
    const [storeData, setStoreData] = useState({})

    const inputChange = (e) => {
        const data = {...storeData}
        data[e.target.name] = e.target.value
        setStoreData(data)        
        dispatch(confirmation(storeData))
      }

    const getUserTransfer = async () => {
        try {
            const {data} = await api.get('/user/all?id=' +params.id)
            setUser(data.data)
            console.log(data)
        } catch (error) {
            
        }
    }
    useEffect(()=> {
        getUserTransfer()
    },[])
    return (
       <>
       <Header />
       <main className="bg-gray-200 pb-10">
       <div className="flex flex-row w-4/5 mx-auto gap-x-10">
        <div className="w-1/3 justify-center items-center mt-5">
            <NavbarSide />
        </div>
        <div className="flex flex-col w-2/3 pt-5 pr-5 bg-white pl-10 mt-10 rounded-lg pb-10">
            <h1 className="text-2xl font-bold mb-5">Transfer Money</h1>
            {user.map((v) => {
                return <Contact image={v.photo_profile} first_name={v.first_name} last_name={v.last_name} phone={v.phone_number} disabled/>
            })}
            <p className="mt-10">Type the amount you want to transfer and then</p>
            <p>press Continue to the next steps.</p>
            <input type="text" name="amount" onChange={inputChange} className="border-none w-full py-10 text-6xl text-center  focus:outline-0 text-gray-400 mt-10" placeholder="0.00" />
            <p className="text-center font-bold text-xl">{convertRupiah.convert(data.balance)} Available</p>
            <div className=" border-b border-gray-400 flex flex-row py-5 mt-10 w-1/2 mx-auto focus:outline-0 gap-x-5">
                <img src={search} alt="" className="ml-5"/>
                <input type="text" name="note" onChange={inputChange} className="border-none w-full focus:outline-0 text-base text-gray-400" placeholder="Add some notes"/>
            </div>
            <div className="flex flex-row items-end justify-end mr-20 mt-20">
            <button className="bg-primary text-white text-2xl  px-10 py-3 rounded-lg"  onClick={() => navigate(`/confirmation/${user[0].user_id}`)} >Continue</button>
            </div>
        </div>
       </div>
       </main>
       <Footer />
       </>

    )
}

export default TransferDetail