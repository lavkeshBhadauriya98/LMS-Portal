import mongoose from "mongoose";
    mongoose.set('strictQuery',false);
    const connectionToDb = () => {
        mongoose.connect(process.env.MONGO_URL)
        .then((conn) => {
            console.log(`Connected to DB: ${conn.connection.host}`);
        })
        .catch((err) => {
            console.log(`DB connection error: ${err.message}`);
        });
    }
    

export default connectionToDb;