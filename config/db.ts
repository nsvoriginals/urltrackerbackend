import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string, {
            //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true,
            

        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connect;
