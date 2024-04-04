import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connection = await mongoose.connect(
            'mongodb+srv://saurabhpandey1801:0cI2E8GQZ0hJejYT@cluster0.elpkwh9.mongodb.net/',
            {
                dbName: 'crud'
            }
        )
        console.log("*** Database connected Successfully ***");
    } catch (error) {
        console.log(error);
        console.log("### Database Connection Failed ###");
    }
}