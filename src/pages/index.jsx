import Header from '@/components/Header'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function index() {
  const templates = [
    {
      id: 1,
      title: 'Resume Template 1',
      imageSrc: '/1.png',
      link: '/template/1',
    },
    {
      id: 2,
      title: 'Resume Template 2',
      imageSrc: '/2.png',
      link: '/template/2',
    },
    {
      id: 3,
      title: 'Resume Template 3',
      imageSrc: 'https://placehold.co/300x300@2x.png',
      link: '/template/3',
    },
    // Add more templates as needed
  ];
  
  return (
    <div className='min-h-screen bg-gray-50'>
        <div className="">
            <Header/>
        </div>

<div className="my-6">
    <h1 className="text-center text-black text-4xl font-semibold">Welcome to Resume Maker!</h1>
</div>

<div className="flex flex-wrap justify-center gap-4">
{templates.map((template) => (
        <div key={template.id} className="bg-white relative shadow-lg rounded-xl overflow-hidden w-[300px] h-[450px] m-4 hover:scale-105 transition">
          <div className="px-6 py-2">
            <div className="font-bold text-xl mb-1 text-black text-center">{template.title}</div>
          </div>
          <div className="">
            <Image width={300} height={200} src={template.imageSrc} alt={`Template ${template.id}`} quality={100} />
          </div>
          <div className="flex justify-center py-3">
            <Link href={template.link} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-2xl absolute bottom-3">
              Select Template
            </Link>
          </div>
        </div>
      ))}
</div>

    </div>
  )
}

export default index