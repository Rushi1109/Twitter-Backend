import express from "express";
import { createTweet, getTweet } from "../../controllers/tweet-controller.js";
import { toggleLike } from "../../controllers/like-controller.js";
import { createComment } from "../../controllers/comment-controller.js";

const router = express.Router();

router.route('/tweets').post(createTweet);
router.route('/tweets/:id').get(getTweet);

router.route('/likes/toggle').post(toggleLike);

router.route('/comments').post(createComment);

export default router;