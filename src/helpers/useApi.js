import {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function useApi (url='') {
    const {token} = useSelector((s) => s.users)

    const [request, setRequest] = useState({
        baseURL: 'https://zwallet-be.vercel.app' || url,
        headers: {
            'Content-Type':  'application/json' ,
            Authorization: `Bearer ${token}`
        }
    })

    useEffect(() => {
        setRequest({
            ...request,
            headers: {
                'Content-Type':  'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    },[])

    return axios.create(request)
}

function useApiMulti (url='') {
    const {token} = useSelector((s) => s.users)
    const [request, setRequest] = useState({
        baseURL: 'https://zwallet-be.vercel.app' || url,
        headers: {
            'Content-Type':  'multipart/form-data' ,
            Authorization: `Bearer ${token}`
        }
    })

    useEffect(() => {
        setRequest({
            ...request,
            headers: {
                'Content-Type':  'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })
    },[])

    return axios.create(request)
}
export {useApiMulti} 
export default useApi
 