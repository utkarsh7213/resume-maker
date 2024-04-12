// components/RegisterForm.js
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const RegisterForm = ({ onRegister }) => {
 

  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // Validate form fields
    if (formData.username.trim() === "") {
      toast.error("Please enter a username");
      return;
    }

    if (formData.email.trim() === "") {
      toast.error("Please enter an email address");
      return;
    }

    if (formData.password.trim() === "") {
      toast.error("Please enter a password");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    // Call the onRegister function passed from the parent component

    await onRegister(formData);
    setLoading(false)
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div className="flex flex-col space-y-1 w-[20rem] md:w-[22rem]">
          <h1 className="text-4xl text-black font-semibold">Register</h1>
          <p className="text-gray-500">Join our Resume Maker Community.</p>
        </div>
        <div className="">
          <form className="my-6 md:my-8 space-y-3" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label
                className="text-lg text-black/70 font-[400]"
                htmlFor="username"
              >
                Username
              </label>
              <input
                value={formData.username}
                onChange={handleChange}
                name="username"
                placeholder="Enter your username"
                id="username"
                className="rounded-2xl border-2 border-gray-300 bg-transparent text-black outline-none p-3 w-[20rem] md:w-[22rem] focus-within:border-blue-500 focus-within:border-2"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-2">
  <label
    className="text-lg text-black/70 font-[400]"
    htmlFor="phoneNumber"
  >
    Phone Number
  </label>
  <input
    value={formData.phoneNumber}
    onChange={handleChange}
    name="phoneNumber"
    placeholder="Enter your phone number"
    id="phoneNumber"
    className="rounded-2xl border-2 border-gray-300 bg-transparent text-black outline-none p-3 w-[20rem] md:w-[22rem] focus-within:border-blue-500 focus-within:border-2"
    type="text"
    required
  />
</div>
            <div className="flex flex-col space-y-2">
              <label
                className="text-lg text-black/70 font-[400]"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                value={formData.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter your email"
                id="email"
                className="rounded-2xl border-2 border-gray-300 bg-transparent text-black outline-none p-3 w-[20rem] md:w-[22rem] focus-within:border-blue-500 focus-within:border-2"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                className="text-lg text-black/70 font-[400]"
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={formData.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter your password"
                id="password"
                className="rounded-2xl border-2 border-gray-300 bg-transparent text-black outline-none p-3 w-[20rem] md:w-[22rem] focus-within:border-blue-500 focus-within:border-2"
                type="password"
              />
            </div>
            <div className="flex justify-end">
              <Link
                className="text-purple-600 hover:text-black"
                href={"/forgot-password"}
              >
                Forgot Password?
              </Link>
            </div>
            <div className="">
              <button
                type="submit"
                className={`bg-blue-500 p-3 rounded-3xl w-[20rem] md:w-[22rem] hover:bg-black transition-all duration-300 ${
                  loading ? "opacity-50 cursor-wait" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Registering" : "Register"}
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-black">
                Already have an account?{" "}
                <Link
                  className="text-purple-600 hover:text-black"
                  href={"/auth/login"}
                >
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

