import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import Footer from '../../component/footer'
import NavbarSide from '../../component/navbarside'
import useApi from '../../helpers/useApi'
import { useSelector } from 'react-redux'
import convertRupiah from 'rupiah-format'
import Card from '../../component/card'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import withAuth from '../../helpers/withAuth'
import Loading from '../../component/loading'

function TransactionHistory() {
    const api = useApi()
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dataUser = useSelector((s) => s.users)
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([])
    const [allHistory, setAllHistory] = useState([])

    const [meta, setMeta] = useState([])
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [statusFilter, setStatusFilter] = useState(false)

    const {data} = useSelector(s => s.users)
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const navigate = useNavigate()

    const getAllHistory = async () =>{
        try {
            setLoading(true)
            const {data, meta} = await api(`/transaction?page=${page}&limit=999999`)
 
            let datas = data.data.map((e) =>{
                const dateTransfer = new Date(e.transfer_date)

                e = {
                    ...e,
                    transfer_date_string: dateTransfer.toLocaleTimeString('it-IT') +', ' + dateTransfer.toLocaleDateString(undefined, options)
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
            setAllHistory(datas)
            setHistory(datas)
            setMeta(data.meta)
            setLoading(false)

        } catch (error) {
            
        }
    }

    const income = () =>{
        const datas = allHistory.filter((transaction)=>{
            return (transaction.receiver_id == data.user_id );
        })
        setHistory(datas)
    }
    const expense = () =>{
        const datas = allHistory.filter((transaction)=>{
            return (transaction.sender_id == data.user_id );
        })
        setHistory(datas)
    }

    const filterData = () =>{
        const datas = allHistory.filter((transaction)=>{
            let transactionDate = new Date(transaction['transfer_date'])
            return (transactionDate >= startDate && transactionDate<= endDate);
        })

        setHistory(datas)
        setStatusFilter(false)
    }
    const handleSelect = (date) =>{
        setState([date.selection])
      };
    
    const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    }
    
    useEffect(() =>{
        getAllHistory()
    }, [])

    useEffect(() =>{
        if(startDate == null || endDate == null){
            getAllHistory()
        }else(
            filterData()
        )

    }, [ statusFilter, startDate, endDate])
  
  return (
    <>
    <Header/>
    <main className=" bg-gray-100">
        <div className='md:hidden flex flex-row items-center gap-x-4 pt-10 pl-4'>
            <FontAwesomeIcon icon={faArrowLeft} style={{color: "#45546e"}} className=' w-10 h-8' onClick={() => navigate('/home')}/>
            <h1 className=' font-semibold text-2xl'>History</h1>
        </div>


        <div className="flex w-[100%] mx-auto max-w-7xl gap-x-4 h-[800px] md:h-[875px] ">
            <NavbarSide />
            <div className=" block w-[100%] md:bg-white  rounded-lg  my-5">
                <p className='ml-10 mt-8 font-semibold text-xl hidden md:block'>Transaction History</p>
                <div className='md:px-10 mt-10 h-[610px] md:h-[610px]'>
                    {
                        loading === true ? 
                        <Loading />
                        : 
                        history.length != 0 ? 
                        history.slice(page == 1 ? 0: (4*(page-1)), page*4).map((e, index) => {
                            return <Card key={index} name = {e.first_name + ' ' + e.last_name} amount={e.amount} date={e.transfer_date_string} mb={'2rem'} />
                        }) : <p className='bg-white h-full'>Data Not Found</p>
                    }
                </div>

                <div className=' flex gap-x-4 justify-center mt-5'>
                  {
                    page == 1 ?  <button disabled className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white shadow-lg">Previous</button>:<button onClick={() => setPage(page-1)} className="btn btn-sm text-primary hover:bg-primary hover:text-white  border border-white w-24 bg-white shadow-lg">Previous</button>
                  }
                  <button className="btn btn-sm btn-outline bg-primary border border-white w-24 text-white" >{page}</button>
                  {
                    Math.ceil((history.length/4)) == page || Math.ceil((history.length/4)) == 0 ? <button disabled className="btn btn-sm btn-outline btn-primary border border-white w-24 bg-white shadow-lg">Next</button> : <button onClick={() => setPage(page+1)} className="btn btn-sm text-primary hover:bg-primary hover:text-white  border-white w-24 bg-white shadow-lg">Next</button>
                  }
                </div>

                                            
                <div className=' flex gap-x-4 justify-center mt-5'>               

                    <button onClick={() => income()} className="btn btn-sm text-primary hover:bg-primary hover:text-white shadow-lg w-10 bg-white"><FontAwesomeIcon icon={faArrowDown} style={{color: 'green'}} className="w-6 h-6"  /></button>
                    <button onClick={() => expense()} className="btn btn-sm text-primary hover:bg-primary hover:text-white  w-10 bg-white shadow-lg"><FontAwesomeIcon icon={faArrowUp} style={{color: 'red'}} className="w-6 h-6" /></button>                  
                    <button onClick={() => setShowModal(true)} className="btn btn-sm  text-primary hover:bg-primary hover:text-white  bg-white shadow-lg">Filter date</button>    
                    <button onClick={() => {setStartDate(null); setEndDate(null)}} className="btn btn-sm text-primary hover:bg-primary hover:text-white  bg-white shadow-lg">Reset date</button>                  
                                 
                </div>
                
            </div>
        </div>
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
                    Filter By Date 
                  </h3>
                  <p className="text-gray-400 mt-5">
                    Show transaction history by filter with date
                  </p>
                </div>
                {/*body*/}
                <DateRange
                        editableDateInputs={true}
                        ranges={state}
                        onChange={handleSelect}

                    /> 
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="px-8 py-5 text-red-500 bg-transparent font-bold uppercase rounded-lg text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:shadow-lg"
                    type="button"
                    onClick={() => {setStartDate(null); setEndDate(null);setShowModal(false)}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-primary px-8 py-5 text-white font-bold rounded-lg hover:shadow-lg"
                    type="button"
                    onClick={() => {setStartDate(state[0].startDate); setEndDate(state[0].endDate);setShowModal(false); setStatusFilter(true)}}

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
    </main>
    <Footer />
    </>  )
}

export default withAuth(TransactionHistory)
