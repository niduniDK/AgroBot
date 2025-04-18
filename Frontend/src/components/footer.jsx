import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, easeOut, useInView } from "framer-motion";
import icon from "../assets/app-icon.png";


function Footer() {

    const itemVarient = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: easeOut }, y: 0 }
    }
    
    const ref = useRef(null);
    const isInView = useInView(ref, {once: false});

    return(
        <motion.div ref={ref} variants={itemVarient} initial="hidden" animate={isInView?"visible":"hidden"} className="flex flex-row items-center justify-center w-full h-auto bg-white m-0">
            <Link to={"/home"} className="flex flex-row items-center justify-center absolute left-6">
                <img src={icon} alt="" className="w-12 h-auto m-5 ml-12"/>
                <h1 className="text-green-600 text-4xl m-2 ml-0 my-5"><strong>AgroBot</strong></h1>
            </Link>
            <div className="justify-center absolute right-6">
                <p className="text-sm text-gray-700 m-2 mt-5 mr-20">agrobot@gmail.com</p>
                <p className="text-sm text-gray-700 m-2 mr-20">123 Movie St, Agro City, Sri Lanka</p>
                <p className="text-sm text-gray-700 m-2 mb-5 mr-20">+94 (123) 456-7890</p>
            </div>
            <p className="text-sm text-gray-700 mx-72 my-10 text-center">&copy; 2025 AgroBot. All rights reserved.</p>
        </motion.div>
    )
}

export default Footer;