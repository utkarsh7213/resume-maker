import Header from '@/components/Header';
import InputFields from '@/components/InputFields';
import ResumePreview from '@/components/ResumePreview';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';

const IndexPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [resumeData, setResumeData] = useState({
        fullName: '',
        jobTitle: '',
        summary: '',
        experience: [],
        education: [],
        skills: [],
        address: '',
        email:'',
        phoneNumber: ''
    });
    const componentRef = useRef();
 const handlePrint = useReactToPrint({
    content: () => componentRef.current,
 });
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setResumeData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    return (
        <>
            <Header/>
            <div className="flex px-5 space-x-8 max-h-full min-h-screen bg-gray-100">
                <div className="w-[50%]">
                <InputFields handleChange={handleChange} setResumeData={setResumeData} />
                </div>
                    {/* <ResumePreview ref={componentRef} data={resumeData} /> */}
  {id === '1' && <ResumePreview ref={componentRef} data={resumeData} />}
  {id === '2' && <ResumePreview ref={componentRef} data={resumeData} />}
            </div>
            <div className="bg-gray-100 py-10">
            <button className='p-3 bg-teal-400 rounded-xl' onClick={handlePrint}>Print Resume</button>
            </div>
        </>
    );
};

export default IndexPage;
