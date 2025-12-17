import mongoose from 'mongoose';

const connectToDb = async () => {
    try {
        const conn = (await mongoose.connect(process.env.MONGODB_URI));
        console.log("Connected to mongodb: ", conn.connection.host);
    } catch (error) {
        console.error("Error occured while connecting to mongodb");
        process.exit(1);
    }

}

export default connectToDb;