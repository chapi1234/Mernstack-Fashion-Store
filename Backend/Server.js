import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

  
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();
 
// moddlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
 
// importing user routes
import userRouter from "./routes/userRoute.js"; 
import productRouter from "./routes/productRoute.js";

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});