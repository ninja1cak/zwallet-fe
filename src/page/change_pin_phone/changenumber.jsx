import React, {useState, useEffect} from 'react'
import NavbarSide from '../../component/navbarside'
import Header from '../../component/header'
import Footer from '../../component/footer'
import { useNavigate } from 'react-router-dom'
import useApi from '../../helpers/useApi'
import { useSelector } from 'react-redux'

function ChangeNumber() {
    const[user, setUser] = useState([]) 
    const [form, setForm] = useState([]) 
    const [btnState, setBtnState] = useState(true)
    const api = useApi()
    const navigate = useNavigate()
    const {isAuth} = useSelector((s) => s.users)
    const getUser = async() =>{

        const { data } = await api.get('/user')
        setUser(data.data[0])
    }

    const inputChange = (e) =>{
        const data = {...form}
        data[e.target.name] = `+62${e.target.value}`
        setForm(data)
    }

    const updatePhone = async () =>{
        await api({
            method: 'PATCH',
            url: '/user/update',
            data: form
        })
        .then(({data}) => {
            console.log('Nomor handphone berhasil di update', data)

            setTimeout(()=>{
                navigate('/home')
            })
        },3000)
        .catch((er)=>{
            console.log(er)
        })
    }
    
    useEffect(() =>{
        if(!isAuth){
          navigate('/')
        }else{
            getUser()
        }
  }, [])

    useEffect(()=>{
        console.log(form.phone_number)
        if(form.length === 0 || form.phone_number === '+62'){
            console.log('tes')
            setBtnState(true)
        }else{
            setBtnState(false)
        }
    },[form])

    console.log(user)
  return (
    <div>
          <div className="bg-gray-100">
            <Header />
            <div className="flex gap-4 w-[100%] mx-auto max-w-7xl ">
                <NavbarSide />
                <div className="w-full md:w-full bg-gray-100 md:bg-white md:rounded-3xl my-4 h-[800px] md:h-[700px]">
                    <div className="flex flex-col py-12 md:py-10 px-8 md:h-[700px] justify-between h-[800px]">
                        <div>
                        <div className="flex items-center md:hidden gap-x-5 top-4 absolute ">
                            <svg onClick={() => {navigate('/personal_info')}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                            </svg>
                            <h1 className="text-xl font-medium">Add Phone Number</h1>
                        </div>
                        <div className="md:w-full lg:w-1/2">
                            <h1 className="hidden md:block text-2xl font-medium mb-12">Add Phone Number</h1>
                            <span 
                            className=" md:text-lg text-gray-400 leading-loose">
                            Add at least one phone number for the transfer ID so you can start transfering your money to another user.
                            </span>
                        </div>


                        <div className="flex flex-row w-full justify-center xs:mx-2  md:mx-5 mx-auto px-0 md:px-0 mt-20">
                            <div className='w-full xs:mx-10 xs:ms-5 md:mx-20 md:ms-10'>
                                <div className='flex flex-row gap-x-3  items-center '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    <label className='font-bold'>+62</label>
                                    <input 
                                    type='number'
                                    name='phone_number'
                                    className='w-full bg-gray-100 md:bg-white rounded-md p-2 items-center'
                                    placeholder={user.phone_number}
                                    onChange={inputChange}/>
                                </div>
                                <hr className='w-full bg-gray-500 h-0.5'/>
                            </div>
                        </div>
                        </div>                    
                        <button className="w-full btn " onClick={updatePhone} disabled={btnState}>    
                            Add Phone Number
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
  )
}

export default ChangeNumber
