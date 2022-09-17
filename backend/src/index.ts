import express, { Response, Request, NextFunction, Application } from "express";
import { Server } from "http";
import "dotenv/config";
import cors from "cors";

import createHttpError from "http-errors";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import bodyParser from "body-parser";

const app: Application = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(errorHandler);
app.use("/api/user", userRoutes);
const PORT: Number = Number(process.env.PORT) || 5000;
const server: Server = app.listen(PORT, () =>
  console.log(`Server running on Port ${PORT}`)
);
