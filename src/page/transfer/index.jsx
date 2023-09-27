import React, {useEffect, useState} from "react";
import Header from '../../component/header'
import Footer from '../../component/footer'
import Search from '../../assets/search.png'
import Contact from '../../component/Contact'
import useApi from "../../helpers/useApi";
import NavbarSide from "../../component/navbarside";
import { useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import Default_photo from '../../assets/default_photo.png'
import withAuth from "../../helpers/withAuth";
import Loading from "../../component/loading";

function Transfer () {
    const api = useApi()
    const [user,setUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [searchQuery, setSearchQuery] = useState([])
    const navigate = useNavigate()
    const {isAuth} = useSelector ((s) => s.users)
    const {loading, setLoading} = useState(true) 

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };

    const getUser = async () => {
        try {
            setLoading(true)
            const {data} = await api.get(`/user/all?limit=5&page=${currentPage}&search=${searchQuery}`)
            setUser(data.data)
            setTotalPages(Math.ceil(data.meta.total / 5))
            setLoading(false)
        } catch (error) {   
            console.log(error)
        }
    }
    const goToPrevPage = () => {
        setCurrentPage((prevPage)=> prevPage-1)
      }
    
      const goToNextPage = () => {
        setCurrentPage((prevPage)=> prevPage+1)
      }

    useEffect(()=> {
        // if (!isAuth) {
        //     navigate ('/')
        //   }
        getUser()
    },[currentPage,searchQuery,isAuth])
    return(
        <>
        <div className="hidden lg:block"><Header /></div>
        <main className="w-full bg-gray-100">
        <div className="flex flex-row w-[100%] max-w-7xl mx-auto bg-gray-100 gap-x-4 ">

            <NavbarSide />            
            <div className="flex flex-col w-full bg-gray-100 lg:bg-white rounded-lg px-10 lg:px-5 py-10 mt-4 h-[800px] lg:h-full">
                <div className="flex items-center lg:hidden gap-x-5 top-4 absolute ">
                    <svg onClick={() => {navigate('/home')}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                    <h1 className="text-xl font-medium ">Find Receiver</h1>
                </div>
                <h1 className="font-bold text-xl mb-5 hidden lg:block">Search Receiver</h1>
                <div className="border border-gray-100 flex flex-row rounded-lg bg-gray-200 lg:bg-gray-100">
                <img src={Search} alt="" className="object-contain ml-3 " />
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search Receiver Here" className="input border-none w-full bg-gray-200 lg:bg-gray-100 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-y-5 mt-10 h-[500px]">
                { loading ? <Loading /> : user ? ( 
                    user.map((v, index)=>{
                        return <Contact key={index} image={v.photo_profile || Default_photo} first_name={v.first_name} last_name={v.last_name} phone={v.phone_number} id={v.user_id}  />
                    })):(<h1>data not found</h1>)
                }
                </div>
                <div className="flex items-center justify-center mt-10">
                {currentPage > 1 && (
                    <a
                    href="#"
                    onClick={goToPrevPage}
                    className="px-3 py-3 bg-white rounded-lg text-primary hover:bg-primary hover:text-white border border-gray-300"
                    >
                    Prev
                    </a>
                )}
                {currentPage < totalPages && (
                    <a
                    href="#"
                    onClick={goToNextPage}
                    className="px-3 py-3 bg-white rounded-lg text-primary hover:bg-primary hover:text-white border border-gray-300"
                    >
                    Next
                    </a>
                )}
                </div>
            </div>

        </div>
        </main>
        <Footer />
        </>
    )
}

export default withAuth(Transfer) 