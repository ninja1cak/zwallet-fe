import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/Zwallet.png'
import hero from '../../assets/Group 49.png'
import store from '../../assets/Group 50.png'
import company from '../../assets/Group 51.png'
import about1 from '../../assets/Group 10.png'
import about2 from '../../assets/Group 11.png'
import about3 from '../../assets/Group 12.png'
import profile from '../../assets/1.png'
import arrowleft from '../../assets/arrowleft.png'
import arrowright from '../../assets/arrowright.png'
import { useSelector } from "react-redux";

function Home() {
    const {isAuth} = useSelector((s) => s.users)
    const navigate = useNavigate()
    useEffect(() =>{
        if(isAuth)(
            navigate('/home')
        )
    },[])
    return (
        <>
        <navbar className="flex flex-row items-center justify-between px-20 pt-16 bg-slate-50">
            <img src={logo} alt="" />
            <div className="dropdown dropdown-bottom  lg:hidden">
            <label tabindex="0" className="btn m-1 bg-primary text-white">Menu</label>
            <ul tabindex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Login</a></li>
                <li><a>Sign Up</a></li>
            </ul>
            </div>
            <div className=" flex-row gap-x-7 items-center hidden lg:flex">
                <Link to="/login" className="block px-9 py-3 bg-white border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white" >Login</Link>
                <Link to="/register" className="block px-9 py-3 bg-primary border border-primary text-white font-bold rounded-lg hover:bg-white hover:text-primary" >Sign Up</Link>
            </div>
        </navbar>

        <main className="flex lg:flex-row w-full pt-10 bg-slate-50 flex-col">
            <div className="lg:w-1/2 flex justify-center w-full">
            <img src={hero} alt="" className="object-contain" />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center w-full items-center lg:items-start">
                <h1 className="text-6xl font-bold text-black">
                    Awesome App
                </h1>
                <h1 className="text-6xl font-bold text-black mt-5">
                    For Saving <span className="text-primary">Time.</span>
                </h1>
                <p className="mt-10">
                    We bring you a mobile app for banking problems that
                </p>
                <p>
                    oftenly wasting much of your times
                </p>
                <div className="w-max mt-10">
                    <a href="/" className="rounded-lg px-9 py-3 bg-primary text-white ">Try It Free</a>
                </div>
                <div className="mt-10">                 
                <img src={store} alt="" />
                </div>
            </div>
        </main>

        <main className="w-full bg-gray-200 flex justify-center py-16">
            <img src={company} alt="" />
        </main>

        <div className="flex flex-col w-full justify-center items-center pt-24 bg-slate-50 pb-24">
            <h1 className="text-6xl font-bold">
                <span className="text-primary">About</span> the Application.</h1>
                <p className="mt-8 mb-2">We have some greate features from the application and it's totally free</p>
                <p>to use by all users around the world.</p>
                <div className="flex flex-col lg:flex-row w-full items-center justify-center mt-14 gap-x-5">
                    <div className="flex flex-col items-center lg:w-1/4 w-full rounded-lg px-10 pt-10 pb-10">
                    <img src={about1} alt="" className="object-contain" />
                    <h2 className="font-bold mt-8">24/7 Support</h2>
                    <p className="mt-8 text-center leading-8">We have 24/7 contact support so you can <br></br> contact us whenever you want <br></br> and we will respond it</p>
                    </div>
                    <div className="flex flex-col items-center lg:w-1/4 w-full bg-white  rounded-lg px-10 pt-10 pb-10">
                    <img src={about2} alt="" className=""/>
                    <h2 className="font-bold mt-8">Data Privacy</h2>
                    <p className="mt-8 text-center leading-8">We make sure your data is safe in our <br></br> database and we will encrypt any <br></br> data you submitted to us.</p>
                    </div>
                    <div className="flex flex-col items-center lg:w-1/4 w-full rounded-lg px-10 pt-10 pb-10">
                    <img src={about3} alt="" className="object-contain ml-0"/>
                    <h2 className="font-bold mt-8">Easy Download</h2>
                    <p className="mt-8 text-center leading-8">Zwallet is 100% totally free to use it’s <br></br> now available on Google Play Store <br></br> and App Store.</p>
                    </div>
                </div>
        </div>

        <div className="w-full bg-gray-100 flex flex-col lg:flex-row pt-20 pb-20">
            <div className="flex justify-center items-center lg:w-1/2 lg:items-start">
                <img src={hero} alt="" />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center w-full items-center lg:items-start">
                <h1 className="font-bold text-4xl">All The <span className="text-primary">Great</span></h1>
                <h1 className="font-bold text-4xl mt-5">Zwallet Features.</h1>
                <div className="bg-white rounded-lg w-3/4 py-5 px-5 mt-10">
                    <h3 className="font-bold"><span className="text-primary">1.</span>Small Fee</h3>
                    <p className="mt-5">We only charge 5% of every success transaction done in Zwallet app.</p>
                </div>
                <div className="bg-white rounded-lg w-3/4 py-5 px-5 mt-10">
                    <h3 className="font-bold"><span className="text-primary">2.</span>Data Secured</h3>
                    <p className="mt-5">All your data is secured properly in our system and it's encrypted.</p>
                </div>
                <div className="bg-white rounded-lg w-3/4 py-5 px-5 mt-10">
                    <h3 className="font-bold"><span className="text-primary">3.</span>User Friendly</h3>
                    <p className="mt-5">Zwallet come up with modern and sleek design and not complicated.</p>
                </div>
            </div>

        </div>

        <div className="bg-slate-50 pt-28 pb-28 flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold">What Users are <span className="text-primary">Saying.</span></h1>
            <p className="text-center mt-16 mb-20">We have some great features from the application and it's totally free<br></br>
            to use by all users around the world.</p>

            <div className="flex flex-row justify-center items-center gap-x-10">
                <div className=" bg-white btn ">
                <img src={arrowleft} alt="" />
                </div>
                <div className="bg-white rounded-lg flex flex-col justify-center items-center w-3/4 px-10">
                    <img className="mt-16" src={profile} alt="" />
                    <h1 className="text-xl font-bold mt-5">Alex Hansinburg</h1>
                    <p className="mt-5">Designer</p>
                    <p className="text-center mt-10">
                    “This is the most outstanding app that I’ve ever try in my live,
                     this app is such an amazing masterpiece and it’s suitable for you 
                     who is bussy with their bussiness and must transfer money to another 
                     person aut there. Just try this app and see the power!”
                    </p>
                </div>
                <div className=" bg-white btn ">
                <img src={arrowright} alt="" />
                </div>

            </div>
        </div>

        <footer className="bg-primary pt-20">
        <div className="flex flex-col mx-20">
            <h1 className="text-4xl font-bold text-white">Zwallet</h1>
            <p className="text-white leading-8 mt-10 mb-16 text-sm">Simplify financial needs and saving <br></br>
            much time in banking needs with <br></br> 
            one single app.</p>

        <hr></hr>
        <div className="flex flex-row justify-between mt-5">
            <p className="text-white">2020 Zwallet. All right reserved.</p>
            <div className="flex flex-row gap-x-10">
                <p className="text-white">+62 5637 8882 9901</p>
                <p className="text-white">contact@zwallet.com</p>
            </div>
        </div>
        </div>
        </footer>
        </>
    )
}

export default Home