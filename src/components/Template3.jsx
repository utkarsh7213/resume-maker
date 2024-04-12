// components/ResumePreview.js
import Image from "next/image";
import React from "react";

const Template3 = React.forwardRef(({ data }, ref) => {
 
 const {
    fullName,
    jobTitle,
    summary,
    experience,
    education,
    skills,
    phoneNumber,
    projects,
    achievements,
    email,
    address,
    image
 } = data;
 return (
  <div  className="w-full" id="resume">
     
        
     
  <div ref={ref} className="p-5 lg:px-16 bg-white  rounded-md">
    <div  className="">
      <div className="flex justify-between">

      <div className="flex flex-col space-y-3">
        <h1 className="text-2xl sm:text-5xl text-blue-600 font-bold break-all">{fullName}</h1>
        <p className="text-gray-500 text-xl break-all">{jobTitle}</p>
      </div>
      <div className="rounded-full min-w-[120px] size-[120px] bg-black flex justify-center items-center">
      <Image quality={100} className="rounded-full size-[120px]" width={500} height={500} src= { image ||'/img_avatar.png'} />
      </div>
      </div>

      <div className="mt-5">
        <div className="bg-[#1b5b47] w-full h-[40px] rounded-md flex justify-center items-center">
          <h1 className="text-2xl text-white font-semibold">summary</h1>
        </div>
        <div className="flex  my-4 space-x-4 justify-center text-black">
      <p className="w-[800px] break-all">
        
        {summary}
        </p>
        </div>
      </div>
      <div className="mt-5">
        <div className="bg-[#1b5b47] w-full h-[40px] rounded-md flex justify-center items-center">
          <h1 className="text-2xl text-white font-semibold">Skills</h1>
        </div>
        <div className="flex my-4 space-x-4 justify-center">
        {skills.length === 0 ? (
<div className="text-gray-600">Enter some skills</div>
) : (
skills.map((skill, index) => (
    <div
        key={index}
        className="p-2 bg-gray-400 font-medium rounded-xl"
    >
        {skill}
    </div>
))
)}
        </div>
      </div>
      <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
      <div className="flex flex-col space-y-4 mt-3">
        <div className="">
          <div className="">
            <div className="bg-[#1b5b47] w-full h-[40px] rounded-md flex justify-center items-center my-3">
          <h1 className="text-2xl text-white font-semibold">Contact Information</h1>
        </div>
          </div>
          <div className="text-gray-600">
            <p className="">Phone number: {phoneNumber}</p>
            <p className="">E-mail: {email}</p>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
        <div className="">
        <div className="bg-[#1b5b47] w-full h-[40px] rounded-md flex justify-center items-center my-3">
          <h1 className="text-2xl text-white font-semibold">Address</h1>
        </div>
          <div className="text-gray-600">{address || 'Enter shown here'}</div>
        </div>
        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
        <div className="">
        <div className="bg-[#1b5b47] w-full h-[40px] rounded-md flex justify-center items-center my-3">
          <h1 className="text-2xl text-white font-semibold">Work Experience</h1>
        </div>
          <div className="text-gray-600">
            <ul className="list-disc px-5">
              {experience &&
                experience.map((exp, index) => (
                  <li key={index} className="">
                    <div className="flex flex-col">
                      <p className="font-medium">{exp.title}</p>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
        <div className="">
        <div className="bg-[#1b5b47] w-full h-[40px] rounded-md flex justify-center items-center my-3">
          <h1 className="text-2xl text-white font-semibold">Education</h1>
        </div>
          <div className="text-gray-600">
            <ul className="list-disc px-5">
              {education &&
                education.map((edu, index) => (
                  <li key={index} className="">
                    <div className="flex flex-col">
                      <p className="font-medium">{edu.title}</p>
                      <p className="text-gray-600">{edu.description}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
        <div className="">
        <div className="bg-[#1b5b47] w-full h-[40px] rounded-md flex justify-center items-center my-3">
          <h1 className="text-2xl text-white font-semibold">Projects</h1>
        </div>
          <div className="text-gray-600">
            <ul className="list-disc px-5">
              {projects &&
                projects.map((project, index) => (
                  <li key={index} className="">
                    <div className="flex flex-col">
                      <p className="font-medium">{project.title}</p>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
        <div className="">
        <div className="bg-[#1b5b47] w-full h-[40px] rounded-md flex justify-center items-center my-3">
          <h1 className="text-2xl text-white font-semibold">Achievements</h1>
        </div>
          <div className="text-gray-600">
            <ul className="list-disc px-5">
              {achievements &&
                achievements.map((achievement, index) => (
                  <li key={index} className="">
                    <div className="flex flex-col">
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
  {/* <button className="p-3 rounded-md bg-gray-500 my-3 mx-4" onClick={handlePrint}>Download PDF</button> */}

</div>
 );
});

export default Template3;
