import { TweetRepository, HashtagRepository } from "../repository/index.js";

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        // Get content of tweet
        const content = data.content;

        // RegEx for extracting hashtags
        const tags = content.match(/#[a-zA-Z0-9_]+/g).map((tag) => tag.substring(1));

        // Calling create method of tweet-repository
        const tweet = await this.tweetRepository.create(data);

        if (tags) {
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
        }

        return tweet;
    }
}

export default TweetService;

/*
    This is #example #tweet. 
*/