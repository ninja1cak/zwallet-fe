import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from '@fortawesome/free-solid-svg-icons'
import profile from '../assets/profile.png'
import { Link } from "react-router-dom";


function Header({name, phone_number}) {
    return(
        <>
            <div className="shadow-lg rounded-b-3xl bg-white">
                <div className="flex justify-between px-4 py-16 w-[100%] max-w-7xl mx-auto">
                    <h1 className="text-4xl font-medium text-primary">Zwallet</h1>
                    <div className="dropdown dropdown-hover">
                        <div className="flex items-center gap-4">
                            <div>
                                <img src={profile} alt="profile_picture" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium">{name}</h2>
                                <span className="text-gray-500">{phone_number ? phone_number : 'set phone number'}</span>
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
        </>
    )
}

export default Header