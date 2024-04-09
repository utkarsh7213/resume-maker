// pages/api/wishlist.js
import User from '@/models/user';
import authOptions from '@/utils/AuthOptions';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/utils/db';

export default async function handler(req, res) {
  try {
    // Get the user session
    const session = await getServerSession(req, res, authOptions);

    // Check if the user is authenticated
    if (!session) {
      console.error('Unauthorized: No session found');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Connect to the database
    await dbConnect();

    // Find the user and get the wishlist
    const user = await User.findOne({ email: session.user.email });

    // Check if the user is not found
    if (!user) {
      console.error('User not found:', session.user.email);
      return res.status(404).json({ error: 'User not found' });
    }

    // Log the user's wishlist for debugging
    const serializedWishlist = user.wishlist.map((objectId) => objectId.toString());
    console.log('User Wishlist:', serializedWishlist);

    // Respond with the user's wishlist
    res.status(200).json({ wishlist: serializedWishlist,success:true });
  } catch (error) {
    // Handle errors
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
