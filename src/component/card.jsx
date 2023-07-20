import React from 'react'
import Default_photo from '../assets/default_photo.png'

function Card({name, amount}) {
  return (
    <div className=' flex gap-x-4 mb-8'>
        <img src={Default_photo} alt="" className=' object-contain w-16' />
        <div className=' flex justify-between items-center w-full'>
            <div>
                <p className=' font-medium'>{name}</p>
                <p className=' font-light'>Transfer</p>
            </div>
            <p>{amount}</p>
        </div>
    </div>
  )
}

export default Card