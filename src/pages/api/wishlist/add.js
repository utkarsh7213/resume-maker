import authOptions from "@/utils/AuthOptions";
import { getServerSession } from "next-auth/next";
import User from "@/models/user"; // Import your user model
import dbConnect from "@/utils/db";

export default async function handler(req, res) {
  try {
    // Get the user session
    const session = await getServerSession(req, res, authOptions);

    // Check if the user is authenticated
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get the courseId from the request body
    const { courseId } = req.body;

    // Check if courseId is provided
    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required in the request body" });
    }

    // Connect to the database
    await dbConnect();

    // Check if the course is already in the user's wishlist
    const user = await User.findOne({ email: session.user.email });

    if (user && user.wishlist.includes(courseId)) {
      // Course is already in the wishlist
      console.log('course already in the wishlist')
      return res.status(200).json({ success: true, user });
    }

    // Update the user's wishlist
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $addToSet: { wishlist: courseId } },
      { new: true }
    );

    // Check if the user is not found
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with success and updated user data
    res.status(200).json({ success: true, user: updatedUser });
    console.log('Added to wishlist');
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
