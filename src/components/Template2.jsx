// components/ResumePreview.js
import Image from "next/image";
import React from "react";

const Template2 = React.forwardRef(({ data }, ref) => {
 
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
     
        
     
  <div ref={ref} className="p-5 px-16 bg-white min-h-screen max-h-full  rounded-md">
    <div  className="">
      <div className="flex justify-between">

      <div className="flex flex-col space-y-3">
        <h1 className="text-5xl text-blue-600 font-bold">{fullName || 'Your name here'}</h1>
        <p className="text-gray-500 text-xl">{jobTitle || 'Job title here'}</p>
        <p className="text-gray-500 text-sm break-all w-[400px]"> {summary || 'Summary here'}</p>

      </div>
      <div className="rounded-full size-[120px] bg-black flex justify-center items-center">
        <Image quality={100} className="rounded-full " width={120} height={120} src= { image ||'/img_avatar.png'} />
      </div>
      </div>
      <div className="bg-black w-full h-[1px] my-5"></div>

      <div className="flex">
<div className="w-[380px]  border-r border-r-black mr-5 ">
<div className="my-3">
          <div className="">
            <h1 className="text-2xl text-black font-bold">
              Contact Information
            </h1>
          </div>
          <div className="text-gray-600">
            <p className="">Phone number: {phoneNumber}</p>
            <p className="">E-mail: {email}</p>
            <p className="w-[200px] break-all">Address: {address}</p>
          </div>
        </div>
        <div className="">
          <div className="">
            <h1 className="text-2xl text-black font-bold">
              Skills
            </h1>
          </div>
          <div className="flex flex-col my-4 space-y-2 ">
        {skills.length === 0  ? (
<div className="text-gray-600">Enter some skills</div>
) : (
skills.map((skill, index) => (
    <div
        key={index}
        className=" flex flex-col items-start font-medium rounded-xl"
    >
      <p className="bg-gray-100 text-gray-600 p-1 rounded-sm">

        {skill}
      </p>
    </div>
))
)}
        </div>
        </div>

</div>

<div className="w-full">

      <div className="flex flex-col space-y-4 mt-3">
       
      
        <div className="">
          <div className="">
            <h1 className="text-2xl text-black font-bold">
              Work Experience
            </h1>
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
          <div className="">
            <h1 className="text-2xl text-black font-bold">Education</h1>
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
          <div className="">
            <h1 className="text-2xl text-black font-bold">Projects</h1>
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
          <div className="">
            <h1 className="text-2xl text-black font-bold">Achievements</h1>
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
       
      </div>
</div>
      </div>
     
      
    </div>
  </div>
  

</div>
 );
});

export default Template2;
