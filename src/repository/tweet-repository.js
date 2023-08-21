import Tweet from "../models/tweet.js";
import CrudRepository from "./crud-repository.js";

class TweetRepository extends CrudRepository {
    constructor() {
        super(Tweet);
    }

    // To get a tweet by id and populate comments of it
    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate({
                path: 'comments',
                populate: [
                    {
                        path: 'comments',
                        model: 'Comment',
                    }
                ]
            }).lean();
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    // To get tweets using pagination
    async getAll(offset, limit) {
        try {
            const tweet = await Tweet.find().skip(offset).limit(limit);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
}

export default TweetRepository;