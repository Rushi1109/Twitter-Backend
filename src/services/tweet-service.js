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
        let tags = content.match(/#[a-zA-Z0-9_]+/g);

        // Calling create method of tweet-repository
        const tweet = await this.tweetRepository.create(data);

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
                console.log(error);
            }
        }

        return tweet;
    }
}

export default TweetService;

/*
    This is #example #tweet. 
*/