import React from 'react'
import { FadeLoader } from "react-spinners";


function Loading({color}) {
  return (
    <FadeLoader 
    color={ color ? color : '#6379F4'}
    width={4}
    radius={10}
  /> 
  )
}

export default Loading