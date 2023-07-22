import React from 'react'
import Default_photo from '../assets/default_photo.png'

function Card({name, amount, date, mb, header}) {
  return (
    <>
    {
      date ? <p className=' text-gray-500 font-medium px-3 mb-4 md:px-0'>Transfer Date: {date}</p> : ''
    }
    <div className=' flex gap-x-4 bg-white rounded-lg p-3 md:py-3 md:px-0' style={{margin: `0 0 ${mb} 0`}}>
        {
          header == true ? '' : <img src={Default_photo} alt="" className=' object-contain w-16' />
        }
        <div className=' flex justify-between items-center w-full'>
            <div>
                <p className=' font-medium text-base '>{name}</p>
                <p className=' font-light text-base '>Transfer</p>
            </div>
            {
              amount.includes('+') ?  <p className=' text-green-500  font-semibold text-base'>{amount}</p> :   <p className=' text-red-500 font font-semibold text-base'>{amount}</p>
            }
        </div>
    </div>
    </>

  )
}

export default Card