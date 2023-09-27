import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'

function withAuth(OriginalComponent) {
  return (props) =>{
    const {isAuth} = useSelector((s) => s.users)

    if(!isAuth) return <Navigate to = '/login'/>
    return <OriginalComponent {...props}/>
  }
}

export default withAuth