import React from "react";
import icon from "../assets/app-icon.png";
import login from '../assets/login-icon.png';
import bot from '../assets/bot.png';
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="flex flex-row min-w-full w-full bg-white h-auto">
            <Link to={"/home"} className="flex flex-row items-center justify-center">
                <img src={icon} alt="" className="w-12 h-auto m-5 ml-28"/>
                <h1 className="text-green-600 text-4xl m-2 ml-0 my-5"><strong>AgroBot</strong></h1>
            </Link>

            <div className="flex flex-row items-center justify-center w-full h-auto m-2 ml-0 my-5">
                <img src={bot} alt="" className="absolute top-3 right-3 w-12 h-auto m-5 mr-14 cursor-pointer hover:bg-green-200 hover:p-2 hover:rounded-md transition duration-300 animate-bounce"/>
                <img src={login} alt="" className="absolute top-1 right-1 p-3 m-1 mr-32 w-20 h-auto hover:cursor-pointer"/>
            </div>
        </div>
    )
}

export default Navbar;