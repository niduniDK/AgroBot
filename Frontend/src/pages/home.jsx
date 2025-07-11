import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import bg1 from '../assets/AgroBot-bg-1.jpg';
import bg2 from '../assets/Agrobot-bg-2.jpg';
import bg3 from '../assets/Agrobot-bg-3.jpg';
import attach from '../assets/attach.png';
import {easeOut, motion, AnimatePresence, animate, useInView} from 'framer-motion';
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

function Home() {

    const itemVarient = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: easeOut }, y: 0 }
    }

    const sliderVarient = {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut}},
        exit: { opacity:0, x: -100, transition: { duration: 0.6, ease: easeOut}}
    }
    
    const ref = useRef(null);
    const section = document.getElementById('common-diseases')
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState("Hello");
    const isInView = useInView(ref, {once: false});
    const navigate = useNavigate();

    const [diseases, setDiseases] = useState([]);
    const [currentDisease, setCurrentDisease] = useState([]);

    const visibleDiseases = [
        diseases[currentDisease],
        diseases[(currentDisease + 1) % diseases.length],
        diseases[(currentDisease + 2) % diseases.length]
    ]

    const scrollInto = () => {
        section.scrollIntoView({ behavior: 'smooth' });
    }

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
        const interval = setInterval(() => {
            setCurrentDisease((prev) => (prev+3) % diseases.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [diseases]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/diseases/disease_list', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setDiseases(data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }, []);

    return (
        <div>
            <Navbar/>
            <motion.div
            style={{
                backgroundImage: `url(${bg1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '90vh',
                width: '100vw',
            }}
            >
                <motion.div className="flex flex-col items-center justify-center h-full w-full bg-slate-700 bg-opacity-65" 
                ref={ref}
                initial={{opacity:0, y: 30}}
                animate={isInView?{opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}:{opacity:0, y: 30}}
            
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
                >
                    <motion.h1 variants={itemVarient} className="text-6xl text-center pt-10 py-20"><strong>Welcome to AgroBot!</strong></motion.h1>
                    <motion.p className="text-center text-lg mx-5 px-10">AgroBot is an AI-powered platform revolutionizing modern agriculture through intelligent crop disease detection and management. Leveraging advanced image processing and machine learning algorithms, AgroBot empowers farmers and agronomists to instantly identify plant diseases by simply capturing images of affected crops. Beyond detection, the platform offers a rich, curated knowledge base detailing symptoms, causes, and treatment recommendations for a wide range of crop diseases — helping users make informed decisions to protect and optimize their harvests.</motion.p>
                    <motion.h1 variants={itemVarient} className="text-5xl text-center m-5 pt-20"><strong>Our Mission</strong></motion.h1>
                    <motion.p className="text-center text-lg mx-5 px-10">
                        At AgroBot, our mission is to harness the power of artificial intelligence to transform agriculture into a smarter, more sustainable practice. We strive to empower farmers, growers, and agricultural communities with accessible, real-time tools for early disease detection and crop health management. By providing accurate insights through AI-driven image analysis and comprehensive disease information, we aim to reduce crop loss, improve food security, and support farmers in making confident, data-driven decisions that safeguard both their livelihoods and the environment.
                    </motion.p>
                </motion.div>
            </motion.div>


            <motion.h1 className="text-5xl text-center text-green-800 bg-slate-300 m-0 p-10" variants={itemVarient}><strong>Our Services</strong></motion.h1>
            <motion.div className="flex flex-row items-center justify-center bg-slate-300 pb-10"
            initial={{opacity:0, y: 30}}
            animate={{opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}}
        
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.2
                    }
                }
            }}
            >
                <motion.div
                className="flex flex-col w-1/3 m-5 p-5 bg-white rounded-md shadow-lg hover:p-8 hover:shadow-2xl transition duration-300"
                >
                    <h1 className="text-center text-xl text-green-700"><strong>Check the problem in your crop</strong></h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={bg1} alt="" className="w-1/2 h-32 m-5"/>
                        <div className="flex flex-row items-center justify-center">
                            {/* <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setSelectedFile(file);
                                }}
                            />
                            <label htmlFor="file-upload">
                                <img
                                    src={attach}
                                    alt=""
                                    className="w-10 h-auto cursor-pointer"
                                />
                            </label> */}
                            <button className="p-2 items-center min-w-40 text-center bg-green-50 text-green-900 border-green-900 border-2 hover:bg-green-900 hover:text-green-50" 
                            onClick={() => navigate('/chat')}>Visit</button>
                        </div>
                        

                    </div>
                </motion.div>

                <motion.div
                className="flex flex-col w-1/3 h-auto m-5 p-5 bg-white rounded-md shadow-lg hover:p-8 hover:shadow-2xl transition duration-300"
                >
                    <h1 className="text-center text-xl text-green-700"><strong>Get information from our Virtual Assistant</strong></h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={bg2} alt="" className="w-1/2 h-32 m-5"/>
                        <button className="p-2 items-center w-2/3 text-center bg-green-50 text-green-900 border-green-900 border-2 hover:bg-green-900 hover:text-green-50"
                        onClick={() => {
                            navigate('/chat');
                        }}
                        >View More</button>
                        
                    </div>
                </motion.div>

                <motion.div
                className="flex flex-col w-1/3 h-auto m-5 p-5 bg-white rounded-md shadow-lg hover:p-8 hover:shadow-2xl transition duration-300"
                >
                    <h1 className="text-center text-green-700 text-xl"><strong>Aware of timely diseases of different crops</strong></h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={bg3} alt="" className="w-1/2 h-32 m-5 justify-center items-center"/>
                        <button className="p-2 items-center w-2/3 text-center bg-green-50 text-green-900 border-green-900 border-2 hover:bg-green-900 hover:text-green-50"
                        onClick={scrollInto}
                        >View More</button>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
            style={{
                backgroundImage: `url(${bg2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            id="common-diseases"
            >
                <motion.h1 className="text-5xl text-center bg-slate-600 bg-opacity-40 text-white m-0 p-10" variants={itemVarient}><strong>Common Crop Diseases</strong></motion.h1>
                <AnimatePresence mode="wait">
                    <motion.div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-10 gap-y-10 px-10 py-20 mx-0 bg-slate-600 bg-opacity-40">
                        {diseases.length > 0 && visibleDiseases.filter(Boolean).map((disease) => {
                            return(
                                <motion.div  
                                initial={{opacity:0, y: 30}}
                                animate={{opacity:1, y: 0, transition: {duration: 0.5, ease: "easeOut"}}}
                                className="items-center justify-center bg-white rounded-md shadow-lg hover:p-12 hover:bg-slate-300 hover:shadow-2xl transition duration-300"
                                variants={{sliderVarient}}
                                key={disease.id}
                                onClick={() => {
                                    navigate('/disease_details', {state: {disease: disease}})
                                }}
                                >
                                    <h1 className="text-4xl text-green-950 text-center pt-10 py-20"><strong>{disease.common_name}</strong></h1>
                                    <img src={disease.image_url} alt="No image available" className="w-full h-auto pt-1 pb-10 p-10 items-center justify-center rounded-2xl"/>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>
                
            </motion.div>
            <Footer/>
        </div>
    )
}

export default Home;