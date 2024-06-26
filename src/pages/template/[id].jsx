import Header from '@/components/Header';
import InputFields from '@/components/InputFields';
import ResumePreview from '@/components/ResumePreview';
import Template2 from '@/components/Template2';
import Template3 from '@/components/Template3';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

const IndexPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [resumeData, setResumeData] = useState({
        fullName: 'Your name here',
        jobTitle: 'Job title here',
        summary: 'summary here',
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
            <div className="flex flex-col lg:flex-row px-3 md:px-5 pt-5 lg:space-x-8 max-h-full min-h-screen bg-gray-100">
                <div className=" lg:mt-5 lg:w-[50%]">
                <InputFields handleChange={handleChange} setResumeData={setResumeData} />
                </div>
                    {/* <ResumePreview ref={componentRef} data={resumeData} /> */}
  {id === '1' && <ResumePreview ref={componentRef} data={resumeData} />}
  {id === '2' && <Template2 ref={componentRef} data={resumeData} />}
  {id === '3' && <Template3 ref={componentRef} data={resumeData} />}
            </div>
            <div className="bg-gray-100 py-10 flex justify-center space-x-5">
            <button className='p-3 bg-teal-500 hover:bg-teal-700 transition rounded-xl' onClick={handlePrint}>Print Resume</button>
            <Link href={'/'} className='p-3 bg-teal-500 hover:bg-teal-700 transition rounded-xl'>Select another template</Link>
            </div>
        </>
    );
};

export default IndexPage;
