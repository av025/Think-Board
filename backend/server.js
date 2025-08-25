import express from "express"; 
import  dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notes.route.js"

const app = express(); 

dotenv.config(); 

app.use(express.json());
app.use("/api/notes", notesRoutes )

app.listen("3001", () => {
    connectDB();
    console.log("Server was up and runing on localhost:3001")
}); 



