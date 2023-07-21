import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import NavbarSide from '../../component/navbarside'
import useApi from '../../helpers/useApi'
import { useSelector } from 'react-redux'
import convertRupiah from 'rupiah-format'
import Card from '../../component/card'

function TransactionHistory() {
    const api = useApi()
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dataUser = useSelector((s) => s.users)
    const [history, setHistory] = useState([])
    const [meta, setMeta] = useState([])
    const [page, setPage] = useState('1')

    const getHistory = async () =>{
        try {
            const {data, meta} = await api(`/transaction?page=${page}`)
 
            let datas = data.data.map((e) =>{
                const dateTransfer = new Date(data.data[0].transfer_date)
                
                e = {
                    ...e,
                    transfer_date: dateTransfer.toLocaleTimeString('it-IT') +', ' + dateTransfer.toLocaleDateString(undefined, options)
                }

                if(e.sender_id == dataUser.data.user_id){
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

            console.log(datas)
            setHistory(datas)
            setMeta(data.meta)

        } catch (error) {
            
        }
    }

    useEffect(() =>{
        getHistory()
    }, [])

    useEffect(() =>{
        getHistory()
    }, [ page])
  
  return (
    <>
    <Header/>
    <main className=" bg-gray-100">
        <div className="flex w-[100%] mx-auto max-w-7xl gap-x-4 h-[700px] ">
        
            <NavbarSide />
            <div className=" block w-[100%] bg-white  rounded-lg  my-5">
                <p className='ml-10 mt-8 font-semibold text-xl'>Transaction History</p>
                <div className='px-10 mt-10  h-[470px]'>
                    {
                        history ? 
                        history.map((e) => {
                            return <Card name = {e.first_name + ' ' + e.last_name} amount={e.amount} date={e.transfer_date} />
                        }) : ''
                    }
                </div>
                { isNaN(meta.prev) ? '':                
                <div className=' flex gap-x-4 justify-center mt-5'>
                  {
                    meta.prev === null ? <button disabled className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white">Previous</button> : <button onClick={() => setPage(meta.prev)} className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white">Previous</button>

                  }
                  <button className="btn btn-sm btn-outline bg-primary border border-white w-24 text-white" >{meta.prev === null? '1'  : meta.prev + 1}</button>
                  {
                    meta.next === null ? <button disabled className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white">Next</button> : <button onClick={() => setPage(meta.next)} className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white">Next</button>
                  }
                  
                </div>
                }
            </div>
        </div>

    </main>
    <Footer />
    </>  )
}

export default TransactionHistory