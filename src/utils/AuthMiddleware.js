// authMiddleware.js
import { getSession } from 'next-auth/react';

export const authMiddleware = async (context) => {
  const session = await getSession(context);
  
  // If the user is signed in, prevent access to login and register pages
  if (session) {
    if (context.pathname === '/auth/login' || context.pathname === '/auth/register') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  } 
  // If the user is signed out, restrict access to other pages and redirect to login page
  else {
    if (context.pathname !== '/auth/login' && context.pathname !== '/auth/register') {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }
  }

  // If user's authentication status is unchanged, continue to the requested page
  return {
    props: {},
  };
};
