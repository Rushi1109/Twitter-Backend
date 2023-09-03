import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findBy(data) {
        try {
            const response = await User.findOne(data);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getLastNTweets(userId, n) {
        const response = await User.findOne({ _id: userId });

        const tweetIds = response.tweets.slice(-n);
        return tweetIds;
    }
}

export default UserRepository;