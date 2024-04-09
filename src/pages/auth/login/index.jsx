import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { getSession } from 'next-auth/react';

const LoginPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if username is provided
    if (!credentials.username) {
      toast.error('Please provide your username.');
      return;
    }

    // Check if password is provided
    if (!credentials.password) {
      toast.error('Please provide your password.');
      return;
    }

    try {
      setLoading(true);

      const result = await signIn('credentials', {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
      });

      // Check the result and handle accordingly
      if (result.error) {
        toast.error('Please check your details!');
        console.error('Login failed:', result.error);
      } else {
        router.push('/');
        toast.success('Login Successful!');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
        <div className="flex flex-col space-y-1 w-[20rem] md:w-[22rem]">
          <h1 className="text-4xl text-black font-semibold">Login</h1>
          <p className="text-gray-500">Please login into your account to view courses.</p>
        </div>
        <div className="">
          <form className="my-6 md:my-8 space-y-3" onSubmit={handleLogin}>
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-black/70 font-[400]" htmlFor="username">
                Username
              </label>
              <input
                value={credentials.username}
                onChange={handleChange}
                name="username"
                placeholder="Enter your username"
                id="username"
                className="rounded-2xl border-2 border-gray-300 bg-transparent text-black outline-none p-3 w-[20rem] md:w-[22rem] focus-within:border-blue-500 focus-within:border-2"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-black/70 font-[400]" htmlFor="password">
                Password
              </label>
              <input
                value={credentials.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter your password"
                id="password"
                className="rounded-2xl border-2 border-gray-300 bg-transparent text-black outline-none p-3 w-[20rem] md:w-[22rem] focus-within:border-blue-500 focus-within:border-2"
                type="password"
              />
            </div>
            <div className="flex justify-end">
              <Link className="text-purple-600 hover:text-black" href={'/auth/email-verification'}>
                Forgot Password?
              </Link>
            </div>
            <div className="">
              <button
                type="submit"
                className={`bg-blue-500 p-3 rounded-3xl w-[20rem] md:w-[22rem] hover:bg-black transition-all duration-300 ${
                  loading ? 'opacity-50 cursor-wait' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-black">
                Don't have an account?{' '}
                <Link className="text-purple-600 hover:text-black" href={'/auth/register'}>
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Redirect to home if the user is already authenticated
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Return an empty object if the user is not authenticated
  };
}
