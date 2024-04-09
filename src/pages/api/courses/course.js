// pages/api/course.js
import Course from '@/models/course';
import dbConnect from '@/utils/db';

export default async function handler(req, res) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const courseId = query.id;
        const course = await Course.findById(courseId);

        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }

        return res.status(200).json(course);
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
      } finally {
        // Disconnect from the database
      }
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
