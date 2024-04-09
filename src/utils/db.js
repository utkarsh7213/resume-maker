import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

export default async function dbConnect() {
  if (connection.readyState >= 1) {
    return;
}

  try {
    await mongoose.connect(MONGODB_URI, {
      
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
