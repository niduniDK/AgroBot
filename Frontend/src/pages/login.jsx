import React, { useState } from "react";
import { motion } from "framer-motion";
import bg2 from '../assets/Agrobot-bg-2.jpg'; // Make sure this file exists and the path is correct
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/app-icon.png";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch(`http://127.0.0.1:8000/user/login/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok){
                throw new Error("Network response was not ok" + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (username === data.username && password === data.password){
                console.log("Login successful: ", data);
                navigate('/home')
                setUsername("");
                setPassword("");
            }
            else{
                console.log("Login failed: ", data);
                navigate('/login')
                setUsername("");
                setPassword("");
            }
        })
        .catch(error => {
            console.error("There was a problem with login: ", error);
            navigate('/login')
            setUsername("");
            setPassword("");
        })
    }

    return(
        <motion.div
        style={{
            backgroundImage: `url(${bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100vw",
        }}

        className="flex flex-row"
        >
            <div className="fixed top-0 left-0 flex flex-col bg-slate-300 bg-opacity-70 rounded-lg shadow-lg p-5 w-1/3 h-auto ml-12 mt-20">
                <Link to={"/login"} className="flex flex-row items-center justify-center mx-10 mb-0 p-5 pb-0">
                    <img src={icon} alt="" className="w-12 h-auto m-5 mt-0"/>
                    <h1 className="text-green-800 text-4xl m-2 ml-0 mb-5 mt-0"><strong>AgroBot</strong></h1>
                </Link>
                <h1 className="text-4xl text-green-950 text-center"><strong>Login</strong></h1>
                <div className="flex flex-col items-center justify-center mt-2 mx-5">
                    <label htmlFor="username" className="text-lg text-black mt-2 font-bold">Username</label>
                    <input type="text" id="username" placeholder="Enter your username" required className="text-black mt-2 p-2 w-full bg-slate-50 border-slate-800"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="flex flex-col items-center justify-center mt-2 mx-5">
                    <label htmlFor="password" className="text-lg text-black mt-2 font-bold">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required className="text-black mt-2 mb-3 p-2 w-full bg-slate-50 border-slate-800"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-center justify-center m-2 mx-5">
                    <button className="bg-green-600 text-white p-2 rounded-md w-full hover:bg-green-700 transition duration-300"
                    onClick={handleLogin}
                    >Login</button>
                    <p className="text-lg text-green-800 m-2 p-2 font-semibold">Don't have an account? <Link to={"/register"} className="text-blue-500 hover:underline"><strong>Register</strong></Link></p>
                </div>
            </div>

            <div className="fixed top-0 right-0 bg-slate-600 bg-opacity-90 rounded-lg shadow-lg p-5 w-1/3 h-auto mr-12 mt-20 transition duration-300 animate-pulse">
                <p className="text-lg text-white font-semibold p-10">AgroBot is an AI-powered platform revolutionizing modern agriculture through intelligent crop disease detection and management. Leveraging advanced image processing and machine learning algorithms, AgroBot empowers farmers and agronomists to instantly identify plant diseases by simply capturing images of affected crops. Beyond detection, the platform offers a rich, curated knowledge base detailing symptoms, causes, and treatment recommendations for a wide range of crop diseases — helping users make informed decisions to protect and optimize their harvests.
                </p>
            </div>
        </motion.div>
    )
}

export default Login;