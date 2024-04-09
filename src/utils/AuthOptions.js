// auth-options.js
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/utils/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';

const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ username: credentials.username });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Return the user object without the password field
          return Promise.resolve({
            id: user._id,
            username: user.username,
            email: user.email,
            // Add other user properties as needed
          });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    register: '/auth/register',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: null,
  },
  callbacks: {},
  session: {
    jwt: true,
  },
  database: process.env.MONGODB_URI,
};

export default authOptions;
