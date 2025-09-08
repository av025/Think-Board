import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import notesRoutes from "./src/routes/notes.route.js";
import rateLimiter from "./src/middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const SERVER_PORT = process.env.BACKEND_PORT;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
    })
  );
}

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (request, response) => {
    response.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

connectDB().then(() => {
  app.listen(SERVER_PORT, () => {
    console.log("Server was up and runing on localhost:3001");
  });
});
