import { TweetRepository, HashtagRepository, UserRepository, LikeRepository } from "../repository/index.js";
import CommentService from "./comment-service.js";

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
        this.userRepository = new UserRepository();
        this.likeRepository = new LikeRepository();
        this.commentService = new CommentService();
    }

    async create(data) {
        // Get content of tweet
        const content = data.content;

        // RegEx for extracting hashtags
        let tags = content.match(/#[a-zA-Z0-9_]+/g);

        // Calling create method of tweet-repository
        const tweet = await this.tweetRepository.create(data);
        const user = await this.userRepository.get(tweet.user);
        user.tweets.push(tweet.id);
        await user.save();

        if (tags) {
            try {
                tags = tags.map((tag) => tag.substring(1).toLowerCase());
                tags = [...new Set(tags)];
                let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
                let titleOfPresentTags = alreadyPresentTags.map((tag) => tag.title);
                let newTags = tags.filter((tag) => !titleOfPresentTags.includes(tag));

                newTags = newTags.map((tag) => {
                    return { title: tag, tweets: [tweet.id] }
                });

                await this.hashtagRepository.bulkCreate(newTags);

                alreadyPresentTags.forEach((tag) => {
                    tag.tweets.push(tweet.id);
                    tag.save();
                });
            } catch (error) {
                throw error;
            }
        }

        return tweet;
    }

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }

    async deleteLikesOnTweet(tweetId) {
        const tweet = await this.tweetRepository.get(tweetId);

        tweet.likes.forEach(async (like) => {
            await this.likeRepository.destroy(like);
        });

        tweet.likes = [];
        await tweet.save();
    }

    async deleteTagsOfTweet(tweetId) {
        const tweet = await this.tweetRepository.get(tweetId);

        const tags = tweet.content.match(/#[a-zA-Z0-9_]+/g);

        if (tags) {
            tags = tags.map((tag) => tag.substring(1).toLowerCase());
            tags = [...new Set(tags)];

            let presentTags = await this.hashtagRepository.findByName(tags);

            presentTags.forEach(async (tag) => {
                tag.tweets.pull(tweet.id);
                await tag.save();
                if (tag.tweets.length === 0) {
                    await tag.deleteOne();
                }
            });
        }
    }

    async deleteTweet(tweetId) {
        const tweet = await this.tweetRepository.get(tweetId);
        const user = await this.userRepository.get(tweet.user);

        await this.deleteTagsOfTweet(tweetId);
        await this.deleteLikesOnTweet(tweetId);

        // For removing comments of tweet
        tweet.comments.forEach(async (comment) => {
            await this.commentService.deleteComment(comment);
        });

        user.tweets.pull(tweet.id);
        await user.save();

        const response = await this.tweetRepository.destroy(tweetId);
        return response;
    }
}

export default TweetService;