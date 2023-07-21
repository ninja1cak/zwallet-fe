import React from 'react'
import Default_photo from '../assets/default_photo.png'

function Card({name, amount, date}) {
  return (
    <>
    {
      date ? <p>Transfer Date: {date}</p> : ''
    }
    <div className=' flex gap-x-4 mb-8'>
        <img src={Default_photo} alt="" className=' object-contain w-16' />
        <div className=' flex justify-between items-center w-full'>
            <div>
                <p className=' font-medium'>{name}</p>
                <p className=' font-light'>Transfer</p>
            </div>
            {
              amount.includes('+') ?  <p className=' text-green-500 font font-semibold'>{amount}</p> :   <p className=' text-red-500 font font-semibold'>{amount}</p>
            }
        </div>
    </div>
    </>

  )
}

export default Card