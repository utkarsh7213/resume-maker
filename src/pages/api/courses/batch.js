// pages/api/courses/batch.js

import Course from '@/models/course';
import dbConnect from '@/utils/db';

export default async function handler(req, res) {
  try {
    // Connect to the database
    await dbConnect();
console.log('message')
    // Get the course IDs from the request body
    const { courseIds } = req.body;

    // Fetch the courses based on the provided course IDs
    const courses = await Course.find({ _id: { $in: courseIds } });

    // Respond with the fetched courses
    console.log(courses)
    res.status(200).json({ courses });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
