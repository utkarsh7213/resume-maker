// pages/api/store-bought-course.js
import User from "@/models/user";
import authOptions from "@/utils/AuthOptions";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/utils/db";
import Coupon from "@/models/coupon";

export default async function handler(req, res) {
    console.log('received req for buying')
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { courseId, couponCode } = req.body;
  
  console.log('Course ID for Buying', courseId);

  try {
    // Get the user session
    const session = await getServerSession(req, res, authOptions);

    // Check if the user is authenticated
    if (!session) {
      console.error("Unauthorized: No session found");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Connect to the database
    await dbConnect();

    // Check if the course is already in the user's bought list
    const user = await User.findOne({
      email: session.user.email,
      courses: courseId,
    });

    if (user) {
      // Course is already bought, return an error
      console.error('Course already bought. Cannot proceed with the purchase.');
      return res.status(400).json({ error: 'Course already bought', alreadyBought: true });
    }

    // Check if the coupon exists and is valid
    console.log('Coupon Received:', couponCode);

    const coupon = await Coupon.findOne({
      code: couponCode,
      used: false,
      expiresAt: { $gt: new Date() }, // Check if not expired
    });
    
    console.log('Found Coupon:', coupon);
    

    if (coupon) {
      // Apply the discount and mark the coupon as used
      // Your discount logic here...

      // For simplicity, just return true for now
      coupon.used = true;
      await coupon.save();
      console.log('Coupon is okay!');

      // Find the user and update the courses array using the user's email
      const updatedUser = await User.findOneAndUpdate(
        { email: session.user.email },
        { $push: { courses: courseId } },
        { new: true }
      );

      if (updatedUser) {
        return res.status(200).json({ success: true, alreadyBought: false });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } else {
      // Coupon is not valid
      console.log('Coupon is not okay!');
      return res.status(400).json({ error: 'Invalid coupon', alreadyBought: false });
    }
  } catch (error) {
    console.error("Error processing purchase:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
