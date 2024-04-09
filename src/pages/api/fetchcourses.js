// pages/api/fetchcourses.js
import dbConnect from '@/utils/db';
import Course from '@/models/course'; // Update the import statement
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();

      // Fetch all courses
      const courses = await Course.find({});

      return res.status(200).json({ success: true, courses });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
