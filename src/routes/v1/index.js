import express from "express";
import { createTweet } from "../../controllers/tweet-controller.js";

const router = express.Router();

router.route('/tweets').post(createTweet);

export default router;