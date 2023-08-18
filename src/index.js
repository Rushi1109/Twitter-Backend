import express from "express";
import connect from "./config/database.js";
import { config } from "dotenv";
config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
    await connect();
    console.log('MongoDB connected');
});