// Import Dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorHandlers.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/crud";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("tiny"));

connectDB(DB_URL);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "App running healthy" });
});

app.use("/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, HOST, () => {
  console.log(`[Server]: http://${HOST}:${PORT}`);
});

const shutdown = async (signal) => {
  try {
    console.log(`Shutdown signal received : ${signal}`);

    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

    console.log(`HTTP server closed`);

    await mongoose.connection.close();
    console.log("mongodb connection closed");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});
