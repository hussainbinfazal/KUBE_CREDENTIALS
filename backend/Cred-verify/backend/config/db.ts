import mongoose from 'mongoose';
export async function connectDB(): Promise<void>{
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose.connect(process.env.MONGODB_URI ?? '');
        console.log('MongoDB connected');
    } catch (error: any) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

