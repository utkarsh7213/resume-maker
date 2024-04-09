// pages/api/admin/create-course.js

import dbConnect from '@/utils/db';
import Course from '@/models/course';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }
console.log('req received in admin!')
  try {
    await dbConnect();

    // Extract course data from the request body
    const { name, price, description, photos, videos } = req.body;
    console.log(photos)

    // Create a new course instance
    const newCourse = new Course({
      name,
      price,
      description,
      sensitiveInfo: {
        photos,
        videos,
      },
    });

    // Save the new course to the database
    await newCourse.save();

    // Respond with success
    res.status(201).json({ success: true });
  } catch (error) {
    // Handle errors
    console.error('Error creating course:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
