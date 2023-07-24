import React from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import NavbarSide from "../../component/navbarside";
import Contact from "../../component/Contact";
import { useState, useEffect } from "react";
import useApi from "../../helpers/useApi";
import successlogo from '../../assets/Group 39.png'
import convertRupiah from 'rupiah-format'
import { useDispatch } from "react-redux";
import { addData } from "../../store/reducer/user";
import { useSelector } from 'react-redux/es/hooks/useSelector'
import share from '../../assets/share-2.png'
import download from '../../assets/download.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Success () {
    const [user, setUser] = useState ([])
    const [userReceiver, setUserReceiver] = useState ([])
    const api = useApi()
    const dispatch = useDispatch()
    const [dataTransfer, setDataTransfer] = useState ([])
    const navigate= useNavigate()
    const {isAuth} = useSelector ((s) => s.users)

      const getUserTransfer = async () => {
        try {
            const {data} = await api.get(`/user/all?id=${dataTransfer.receiver_id}`)
            console.log(data)
            setUserReceiver(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const formatDate = (dateString) => {
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options);
      };

    const { data } = useSelector ((s) => s.users)
    const getDataUser = async () =>{
        try {
            const {data} = await api('/user')
            setUser(data.data[0])
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
        getDataUser()
    },[dataTransfer])
    useEffect(() => {
        if (!isAuth) {
            navigate ('/')
          }
          getTransaction()
          
    },[isAuth])
    return (
        <>
        <div className="hidden lg:block"><Header /></div>
        <main className="w-full bg-gray-100">
        <div className="flex flex-row w-[100%] max-w-7xl mx-auto bg-gray-100 gap-x-4 ">

            <NavbarSide />            
            <div className="bg-white rounded-lg px-10 py-10 w-full flex flex-col gap-y-5 mt-5">
            <img src={successlogo} alt="" className="object-contain max-h-24"/>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p className="font-bold">Amount</p>
                <p>{convertRupiah.convert(dataTransfer.amount)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p className="font-bold" >Balance Left</p>
                <p>{convertRupiah.convert(data.balance)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p className="font-bold">Date & Time</p>
                <p>{formatDate(dataTransfer.transfer_date)}</p>
            </div>
            <div className="w-full px-5 py-5 bg-white drop-shadow-lg rounded-lg">
                <p className="font-bold">Notes</p>
                <p>{dataTransfer.note}</p>
            </div>
            <h1 className="font-bold">Transfer to</h1>
                            {
                userReceiver ? (
                    userReceiver.map((v) => {
                    return (
                        <Contact
                        key={v.id} 
                        image={v.photo_profile}
                        first_name={v.first_name}
                        last_name={v.last_name}
                        phone={v.phone_number}
                        />
                    );
                    })
                ) : (
                    <h1>datanotfound</h1>
                )
                }
            <div className="flex flex-row items-end justify-end  gap-x-5"> 
                <div className="btn px-2 py-2 rounded-lg"><img src={share} alt="" /></div>
                <div className="btn px-8 py-2 flex flex-row rounded-lg"><img src={download} alt="" /> Download PDF</div>
                <Link to="/home" className="btn px-8 py-2 text-white bg-primary rounded-lg hover:text-primary hover:bg-white">Back to Home</Link> 
                    <div/>
            
            </div>
            </div>

        </div>
        </main>
        <div className="hidden lg:block"><Footer /></div>
        </>
    )
}

export default Success