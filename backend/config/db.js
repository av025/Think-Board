import mongoose from "mongoose"; 

export const connectDB = async () => {
    try { 
        const connectedToDB = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connection to DB ${connectedToDB.connection.host}`)
        
    } catch (error) { 
        console.log(`Error to Connecting with DB ${error.message}`);
        process.exit(1);
        
    }
}