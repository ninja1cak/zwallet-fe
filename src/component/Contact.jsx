import React from "react";
import { useNavigate } from "react-router-dom";

function Contact ({image,first_name,last_name,phone,username}) {
    const navigate=useNavigate()
    return (
        <>
        <div className="h-20  bg-white flex flex-row btn justify-start gap-x-5" onClick={()=> navigate(`/transfer/${username}`)}>
           <span className="flex items-start"> <img src={image} className="object-contain max-h-7 flex items-start" /></span>
            <span className="flex flex-col justify-start items-start">
                <h1>{first_name}    {last_name}</h1>
                <p className="mt-2">{phone}</p>
            </span>
        </div>
        </> 
    )
}

export default Contact