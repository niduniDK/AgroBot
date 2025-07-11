import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import bot from "../assets/bot.png";
import send from "../assets/send.png";
import attach from "../assets/attach.png";
import { useNavigate } from "react-router-dom";

function Assistant() {

    const welcomeMsg = "Hi! I am your virtual assistant. How can I help you today?";
    const [typedMsg, setTypedMsg] = useState("");
    const [hasTyped, setHasTyped] = useState(false);
    const [fromVA, setFromVA] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState("Hello");
    const navigate = useNavigate();

    const [displayText, setDisplayText] = useState("");

    const getPrediction = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        for (const [key, value] of formData.entries()) {
            console.log(key, value); // Debug: confirm data being sent
        }

        try {
            const response = await fetch("http://localhost:8000/diseases/predict_disease", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.prediction) {
                setPrediction(data.prediction);
                alert(`Prediction: ${data.prediction}`);

                navigate('/chat', {
                    state: {
                        userMsg: "",
                        botMsg: data.prediction,
                    },
                });
            } else {
                alert("No prediction received. Please try again.");
            }
        } catch (error) {
            console.error("Error getting prediction:", error);
            alert("Prediction failed. Check console for details.");
        } finally {
            setSelectedFile(null);
        }
    };

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayText((prevText) => prevText + welcomeMsg[index]);
            index++;
            if (index === welcomeMsg.length-1){
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    },[]);

    return (
    <div>
        <Navbar/>
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-950 to-blue-950">
            <img src={bot} alt="" className="flex w-32 h-auto m-5 mt-20 pt-3 cursor-pointer hover:bg-green-200 hover:p-2 hover:rounded-md transition duration-300 animate-spin"
            onClick={() => {
                navigate('/chat');
            }}
            />
            <div className="flex flex-row items-center justify-center w-full h-auto m-2 ml-0 my-5">
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setSelectedFile(file);
                            getPrediction();
                        }
                    }}
                />
                <label htmlFor="file-upload">
                    <img
                        src={attach}
                        alt=""
                        className="w-10 h-auto cursor-pointer"
                    />
                </label>
                
                <input
                    type="text"
                    id='msg'
                    className="bg-green-50 text-black border-green-950 border-2 p-3 rounded-full w-2/3 m-5"
                    required
                    value={typedMsg}
                    onChange={(e) => {
                        setTypedMsg(e.target.value);
                        setHasTyped(true);
                        setFromVA(false);
                    }}
                />
                <img
                    src={send}
                    alt=""
                    className="w-10 h-auto cursor-pointer"
                    onClick={() => {
                        if (selectedFile) {
                            getPrediction();
                        } else if (hasTyped) {
                            navigate('/chat', { state: { userMsg: typedMsg, fromVA: true } });
                        } else {
                            alert("Please type a message or attach a file before sending.");
                        }
                    }}
                />
            </div>
            <div className="text-3xl text-green-100 text-center">
                <p className="text-5xl text-green-100 text-center font-bold lg:mx-96">{displayText}</p>
            </div>
            <div>
                
            </div>
        </div>
        <Footer/>
    </div>
    
    );

}

export default Assistant;