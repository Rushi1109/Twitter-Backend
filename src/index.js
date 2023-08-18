import express from "express";
import connect from "./config/database.js";
import bodyParser from "body-parser";
import apiRoutes from "./routes/index.js";
import { config } from "dotenv";
config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
    await connect();
    console.log('MongoDB connected');
});