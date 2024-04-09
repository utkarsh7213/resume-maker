import dbConnect from '@/utils/db';
import nodemailer from 'nodemailer';
import OTP from '@/models/otp';
import User from '@/models/user';

// Establish database connection
dbConnect();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { email } = req.body;

    try {
        // Validate email
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address.' });
        }

        // Connect to the database
        await dbConnect();

        // Check if email exists in the user model
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Delete existing OTPs for the user's email
        await OTP.deleteMany({ email });

        // Generate OTP
        const OTPValue = generateOTP(6); // Generate a 6-digit OTP

        // Set expiration time (e.g., 10 minutes from now)
        const expiresAt = new Date();
        expiresAt.setUTCMinutes(expiresAt.getUTCMinutes() + 10); // Adding 10 minutes

        // Store OTP in MongoDB with expiration time and associate it with the user's email
        await OTP.create({
            email,
            otp: OTPValue,
            expiresAt,
        });

        // Send OTP via email
        await sendOTP(email, OTPValue);

        return res.status(200).json({ message: 'OTP sent successfully!' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ message: 'Failed to send OTP.' });
    }
}

// OTP generation function
function generateOTP(length) {
    const characters = '0123456789';
    let OTP = '';

    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        OTP += characters[index];
    }

    return OTP;
}

// Email sending function
async function sendOTP(email, OTP) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'usg7213@gmail.com',
            pass: 'wukxxexroqximldr',
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Your OTP for Password Reset',
        text: `Your OTP for password reset is: ${OTP}`,
    };

    await transporter.sendMail(mailOptions);
}

// Validate email address
function isValidEmail(email) {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
