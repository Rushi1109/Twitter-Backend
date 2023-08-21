import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async createComment(modelId, modelType, userId, content) {
        if (modelType == 'Tweet') {
            var commentable = await this.tweetRepository.get(modelId);
        }
        else if (modelType == 'Comment') {
            var commentable = await this.commentRepository.get(modelId);
        }
        else {
            throw new Error('Unknown model type');
        }

        const comment = await this.commentRepository.create({
            content: content,
            userId: userId,
            onModel: modelType,
            commentable: modelId,
            comments: [],
        });

        commentable.comments.push(comment);
        await commentable.save();

        return comment;
    }
}

export default CommentService;