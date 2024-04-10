import Header from "@/components/Header";
import React from "react";

const About1 = () => {
    return (
        <div className="bg-white min-h-screen max-h-full">
        <Header/>
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 bg-white">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">Utkarsh Singh and Parvesh Sharma form a formidable team in the realm of web development, specializing in frontend and backend technologies, respectively. Their partnership is a beacon of innovation and efficiency in tackling complex digital projects.</p>
                    <p className="font-normal text-base leading-6 text-gray-600 first-letter:uppercase py-6">
                    Utkarsh, the frontend wizard, possesses a profound ability to breathe life into designs, ensuring that every user interface is not only visually appealing but also intuitive and user-friendly. His expertise spans across a wide range of modern frontend technologies, including HTML, CSS, JavaScript, and frameworks such as React and Next JS. What sets Utkarsh apart is his commitment to responsive design principles, ensuring a seamless experience across various devices. His passion for frontend development is rooted in his love for art and design, combined with his fascination with technology, driving him to constantly explore the latest trends and tools in the digital design world.
                    </p>
                    <p className="font-normal text-base leading-6 text-gray-600 first-letter:uppercase py-">
                    Parvesh, on the other hand, is the master of backend operations. With a solid foundation in computer science and a deep understanding of server, database, and API interactions, he excels in creating scalable and secure back-end systems. Parvesh is well-versed in a multitude of programming languages and frameworks, including Node.js, Python, and Ruby on Rails, enabling him to choose the best technology stack for each project. His analytical skills and attention to detail ensure that the backend systems are robust, efficient, and capable of handling high volumes of traffic.
                    </p>
                </div>
                <div className="w-full lg:w-8/12 ">
                    <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
                    <p className="font-normal text-base leading-6 text-gray-600 ">Together, Utkarsh and Parvesh embody the essence of a full-stack development team. Their collaboration ensures that projects are not only aesthetically pleasing but also built on a strong, reliable technical foundation. Their combined expertise allows them to bridge the gap between frontend and backend development seamlessly, delivering comprehensive solutions that meet and exceed their clients' expectations. In the ever-evolving world of web development, Utkarsh and Parvesh continue to adapt, learn, and innovate, making them a powerhouse in their field.
</p>
                </div>
                {/* <div className="w-full lg:w-8/12 lg:pt-8">
                    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png" alt="Alexa featured Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/zHjXqg4/Rectangle-118.png" alt="Alexa featured Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Alexa</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/fGmxhVy/Rectangle-119.png" alt="Olivia featured Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png" alt="Olivia featured Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Olivia</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png" alt="Liam featued Img" />
                            <img className="md:hidden block" src="https://i.ibb.co/C5MMBcs/Rectangle-120.png" alt="Liam featued Img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Liam</p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="md:block hidden" src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png" alt="Elijah featured img" />
                            <img className="md:hidden block" src="https://i.ibb.co/ThZBWxH/Rectangle-121.png" alt="Elijah featured img" />
                            <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Elijah</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        </div>
    );
};

export default About1;
