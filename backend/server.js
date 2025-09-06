import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import notesRoutes from "./src/routes/notes.route.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

dotenv.config();
const app = express();

const SERVER_PORT = process.env.BACKEND_PORT;

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(SERVER_PORT, () => {
    console.log("Server was up and runing on localhost:3001");
  });
});
