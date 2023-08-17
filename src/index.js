const express = require("express");
const connect = require("./config/database.js");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
    await connect();
    console.log('MongoDB connected');
})