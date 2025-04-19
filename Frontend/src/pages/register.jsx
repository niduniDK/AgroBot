import React, { useState } from "react";
import { motion } from "framer-motion";
import bg2 from "../assets/AgroBot-bg-2.jpg";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/app-icon.png";

function Register(){

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = () => {
        fetch('http://127.0.0.1:8000/user/register',{
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        })
        .then (response => {
            if (!response.ok){
                throw new Error("Network response was not ok" + response.statusText);
            }
            response.json();
        })
        .then(data => {
            console.log("User added: ", data);
            navigate('/home')
            setEmail("");
            setUsername("");
            setPassword("");
        })
        .catch(error => {
            navigate('/register');
            console.error("There was a problem with adding user: ", error);
            setEmail("");
            setUsername("");
            setPassword("");
        });
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
        >
            <div className="fixed top-0 left-0 flex flex-col bg-slate-300 bg-opacity-70 rounded-lg shadow-lg p-5 w-1/3 h-auto ml-12 mt-20">
                <Link to={"/login"} className="flex flex-row items-center justify-center mx-10 mb-0 p-5 pb-0">
                    <img src={icon} alt="" className="w-12 h-auto m-5 mt-0"/>
                    <h1 className="text-green-800 text-4xl m-2 ml-0 mb-5 mt-0"><strong>AgroBot</strong></h1>
                </Link>
                <h1 className="text-4xl text-green-950 text-center"><strong>Register</strong></h1>

                <div className="flex flex-col items-center justify-center mt-2 mx-5">
                    <label htmlFor="email" className="text-lg text-black mt-2 font-bold">Email</label>
                    <input type="text" id="email" placeholder="Enter your email" required className="text-black mt-2 p-2 w-full bg-slate-50 border-slate-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

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
                    onClick={handleRegister}
                    >Signup</button>
                    <p className="text-lg text-green-800 m-2 p-2 font-semibold">Already have an account? <Link to={"/login"} className="text-blue-500 hover:underline"><strong>Login</strong></Link></p>
                </div>
            </div>
        </motion.div>
    )
}

export default Register;