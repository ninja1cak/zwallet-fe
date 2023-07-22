import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Default_photo from '../assets/default_photo.png'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import convert from 'rupiah-format'

function Header() {
    const {data, transactionLog} = useSelector((s) => s.users)

    return(
        <>
            <div className="shadow-lg hidden md:block rounded-b-3xl bg-white">
                <div className="flex justify-between px-4 py-16 w-[100%] max-w-7xl mx-auto">
                    <h1 className="text-4xl font-medium text-primary">Zwallet</h1>
                    <div className="dropdown dropdown-hover relative">
                        <div className="flex items-center gap-4">
                            <div>
                                <img src={data.photo_profile ? data.photo_profile : Default_photo} alt="profile_picture" className="w-10 h-10" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium">{data.first_name + ' ' + data.last_name}</h2>
                                <span className="text-gray-500">{data.phone_number ? data.phone_number : 'set phone number'}</span>
                            </div>
                            <div className="pl-3">
                                <FontAwesomeIcon icon={faBell} color="gray" size="xl" />
                            </div>
                        </div>
                        <ul className=" absolute left-[-100px] dropdown-content z-[1] menu p-6 shadow bg-base-100 rounded-box w-72 ">
                            <p className=" text-gray-500 mb-2">This Week</p>
                            {
                                transactionLog ? transactionLog.map((e) =>{
                                    return (
                                        <>
                                            <div className=" flex items-start gap-x-2 bg-white shadow-md mb-4 p-4">
                                                <FontAwesomeIcon icon={faArrowUp} style={{color:'red'}} className="h-4 mt-1" />
                                                <div>
                                                    <p className=" text-gray-500  text-xs">Tranferred to {e.first_name + ' ' + e.last_name}</p>
                                                    <p className=" font-semibold">{convert.convert(e.amount)}</p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }) : ''
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header