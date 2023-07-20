import React, {useEffect, useState} from "react";
import Header from '../../component/header'
import Footer from '../../component/footer'
import Search from '../../assets/search.png'
import Contact from '../../component/Contact'
import useApi from "../../helpers/useApi";
import NavbarSide from "../../component/navbarside";

function Transfer () {
    const api = useApi()
    const [user,setUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [searchQuery, setSearchQuery] = useState([])

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };

    const getUser = async () => {
        try {
            const {data} = await api.get(`/user/all?limit=5&page=${currentPage}&search=${searchQuery}`)
            console.log(data)
            setUser(data.data)
            setTotalPages(Math.ceil(data.meta.total / 5))
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
        getUser()
    },[currentPage,searchQuery])
    return(
        <>
        <Header />
        <main className="w-full bg-gray-100">
        <div className="flex flex-row w-4/5 mx-auto bg-gray-100 gap-x-10 pt-10">
            
            <div className="w-1/3">
            <NavbarSide />
            </div>
            
            <div className="flex flex-col w-full bg-white rounded-lg px-5 py-10">
                <h1 className="font-bold text-xl mb-5">Search Receiver</h1>
                <div className="border border-gray-100 flex flex-row rounded-lg bg-gray-100">
                <img src={Search} alt="" className="object-contain ml-3 " />
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search Receiver Here" className="input border-none w-full bg-gray-100 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-y-5 mt-10">
                { user ? ( 
                    user.map((v)=>{
                        return <Contact image={v.photo_profile} first_name={v.first_name} last_name={v.last_name} phone={v.phone_number} username={v.username}  />
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

export default Transfer