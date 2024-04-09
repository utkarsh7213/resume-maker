import dbConnect from '@/utils/db';
import User from '@/models/user';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/AuthOptions';

// Function to toggle a course in the wishlist
const toggleCourseInWishlist = async (email, courseId) => {
  if(!mongoose.Types.ObjectId.isValid(courseId)) throw new Error("Invalid course ID");
  await dbConnect();
  const user = await User.findOne({ email });
  
  if (!user) throw new Error("User not found");

  const isCourseInWishlist = user.wishlist.some(course => course.equals(courseId));

  if (isCourseInWishlist) {
    // Remove course from wishlist
    user.wishlist = user.wishlist.filter(course => !course.equals(courseId));
  } else {
    // Add course to wishlist
    user.wishlist.push(courseId);
  }

  await user.save();
  return {
    success: true,
    action: isCourseInWishlist ? 'removed' : 'added',
  };
};

// API route handler
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);

      // Check if the user is authenticated
      if (!session || !session.user) {
        return res.status(403).json({ success: false, message: 'Authentication required' });
      }

      const { courseId } = req.body;
      const userEmail = session.user.email; // Extract email from session

      if (!userEmail) {
        return res.status(403).json({ success: false, message: 'User email required for authentication' });
      }

      const result = await toggleCourseInWishlist(userEmail, courseId);

      return res.status(200).json({
        success: true,
        message: `Course successfully ${result.action} from wishlist.`,
        action:result.action
      });
    } catch (error) {
        console.log(error)
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
