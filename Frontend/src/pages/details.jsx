import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Details() {

    const location = useLocation();
    const disease = location.state?.disease;
    const {t, i18n} = useTranslation();
    const lang = localStorage.getItem('language') || 'en';

    return (
        <div>
            <Navbar />
            <div className='flex flex-row bg-slate-100'>
                {disease.image_url ? (
                    <img src={disease.image_url} alt="" className='w-1/2 h-auto bg-slate-100 m-10' />
                ) : (
                    <p>{t('No image found')}</p>
                )}
                <div className='flex flex-col justify-center ml-5'>
                    <h1 className='text-2xl font-bold text-left m-2 text-black'>
                        {t(disease.common_name)}
                    </h1>
                    <h3 className='text-sm text-left m-2 text-black'>
                        {t('Scientific Name')}: {t(disease.scientific_name)}
                    </h3>
                    <h3 className='text-sm text-left m-2 text-black font-bold'>
                        {t('Other Names')}
                    </h3>
                    {disease.other_names && disease.other_names.map((other_name, idx) => (
                        <h3 key={idx} className='text-sm text-left m-1 text-black'>
                            {t(other_name)}
                        </h3>
                    ))}
                    <h3 className='text-sm text-left m-2 text-black'>{t(disease.family)}</h3>
                    {disease.descriptions && disease.descriptions.map((description, idx) => (
                        <React.Fragment key={idx}>
                            <h3 className='text-sm text-left m-2 text-black'><strong>
                                {t(description["subtitle"])}
                            </strong></h3>
                            <h3 className='text-sm text-left m-2 text-black'>
                                {t(description["description"])}
                            </h3>
                        </React.Fragment>
                    ))}
                    {disease.solutions && disease.solutions.map((solution, idx) => (
                        <React.Fragment key={idx}>
                            <h3 className='text-sm text-left m-2 text-black'><strong>
                                {t(solution["subtitle"])}
                            </strong>:</h3>
                            <br />
                            <h3 className='text-sm text-left m-2 text-black'>
                                {t(solution["description"])}
                            </h3>
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Details;