import mongoose from "mongoose";

const connectDB = async () => {
    try {
       const connection =await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected", connection.connection.host);
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export {connectDB}
