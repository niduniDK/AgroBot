import React from "react";
import icon from "../assets/app-icon.png";
import login from '../assets/login-icon.png';
import bot from '../assets/bot.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

function Navbar(){

    const navigate = useNavigate();
    const location = useLocation();
    const isVirtualAssistant = location.pathname === '/virtual_assistant';
//     const handleTranslate = () => {
//         fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=si&dt=t&q=Hello',{
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         }).catch(error => {
//             console.error("Error during translation: ", error);
//         }
// )
//     }

    const {t, i18n} = useTranslation();

    const handleTranslate = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    }

    return(
        <div className={`flex flex-row min-w-full w-full bg-white ${isVirtualAssistant?"fixed top-0 left-0 h-auto" : "h-auto"} `}>
            <Link to={"/home"} className="flex flex-row items-center justify-center">
                <img src={icon} alt="" className="w-12 h-auto m-5 ml-28"/>
                <h1 className="text-green-600 text-4xl m-2 ml-0 my-5"><strong>AgroBot</strong></h1>
            </Link>

            <div className="flex flex-row items-center justify-center w-full h-auto m-2 ml-0 my-5">
                {/* <button className="bg-green-600 text-white p-3 rounded-lg m-2 ml-20 hover:bg-green-700 transition duration-300" 
                onClick={handleTranslate}>Translate to Sinhala</button> */}
                <select className="bg-green-50 text-black border-green-950 border-2 p-3 rounded-full w-1/3 m-5 ml-20" 
                onChange={handleTranslate}
                >
                    <option value="en">English</option>
                    <option value="si">සිංහල</option>
                    <option value="ta">தமிழ்</option>
                </select>
                <img src={bot} alt="" className="absolute top-3 right-3 w-12 h-auto m-5 mr-14 cursor-pointer hover:bg-green-200 hover:p-2 hover:rounded-md transition duration-300 animate-bounce"
                onClick={() => {
                    navigate('/chat');
                }}
                />
                <img src={login} alt="" className="absolute top-1 right-1 p-3 m-1 mr-32 w-20 h-auto hover:cursor-pointer"
                onClick={() => {
                    navigate('/login');
                }}
                />
            </div>
        </div>
    )
}

export default Navbar;