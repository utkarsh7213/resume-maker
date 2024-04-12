import RegisterForm from "@/components/RegisterForm";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';


const RegisterPage = () => {
  const router = useRouter();
  const handleRegister = async (formData) => {
    try {
      // Make a POST request to the register API route
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful
        router.push('/auth/login')
        toast.success('Registration successful, Login now!');
      } else {
        const data = await response.json();
        console.error('Registration failed:', data.error);

        // Display an error toast based on the error response
        if (data.field === 'username') {
          toast.error('Username already exists!');
        } else if (data.field === 'email') {
          toast.error('Email already exists!');
        }else if (data.field === 'phone') {
          toast.error('Phone number already exists!');
        } else {
          toast.error('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      toast.error('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div>
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;

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
