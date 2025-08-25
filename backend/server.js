import express from "express"; 
import  dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notes.route.js"

dotenv.config();  
const app = express(); 

const SERVER_PORT = process.env.BACKEND_PORT

app.use(express.json());
app.use("/api/notes", notesRoutes )

app.listen(SERVER_PORT, () => {
    connectDB();
    console.log("Server was up and runing on localhost:3001")
}); 




