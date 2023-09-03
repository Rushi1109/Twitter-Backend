import { TweetRepository, UserRepository } from "../repository/index.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.tweetRepository = new TweetRepository();
    }

    async signup(email, password, name) {
        try {
            const user = await this.userRepository.create({
                email: email,
                password: password,
                name: name,
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = this.userRepository.findBy({ email });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signin(data) {
        try {
            const user = await this.getUserByEmail(data.email);
            if (!user) {
                throw {
                    message: 'No user found',
                };
            }
            if (!user.comparePassword(data.password)) {
                throw {
                    message: 'Incorrect password',
                };
            }
            const token = user.genJWT();
            return token;
        } catch (error) {
            throw error;
        }
    }

    async getUsertweets(userId, n = 10) {
        const tweetIds = await this.userRepository.getLastNTweets(userId, n);

        const tweets = await this.tweetRepository.findTweetsById(tweetIds);
        return tweets;
    }
}

export default UserService;