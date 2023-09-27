import React from "react";
import Card from '../../component/card'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../helpers/useApi";
import { addData, addTransactionLog } from "../../store/reducer/user";
import convertRupiah from 'rupiah-format'
import Header from'../../component/header'
import Footer from'../../component/footer'
import NavbarSide from "../../component/navbarside";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import Default_photo from '../../assets/default_photo.png'
import dummyGraph from '../../assets/graphic.png'
import withAuth from "../../helpers/withAuth";
import Loading from "../../component/loading";

function Home() {
    const {data} = useSelector((s) => s.users)
    const navigate = useNavigate()  
    const [transactionLog, setTransactionLog] = useState([])
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const api = useApi()

    const getTransactionLog = async () =>{
        try {
            setLoading(true)

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

            const date = new Date()

            date.setDate(date.getDate()-7)
            
            const filter = data.data.filter((e) =>{
                let transactionDate = new Date (e.transfer_date)
                return (transactionDate >= date)
            })

            console.log(dataTransaction)
            dispatch(addTransactionLog(filter))
            setTransactionLog(dataTransaction)
            setLoading(false)

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
        getTransactionLog()

    },[])


    useEffect(() =>{
        console.log(transactionLog)

    },[transactionLog])

    return (
        <>
        <Header/>

        <Link to='/profile' className="shadow-lg md:hidden rounded-b-3xl bg-white">
            <div className="flex justify-between px-4 pt-16 pb-10 w-[100%] max-w-7xl mx-auto ">
                <div className="dropdown dropdown-hover w-full ">
                    <div className="flex items-center justify-between  w-[100%]  gap-4">
                        <div className=" flex gap-x-4">
                            <img className=" w-12 h-12 " src={user.photo_profile ? user.photo_profile : Default_photo} alt="profile_picture" />
                            <div>
                            <p>Hello,</p>
                            <h2 className="text-lg font-medium">{data.first_name + ' ' + data.last_name}</h2>
                            </div>
                        </div>

                        <div className="pl-3">
                            <FontAwesomeIcon icon={faBell} color="gray" size="xl" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>

        <main className=" bg-gray-100">
            <div className="flex w-[100%] mx-auto max-w-7xl gap-x-4 md:h-[700px] ">
                
                <NavbarSide />
                <div className=" block w-[100%] my-5 ">
                    <section id='balance' className=" bg-primary w-[100%] rounded-xl p-4 flex justify-between ">
                        <div>
                            <p className="text-white font-light tracking-wider">Balance</p>
                            {
                                loading || user.balance === undefined ? 
                                <div className=" mt-4">
                                    <Loading color='white'/> 
                                </div>
                                :
                                <>
                                    <p className="text-white text-4xl my-4">{convertRupiah.convert(user.balance)}</p>
                                    <p className="text-white tracking-wider">{user.phone_number ? user.phone_number : "set your phone number"}</p>
                                </>
                            }

                        </div>
                        <div>
                            <button className=" block btn w-32 mb-4 bg-indigo-400 text-white" onClick={() => navigate('/transfer')}>Transfer</button>
                            <button className=" btn w-32 bg-indigo-400 text-white">Top Up</button>
                        </div>
                    </section>
                    <section className=" block md:hidden bg-white w-full p-4 mt-4 rounded-lg">
                            <div className="flex justify-between">
                                <div>
                                    <FontAwesomeIcon icon={faArrowDown} style={{color: 'green'}} className="w-6 h-6"  />
                                    <p className=" font-medium text-gray-500">Income</p>
                                    {
                                        loading || user.income === undefined ?
                                        <Loading /> :
                                        <p className=" font-bold text-lg">{convertRupiah.convert(user.income)}</p>
                                    }

                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faArrowUp} style={{color: 'red'}} className="w-6 h-6" />
                                    <p className=" font-medium text-gray-500">Expense</p>
                                    {
                                        loading || user.expense === undefined ?
                                        <Loading /> :
                                        <p className=" font-bold text-lg">{convertRupiah.convert(user.expense)}</p>
                                    }
                                </div>
                            </div>
                            <img src={dummyGraph} alt="" />
                    </section>
                    <div className="w-[100%] flex justify-between gap-x-4">
                        <section className=" hidden md:block bg-white w-[55%] p-4 mt-4 rounded-lg">
                            <div className="flex justify-between">
                                <div>
                                    <FontAwesomeIcon icon={faArrowDown} style={{color: 'green'}} className="w-6 h-6"  />
                                    <p className=" font-medium text-gray-500">Income</p>
                                    {
                                        loading || user.income === undefined  ?
                                        <Loading /> :
                                        <p className=" font-bold text-lg">{convertRupiah.convert(user.income)}</p>
                                    }
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faArrowUp} style={{color: 'red'}} className="w-6 h-6" />
                                    <p className=" font-medium text-gray-500">Expense</p>
                                    {
                                        loading || user.expense === undefined ?
                                        <Loading /> :
                                        <p className=" font-bold text-lg">{convertRupiah.convert(user.expense)}</p>
                                    }
                                </div>
                            </div>
                            <img src={dummyGraph} alt="" />
                        </section>
                        <section className="bg-white w-[100%] md:w-[50%]  p-6 mt-4 rounded-lg">
                            <div className=" flex justify-between mb-8">
                                <p className=" font-medium">Transaction History</p>
                                <Link to='/history' className=" text-primary">See all</Link>
                            </div>
                            {
                                                       
                                loading || transactionLog === "" ?
                                <Loading /> :                  
                                transactionLog ? transactionLog.map((e, index) => {
                                    return <Card key={index} name={e.first_name + ' ' + e.last_name} amount={e.amount} mb={'0.5rem'} />
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

export default withAuth(Home) 