import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'

function index() {
  return (
    <div className='min-h-screen bg-gray-50'>
        <div className="">
            <Header/>
        </div>

<div className="my-6">
    <h1 className="text-center text-black text-4xl font-semibold">Welcome to Resume Maker!</h1>
</div>

<div className="flex flex-wrap justify-center gap-8">
  {/* Resume Card 1 */}
  <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[300px] h-[400px]">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-black">Resume Template 1</div>
      <p className="text-gray-700 text-base">Description of Resume Template 1...</p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <Link href={'/template/1'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Details
      </Link>
    </div>
  </div>

  {/* Resume Card 2 */}
  <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[300px] h-[400px]">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-black">Resume Template 2</div>
      <p className="text-gray-700 text-base">Description of Resume Template 1...</p>
    </div>
    <div className="px-6 pt-4 pb-2">
    <Link href={'/template/2'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Details
      </Link>
    </div>
  </div>

  {/* Resume Card 3 */}
  <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[300px] h-[400px]">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-black">Resume Template 3</div>
      <p className="text-gray-700 text-base">Description of Resume Template 1...</p>
    </div>
    <div className="px-6 pt-4 pb-2">
    <Link href={'/template/3'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Details
      </Link>
    </div>
  </div>

  {/* Resume Card 4 */}
  <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[300px] h-[400px]">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-black">Resume Template 4</div>
      <p className="text-gray-700 text-base">Description of Resume Template 1...</p>
    </div>
    <div className="px-6 pt-4 pb-2">
    <Link href={'/template/4'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Details
      </Link>
    </div>
  </div>
</div>

    </div>
  )
}

export default index