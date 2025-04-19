import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useLocation } from 'react-router-dom';

function Details() {

    const location = useLocation();
    const disease = location.state?.disease;

    return (
        <div>
            <Navbar />
            <div className='flex flex-row bg-slate-100'>
                {disease.image_url? <img src={disease.image_url} alt="" className='w-1/2 h-auto bg-slate-100 m-10' /> : <p>No image found</p>}
                <div className='flex flex-col justify-center ml-5'>
                    <h1 className='text-2xl font-bold text-left m-2 text-black'>{disease.common_name}</h1>
                    <h3 className='text-sm text-left m-2 text-black'>Scientific Name: {disease.scientific_name}</h3>
                    <h3 className='text-sm text-left m-2 text-black font-bold'>Other Names</h3>
                    {disease.other_names && disease.other_names.map((other_name) => {
                        return(
                            <h3 className='text-sm text-left m-1 text-black'>{other_name}</h3>
                        )
                    })}
                    <h3 className='text-sm text-left m-2 text-black'>{disease.family}</h3>
                    {disease.descriptions && disease.descriptions.map((description) => {
                        return(
                            <>
                                <h3 className='text-sm text-left m-2 text-black'><strong>{description["subtitle"]}</strong></h3>
                                <h3 className='text-sm text-left m-2 text-black'>{description["description"]}</h3>
                            </>
                        )
                    })}
                    {disease.solutions && disease.solutions.map((solution) => {
                        return(
                            <>
                                <h3 className='text-sm text-left m-2 text-black'><strong>{solution["subtitle"]}</strong>: </h3><br/>
                                <h3 className='text-sm text-left m-2 text-black'>{solution["description"]}</h3><br/>
                            </>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Details;