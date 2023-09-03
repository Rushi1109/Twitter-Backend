import TweetService from "../services/tweet-service.js";
import UserService from "../services/user-service.js";

const tweetService = new TweetService();
const userService = new UserService();

export const createTweet = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const response = await tweetService.create(req.body);
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new tweet',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}

export const getTweet = async (req, res) => {
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(201).json({
            success: true,
            message: 'Successfully fetched a tweet',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}

export const deleteTweet = async (req, res) => {
    try {
        const response = await tweetService.deleteTweet(req.params.id);
        return res.status(201).json({
            success: true,
            message: 'Successfully deleted the tweet',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}

export const getLastNTweetsOfUser = async (req, res) => {
    try {
        const response = await userService.getUsertweets(req.user.id);
        return res.status(201).json({
            success: true,
            message: 'Successfully fetched user tweets',
            data: response,
            error: {},
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}