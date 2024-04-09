import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sensitiveInfo: {
    photos: String, // Change this to [String] if you want to store multiple photos
    videos: String, // Change this to [String] if you want to store multiple videos
    // Add more fields as needed
  }
  // Other fields related to the course
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
