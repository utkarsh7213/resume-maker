// ResetPasswordForm.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import dbConnect from '@/utils/db';
import User from '@/models/user';

export async function getServerSideProps(context) {
    const { token } = context.query;
  
    // Check if token is not provided or URL doesn't include any query parameters
    if (!token || Object.keys(context.query).length === 0) {
      return {
        notFound: true,
      };
    }
  
    try {
      await dbConnect();
      const user = await User.findOne({ 'resetPasswordToken.token': token });
  
      if (!user) {
        return {
          notFound: true,
        };
      }
  
      // Check if resetPasswordToken has expired
      const currentTime = new Date();
      if (user.resetPasswordToken.expiresAt < currentTime) {
        return {
          redirect: {
            destination: '/token-expired',
            permanent: false,
          },
        };
      }
  
      return {
        props: {
          token,
        },
      };
    } catch (error) {
      console.error('Error verifying token:', error.message);
      return {
        notFound: true,
      };
    }
  }
  

const ResetPasswordForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async (e) => {
    
    e.preventDefault();
    if (password.length < 6) {
      toast.warn('Password should be more than 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
        toast.warn('Passwords do not match.');
        return;
      }
      // Check if password length is less than 6 characters
    try {
      // Extract token from URL query parameters
      const { token } = router.query;

      const response = await fetch(`/api/reset-password?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
      });

      if (response.ok) {
        toast.success('Password reset successful. Login now!');
        router.push('/auth/login'); // Redirect to the login page
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error.message);
      toast.error('Failed to reset password. Please try again.');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col space-y-1 w-[20rem] md:w-[22rem]">
          <h1 className="text-4xl text-black font-semibold">Reset Password!</h1>
          <p className="text-gray-500">Please enter your password to reset.</p>
        </div>
        <div className="">
          <form className="my-6 md:my-8 space-y-3" onSubmit={handleResetPassword}>
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-black/70 font-[400]" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                id='password'
                className="rounded-2xl border-2 border-gray-300 bg-transparent text-black outline-none p-3 w-[20rem] md:w-[22rem] focus-within:border-blue-500 focus-within:border-2"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-black/70 font-[400]" htmlFor="confirmpassword">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
                id='confirmpassword'
                className="rounded-2xl border-2 border-gray-300 bg-transparent text-black outline-none p-3 w-[20rem] md:w-[22rem] focus-within:border-blue-500 focus-within:border-2"
              />
            </div>
            <div className="">
              <button
                type="submit"
                className={`bg-blue-500 p-3 rounded-3xl w-[20rem] md:w-[22rem] hover:bg-black transition-all duration-300`}
              >
                Reset Password
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

export default ResetPasswordForm;
