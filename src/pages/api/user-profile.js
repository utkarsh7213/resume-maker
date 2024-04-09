// pages/api/user-profile.js
import User from "@/models/user";
import authOptions from "@/utils/AuthOptions";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

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

    // Find the user by email
    const user = await User.findOne({ email: session.user.email });

    if (user) {
      // User found, send user profile information
      return res.status(200).json({
        username: user.username,
        email: user.email,
        courses: user.courses,
        wishlist: user.wishlist
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
