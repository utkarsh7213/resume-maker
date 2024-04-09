// components/ResumePreview.js
import React from "react";

const ResumePreview = React.forwardRef(({ data }, ref) => {
 
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
    address
 } = data;
 return (
  <div  className="w-full" id="resume">
     
        
     
  <div ref={ref} className="p-5 px-16 bg-white  rounded-md">
    <div  className="">
      <div className="flex flex-col space-y-3">
        <h1 className="text-5xl text-blue-600 font-bold">{fullName}</h1>
        <p className="text-gray-500 text-xl">{jobTitle}</p>
      </div>

      <div className="mt-5">
        <div className="bg-[#2C2C54] w-full h-[40px] rounded-md flex justify-center items-center">
          <h1 className="text-2xl text-white font-semibold">summary</h1>
        </div>
        <div className="flex  my-4 space-x-4 justify-center text-black">
      <p className="w-[800px] break-all">
        
        {summary}
        </p>
        </div>
      </div>
      <div className="mt-5">
        <div className="bg-[#2C2C54] w-full h-[40px] rounded-md flex justify-center items-center">
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
            <h1 className="text-2xl text-black font-bold">
              Contact Information
            </h1>
          </div>
          <div className="text-gray-600">
            <p className="">Phone number: {phoneNumber}</p>
            <p className="">E-mail: {email}</p>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
        <div className="">
          <div className="">
            <h1 className="text-2xl text-black font-bold">Address</h1>
          </div>
          <div className="text-gray-600">{address}</div>
        </div>
        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
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
        <div className="h-[2px] w-full bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
  {/* <button className="p-3 rounded-md bg-gray-500 my-3 mx-4" onClick={handlePrint}>Download PDF</button> */}

</div>
 );
});

export default ResumePreview;
