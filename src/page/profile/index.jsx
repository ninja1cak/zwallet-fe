import React, { useEffect, useRef, useState } from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import profile from "../../assets/default_photo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import NavbarSide from "../../component/navbarside";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Show } from "../../helpers/toast";
import { logout } from "../../store/reducer/user";
import { useNavigate } from "react-router-dom";
import useApi, { useApiMulti } from "../../helpers/useApi";
import withAuth from "../../helpers/withAuth";



function Profile() {
    const { data, isAuth } = useSelector((s)=>s.users)
    const [image, setImage] = useState('')
    const [state, setState] = useState(true)
    const dispatch = useDispatch()
    const formData = new FormData()
    const api = useApiMulti()
    const apiDel = useApi()
    const navigate = useNavigate()

    const inputRef = useRef(null)

    const onImageClick = () => {
        inputRef.current.click()
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        setImage(file)
        setState(false)
    }

    const handleSubmitImage = async () => {
        formData.append('image', image)
        const {data} = await api({
            url: `/user`,
            method: "PATCH",
            data: formData
        })
        if(data.status == 200){
            navigate('/home')
        }
    }

    const handleClickDelete = async () =>{
        try {
            const {data} = await apiDel.delete('/user')
            dispatch(logout())
            navigate('/')
        } catch (error) {
            
        }
    }
    useEffect(() =>{
        // if(!isAuth){
        //     navigate('/')
        //   }
    },[])
    useEffect(() =>{
        console.log(state)
    }, [state])

    return (
        <>
            <div className="md:bg-gray-100">
                <Header />
                <div className="flex gap-8 w-[100%] mx-auto max-w-7xl ">
                <NavbarSide />
                    <div className="w-full bg-gray-100 md:bg-white md:rounded-3xl my-5">
                        <div className="block md:hidden pl-16 "><Link to='/home'><FontAwesomeIcon icon={faArrowLeft} className="text-gray-500" size="xl" /></Link></div>
                        <div className="flex flex-col justify-center items-center py-12 md:py-24">
                            <div className="flex flex-col justify-center items-center">
                                <div className="flex flex-col justify-center items-center relative group">
                                    <btn onClick={onImageClick} className=" hover:bg-primary hover:text-white group-hover:flex hidden  rounded-lg btn absolute border-none">Change <br /> Image</btn>

                                    <img onClick={onImageClick} src={ image ? URL.createObjectURL(image) : (data.photo_profile == null ? profile : data.photo_profile) } className="w-20 md:w-28 cursor-pointer" alt="profile_picture" />
                                    <span className="flex items-center gap-4 mt-3">
                                        <input type="file" onChange={handleImageChange} ref={inputRef} style={{ display: "none" }} />
                                    </span>
                                </div>
                                <div></div>
                                <button disabled={ state } onClick={handleSubmitImage} className="flex items-center gap-6 enabled:hover:opacity-50 cursor-default enabled:hover:cursor-pointer">
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-gray-500  " />
                                    <h4 className="text-nd md:text-xl font-medium text-gray-500  ">Edit</h4>
                                </button>
                                <div className="text-center">
                                    <h1 className="text-2xl md:text-3xl font-medium mb-3 mt-8 ">{ data.first_name == null ? 'Name not set' : data.first_name + ' ' + data.last_name }</h1>
                                    <h3 className="text-md md:text-xl text-gray-500 mb-12 md:mb-16">{ data.phone_number == null ? 'Phone number not set' : data.phone_number }</h3>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center w-full px-10 md:px-0">
                                <button className="btn btn-active text-xl w-full md:w-3/5 h-20 capitalize px-6 mb-6">
                                    <Link to="/personal_info" className="w-full ">
                                        <div className="flex justify-between items-center">
                                            <span>Personal Information</span>
                                            <FontAwesomeIcon icon={faArrowRight} className="text-gray-500" />
                                        </div>
                                    </Link>
                                </button>
                                <button className="btn btn-active text-xl w-full md:w-3/5 h-20 capitalize flex justify-between px-6 mb-6">
                                    <Link to="/change-password" className="w-full">
                                        <div className="flex justify-between items-center">
                                            <span>Change Password</span>
                                            <FontAwesomeIcon icon={faArrowRight} className="text-gray-500" />
                                        </div>
                                    </Link>
                                </button>
                                <button className="btn btn-active text-xl w-full md:w-3/5 h-20 capitalize flex justify-between px-6 mb-6">
                                    <Link to="/change-pin" className="w-full">
                                        <div className="flex justify-between items-center">
                                            <span>Change PIN</span>
                                            <FontAwesomeIcon icon={faArrowRight} className="text-gray-500" />
                                        </div>
                                    </Link>
                                </button>
                                <button className="btn btn-active block md:hidden text-xl w-full md:w-3/5 h-20 capitalize flex justify-between px-6 mb-6">
                                    <span>Notification</span>
                                    <input type="checkbox" className="toggle toggle-primary" checked />
                                </button>
                                <button className="btn btn-active text-xl w-full md:w-3/5 h-20 capitalize flex justify-between px-6" onClick={() => {
                                        dispatch(logout())
                                        navigate('/')
                                }}>
                                    <span>Logout</span>
                                    <div></div>
                                </button>
                                <button onClick={handleClickDelete} className="btn btn-active bg-red-500 text-white text-xl w-full md:w-3/5 h-20 capitalize flex justify-between px-6 mt-6">
                                        <div className="flex justify-between items-center">
                                            <span className=" text-white">DELETE ACCOUNT</span>
                                        </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default withAuth(Profile) 