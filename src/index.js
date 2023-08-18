import express from "express";
import connect from "./config/database.js";
import { config } from "dotenv";
config();

import service from "./services/tweet-service.js";

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
    await connect();
    console.log('MongoDB connected');
    const ser = new service();
    await ser.create({
        content: "#done esm"
    })
});