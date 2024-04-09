import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';

const PasswordResetRequestForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when form is submitted

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        router.push(`/auth/otp-verification?email=${encodeURIComponent(email)}`);
        toast.success('OTP sent to your email.');
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error requesting password reset:', error.message);
      if (error.message === 'User not found.') {
        toast.error('Email does not exist.');
      } else {
        toast.error('Failed to request password reset. Please try again later.');
      }
    } finally {
      setLoading(false); // Set loading state back to false when response is received
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col space-y-1 w-[20rem] md:w-[22rem]">
          <h1 className="text-4xl text-black font-semibold">Reset Password!</h1>
          <p className="text-gray-500">Please enter your email for verification.</p>
        </div>
        <div className="">
          <form className="my-6 md:my-8 space-y-3" onSubmit={handleRequestReset}>
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-black/70 font-[400]" htmlFor="username">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="rounded-2xl border-2 border-gray-300 bg-transparent text-black outline-none p-3 w-[20rem] md:w-[22rem] focus-within:border-blue-500 focus-within:border-2"
              />
            </div>
            <div className="">
              <button
                type="submit"
                className={`bg-blue-500 p-3 rounded-3xl w-[20rem] md:w-[22rem] hover:bg-black transition-all duration-300 ${
                  loading ? 'opacity-50 cursor-wait' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Sending OTP' : 'Send OTP'}
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-black">
                Remember Password?{' '}
                <Link className="text-purple-600 hover:text-black" href={'/auth/login'}>
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

export default PasswordResetRequestForm;
