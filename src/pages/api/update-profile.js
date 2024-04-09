// pages/api/update-profile.js
import User from "@/models/user";
import authOptions from "@/utils/AuthOptions";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
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

    // Update the user details
    const { username, email } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { username, email },
      { new: true }
    );

    if (updatedUser) {

      return res.status(200).json({ success: true, message: "Profile updated successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
