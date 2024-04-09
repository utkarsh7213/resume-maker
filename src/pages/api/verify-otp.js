import dbConnect from '@/utils/db';
import OTP from '@/models/otp';
import User from '@/models/user';
import crypto from 'crypto';

// Function to generate a random token
function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Function to calculate expiration time as 10 minutes from now in UTC
function calculateExpirationTime() {
    const now = new Date();
    return new Date(now.getTime() + 600000);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { otp, email } = req.body;
console.log(req.body)
    try {
        // Connect to the database
        await dbConnect();

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            throw new Error('User not found.');
        }

        // Find OTP entry for the user's email and OTP
        const otpEntry = await OTP.findOne({ email, otp });

        // Check if OTP entry exists
        if (!otpEntry) {
            throw new Error('Invalid OTP.');
        }

        // Check if OTP has expired
        if (otpEntry.expiresAt < new Date()) {
            await OTP.deleteOne({ email, otp }); // Delete expired OTP
            throw new Error('OTP has expired.');
        }

        // Generate a unique token for the user
        const token = generateToken();

        // Calculate expiration time for the token
        const expirationTime = calculateExpirationTime();

        // Update user document with reset password token and its expiration time
        user.resetPasswordToken = { token, expiresAt: expirationTime };
        await user.save();

        // Delete all OTP entries for the user
        await OTP.deleteMany({ email });

        // Return success response with user's email and token
        return res.status(200).json({ message: 'OTP verified successfully.', email, token });
    } catch (error) {
        console.error('Error verifying OTP:', error.message);
        return res.status(400).json({ message: error.message });
    }
}
