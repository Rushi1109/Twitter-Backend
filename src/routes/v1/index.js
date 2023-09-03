import express from "express";
import { createTweet, deleteTweet, getTweet } from "../../controllers/tweet-controller.js";
import { toggleLike } from "../../controllers/like-controller.js";
import { createComment, deleteComment } from "../../controllers/comment-controller.js";
import { login, signup } from "../../controllers/auth-controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = express.Router();

router.route('/tweets').post(authenticate, createTweet);
router.route('/tweets/:id').get(getTweet)
    .delete(authenticate, deleteTweet);

router.route('/likes/toggle').post(authenticate, toggleLike);

router.route('/comments').post(authenticate, createComment);
router.route('/comments/:id').delete(authenticate, deleteComment);

router.route('/signup').post(signup);

router.route('/login').post(login);

export default router;