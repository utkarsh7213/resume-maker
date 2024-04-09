import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import OTP from '@/models/otp';
import dbConnect from '@/utils/db';

const OTPVerificationForm = ({ email }) => {
  const router = useRouter();
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Check if all OTP fields are filled
    const isOTPFilled = otp.every((digit) => digit.trim() !== '');
    
    // If all fields are filled, simulate form submission or directly call handleVerifyOTP
    if (isOTPFilled) {
      // Ensure you handle the submission properly here, you might need to adjust
      // handleVerifyOTP to work without an event, or simulate a submit event.
      handleVerifyOTP(new Event('submit')); // Example, adjust according to your needs
    }
  }, [otp]); 
  const handleVerifyOTP = async (e) => {
    setLoading(true)
    e.preventDefault();
   


    try {
      const otpValue = otp.join('');
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpValue, email }), // Include email in the request body
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        toast.success('OTP Verified!');
        router.push(`/auth/reset-password-v2?token=${token}`); // Redirect to the reset password page with the token query parameter
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      toast.error('Incorrect OTP!');
    } finally{
        setLoading(false)
    }
  };

  const handleChange = (index, event) => {
    const value = event.target.value;
    const newOTP = [...otp];
  
    // If backspace is pressed, clear the current input
    if (event.key === 'Backspace') {
      newOTP[index] = '';
    } else {
      newOTP[index] = value;
    }
  
    setOTP(newOTP);
  
    // If a digit is entered and it's not the last input, move focus to the next input
    if (value && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
   
  };
  const handleKeyDown = (index, event) => {
  if (event.key === 'Backspace') {
    const newOTP = [...otp];
    newOTP[index] = '';
    setOTP(newOTP);
    if (index > 0) {
      otpInputs.current[index - 1].focus();
    }
  }
};

  
  

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col space-y-1 w-[20rem] md:w-[22rem]">
          <h1 className="text-4xl text-black font-semibold">Reset Password!</h1>
          <p className="text-gray-500">Please enter OTP for Verification.</p>
          <p className="text-gray-500 my-1">OTP sent to <span className="font-semibold">{email}</span>.</p>
        </div>
        <div className="">
          <form className="my-6 md:my-8 space-y-3" onSubmit={handleVerifyOTP}>
            <div className="flex flex-row justify-center space-x-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(event) => handleChange(index, event)} 
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  className="text-center rounded-2xl border-2 border-gray-300 bg-transparent text-black outline-none p-3 w-12 focus-within:border-blue-500 focus-within:border-2"
                />
              ))}
            </div>
            <div className="">
              <button
              disabled={loading}
                type="submit"
                className={` p-3 rounded-3xl w-[20rem] md:w-[22rem] ${loading ? 'bg-gray-500' : 'bg-blue-500'}`}
              >
                 {loading ? 'Verifying...' : 'Verify OTP' }
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

export default OTPVerificationForm;

export async function getServerSideProps({ query }) {
  const { email } = query;

  try {
    await dbConnect();

    // Check if OTP is generated for the provided email
    const otpEntry = await OTP.findOne({ email });

    if (!otpEntry) {
      return {
        notFound: true // Redirect to default 404 page
      };
    }
    const currentTime = new Date();
    if (otpEntry.expiresAt < currentTime) {
      return {
        redirect: {
          destination: '/OTP-expired',
          permanent: false,
        },
      };
    }
    return {
      props: {
        email,
        notFound: false,
      },
    };
  } catch (error) {
    console.error('Error fetching OTP:', error);
    return {
      notFound: true // Redirect to default 404 page
    };
  }
}
