// pages/api/auth/register.js

import bcrypt from 'bcrypt';
import dbConnect from '@/utils/db';
import User from '@/models/user';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    await dbConnect();

    try {
      // Check if the username already exists
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already exists', field: 'username' });
      }

      // Check if the email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists', field: 'email' });
      }

      // Check if the username is at least 3 characters long
      if (username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long', field: 'username' });
      }

      // Check if the password is at least 6 characters long
      if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long', field: 'password' });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: 'Registration successful', user });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Error registering user' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
