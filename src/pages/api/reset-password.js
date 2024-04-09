import dbConnect from '@/utils/db';
import bcrypt from 'bcrypt';
import User from '@/models/user';

// Establish database connection
dbConnect();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { token } = req.query;
    const { password, confirmPassword } = req.body;

    try {
        // Validate password and confirm password
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match.');
        }

        // Find user by reset token
        const user = await User.findOne({
            'resetPasswordToken.token': token,
            'resetPasswordToken.expiresAt': { $gte: new Date() }
        });

        if (!user) {
            throw new Error('Invalid or expired token.');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password and remove reset token
        await User.updateOne(
            { 'resetPasswordToken.token': token },
            { $set: { password: hashedPassword }, $unset: { resetPasswordToken: 1 } }
        );

        return res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error resetting password:', error.message);
        return res.status(400).json({ message: error.message });
    }
}
