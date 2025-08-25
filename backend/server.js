import express from "express"; 
import  dotenv from "dotenv";
import { connectDB } from "./config/db.js";

const app = express(); 

dotenv.config(); 


app.get("/api/notes", (request, response) => {
    response.send("Server was listning !!!!");
})


app.listen("3001", () => {
    connectDB();
    console.log("Server was up and runing on localhost:3001")
}); 


