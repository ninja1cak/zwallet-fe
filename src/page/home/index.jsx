import React from "react";
import Card from '../../component/card'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../helpers/useApi";
import { addData, logout } from "../../store/reducer/user";
import convertRupiah from 'rupiah-format'
import Header from'../../component/header'
import Footer from'../../component/footer'
import NavbarSide from "../../component/navbarside";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from '@fortawesome/free-solid-svg-icons'

function Home() {
    const {data} = useSelector((s) => s.users)

    const [transactionLog, setTransactionLog] = useState([])
    const [user, setUser] = useState([])
    const dispatch = useDispatch()
    const api = useApi()
    const getTransactionLog = async () =>{
        try {
            const {data} = await api(`/transaction`)
            let dataTransaction 
            dataTransaction = data.data.map((e) =>{
                if(e.sender_id == user.user_id){
                    e = {...e,
                        amount: `-${convertRupiah.convert(e.amount)}`
                    }
                }else{
                    e = {...e,
                        amount: `+${convertRupiah.convert(e.amount)}`    
                    }
                }

                return e
            })
            console.log(dataTransaction)
            setTransactionLog(dataTransaction)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getDataUser = async () =>{
        try {
            const {data} = await api('/user')
            setUser(data.data[0])
            console.log(data.data[0])
            dispatch(addData(data.data[0]))
            
        } catch (error) {
            
        }
    }
    useEffect(() =>{
        getDataUser()
    },[])

    useEffect(() =>{
        getTransactionLog()
    },[user])

    

    return (
        <>
        <Header/>

        <div className="shadow-lg lg:hidden rounded-b-3xl bg-white">
            <div className="flex justify-between px-4 pt-16 pb-10 w-[100%] max-w-7xl mx-auto ">
                <div className="dropdown dropdown-hover w-full ">
                    <div className="flex items-center justify-between  w-[100%]  gap-4">
                        <div className=" flex">
                            <img className=" w-12 h-12 " src={user.photo_profile} alt="profile_picture" />
                            <div>
                            <p>Hello,</p>
                            <h2 className="text-lg font-medium">{data.first_name + ' ' + data.last_name}</h2>
                            </div>
                        </div>

                        <div className="pl-3">
                            <FontAwesomeIcon icon={faBell} color="gray" size="xl" />
                        </div>
                    </div>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/#">adasdasdsa</Link></li>
                        <li><Link to="/#">ohkfhkfkkm</Link></li>
                    </ul>
                </div>
            </div>
        </div>

        <main className=" bg-gray-100">
            <div className="flex w-[100%] mx-auto max-w-7xl gap-x-4 h-[700px] ">
                
                <NavbarSide />
                <div className=" block w-[100%] my-5 ">
                    <section id='balance' className=" bg-primary w-[100%] rounded-xl p-4 flex justify-between ">
                        <div>
                            <p className="text-white font-light tracking-wider">Balance</p>
                            <p className="text-white text-4xl my-4">{convertRupiah.convert(user.balance)}</p>
                            <p className="text-white tracking-wider">{user.phone_number ? user.phone_number : "set your phone number"}</p>
                        </div>
                        <div>
                            <button className=" block btn w-32 mb-4 bg-indigo-400 text-white">Transfer</button>
                            <button className=" btn w-32 bg-indigo-400 text-white">Top Up</button>
                        </div>
                    </section>
                    <div className="w-[100%] flex justify-between gap-x-4">
                        <section className=" hidden md:block bg-white w-[55%] p-4 mt-4 rounded-lg">
                            <div className="flex justify-between">
                                <div>
                                    <p>&#8595;</p>
                                    <p>Income</p>
                                    <p>{convertRupiah.convert(user.income)}</p>
                                </div>
                                <div>
                                    <p>&#8593;</p>
                                    <p>Expense</p>
                                    <p>{convertRupiah.convert(user.expense)}</p>
                                </div>
                            </div>
                        </section>
                        <section className="bg-white w-[100%] md:w-[50%]  p-6 mt-4 rounded-lg">
                            <div className=" flex justify-between mb-8">
                                <p className=" font-medium">Transaction History</p>
                                <Link to='/history' className=" text-primary">See all</Link>
                            </div>
                            {
                                transactionLog ? transactionLog.map((e) => {
                                    return <Card name={e.first_name + ' ' + e.last_name} amount={e.amount} />
                                }) : ''
                            }
                        </section>
                    </div>
                </div>
            </div>

        </main>
        <Footer />
        </>

    )
}

export default Home