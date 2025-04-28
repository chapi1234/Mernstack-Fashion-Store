import mongoose from "mongoose";
 
const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB Connected");
    });
    mongoose.connection.on("error", (err) => {
        console.log(`MongoDB connection error: ${err}`);
    });
    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB Disconnected");
    });
    const conn = await mongoose.connect(process.env.MONGODB_URI); 
};
export default connectDB;