import { LikeRepository, TweetRepository } from "../repository/index.js";

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        if (modelType == 'Tweet') {
            var likeable = await this.tweetRepository.getWithLikes(modelId);
        }
        else if (modelType == 'Comment') {
            // TODO
        }
        else {
            throw new Error('Unknown model type');
        }

        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId,
        });

        if (exists) {
            likeable.likes.pull(exists.id);
            await likeable.save();
            await exists.deleteOne();

            var isAdded = false;
        } else {
            const newLike = await this.likeRepository.create({
                onModel: modelType,
                user: userId,
                likeable: modelId,
            });
            likeable.likes.push(newLike);
            await likeable.save();

            var isAdded = true;
        }
        return isAdded;
    }
}

export default LikeService;