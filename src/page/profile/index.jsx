import React, { useRef, useState } from "react";
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
import { useApiMulti } from "../../helpers/useApi";


function Profile() {
    const { data } = useSelector((s)=>s.users)
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const formData = new FormData()
    const api = useApiMulti()
    const navigate = useNavigate()

    const inputRef = useRef(null)

    const onImageClick = () => {
        inputRef.current.click()
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        setImage(file)
    }

    const handleSubmitImage = async () => {
        formData.append('image', image)
        const fileData = await api({
            url: `/user`,
            method: "PATCH",
            data: formData
        })
    }

    return (
        <>
            <div className="bg-gray-100">
                <div className="hidden md:block"><Header /></div>
                <div className="flex gap-8 w-[100%] mx-auto max-w-7xl my-14">
                <NavbarSide />
                    <div className="w-full bg-white md:rounded-3xl shadow-lg">
                        <div className="block md:hidden pl-16 "><Link to='/home'><FontAwesomeIcon icon={faArrowLeft} className="text-gray-500" size="xl" /></Link></div>
                        <div className="flex flex-col justify-center items-center py-12 md:py-24">
                            <div className="flex flex-col justify-center items-center">
                                <div className="flex flex-col justify-center items-center">
                                    <img onClick={onImageClick} src={ image ? URL.createObjectURL(image) : (data.photo_profile == null ? profile : data.photo_profile) } className="w-20 md:w-28 cursor-pointer" alt="profile_picture" />
                                    <span className="flex items-center gap-4 mt-3">
                                        <input type="file" onChange={handleImageChange} ref={inputRef} style={{ display: "none" }} />
                                    </span>
                                </div>
                                <div></div>
                                <div onClick={handleSubmitImage} className="flex items-center gap-6">
                                    <FontAwesomeIcon icon={faPenToSquare} className="text-gray-500  cursor-pointer" />
                                    <h4 className="text-nd md:text-xl font-medium text-gray-500  cursor-pointer">Edit</h4>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block"><Footer /></div>
            </div>
        </>
    )
}

export default Profile