// pages/api/user/boughtcourses.js
import User from '@/models/user';
import Course from '@/models/course';
import authOptions from '@/utils/AuthOptions';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/utils/db';

export default async function handler(req, res) {
  try {
    // Get the user session
    const session = await getServerSession(req, res, authOptions);

    // Check if the user is authenticated
    if (!session) {
      console.error('Unauthorized: No session found');
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Connect to the database
    await dbConnect();

    // Find the user and get the bought courses
    const user = await User.findOne({ email: session.user.email });
console.log()
    // Check if the user is not found or has no bought courses
    if (!user || !user.courses) {
      console.error('User not found or no bought courses:', session.user.email);
      return res.status(404).json({ success: false, message: 'User not found or no bought courses' });
    }

    // Fetch course details for each bought course ID
    const courses = await Promise.all(
      user.courses.map(async (courseId) => {
        const course = await Course.findById(courseId);

        if (!course) {
          return null;
        }

        return {
          _id: course._id,
          name: course.name,
          description: course.description,
          price: course.price,
          // Add more fields as needed
        };
      })
    );

    return res.status(200).json({ success: true, boughtCourses: courses.filter(Boolean) });
  } catch (error) {
    // Handle errors
    console.error('Internal Server Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
