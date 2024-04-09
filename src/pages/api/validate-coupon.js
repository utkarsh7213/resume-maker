// pages/api/validate-coupon.js
import Coupon from "@/models/coupon";
import User from "@/models/user";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/utils/db";
import authOptions from "@/utils/AuthOptions";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { couponCode, courseId } = req.body;
  console.log('curse id::',courseId)

  try {
    // Get the user session using authOptions
    const session = await getServerSession(req, res, authOptions);

    // Check if the user is authenticated
    if (!session) {
      console.error("Unauthorized: No session found");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Connect to the database
    await dbConnect();

    // Check if the coupon exists and is valid
    const coupon = await Coupon.findOne({
      code: couponCode,
      used: false,
      expiresAt: { $gt: new Date() }, // Check if not expired
    });

    console.log('Coupon Received:', couponCode);
    console.log('Found Coupon:', coupon);  // Add this line for debuggin

    // Check if the user has already bought the course
    const user = await User.findOne({ email: session.user.email });

    if (user && user.courses.includes(courseId)) {
      // If the user has already bought the course
      console.log('Course already bought!');
      return res.status(200).json({ isValidCoupon: false, error: "Course already bought" });
    }

    // Mark the coupon as used
    if (coupon) {
      coupon.used = true;
      await coupon.save();
    }

    // Find the user and update the courses array using the user's email
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $push: { courses: courseId } },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({ isValidCoupon: true });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error validating coupon:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
