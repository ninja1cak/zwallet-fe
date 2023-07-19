import React from "react";
import Card from '../../component/card'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useApi from "../../helpers/useApi";
import { addData } from "../../store/reducer/user";
import convertRupiah from 'rupiah-format'

function Home() {

    const [transactionLog, setTransactionLog] = useState([])
    const [user, setUser] = useState([])
    const dispatch = useDispatch()
    const api = useApi()
    const getTransactionLog = async () =>{
        try {
            const {data} = await api(`/transaction`)
            let dataTransaction 
            dataTransaction = data.data.map((e) =>{
                
                if(e.sender_id == 11){
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
        getTransactionLog()
    },[])

    return (
        <main className=" bg-gray-400 ">
            <div className=" block mx-auto w-[100%] max-w-7xl">
                <section id='balance' className=" bg-primary w-[100%] max-w-7xl rounded-xl p-4 flex justify-between">
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
                <div className="w-[100%] max-w-7xl flex justify-between">
                    <section className=" bg-white w-96 p-4">
                        <div className="flex justify-between">
                            <div>
                                <p>&#8595;</p>
                                <p>Income</p>
                                <p>{convertRupiah.convert(user.income)}</p>
                            </div>
                            <div>
                                <p>&#8593;</p>
                                <p>Expense</p>
                                <p>{convertRupiah.convert(user.balance)}</p>
                            </div>
                        </div>
                    </section>
                    <section className="bg-white w-96 p-6">
                        <div className=" flex justify-between mb-8">
                            <p className=" font-medium">Transaction History</p>
                            <p className=" text-primary">See all</p>
                        </div>
                        {
                            transactionLog ? transactionLog.map((e) => {
                                return <Card name={e.first_name + ' ' + e.last_name} amount={e.amount} />
                            }) : ''
                        }
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Home