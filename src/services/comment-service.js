import { CommentRepository, LikeRepository, TweetRepository } from "../repository/index.js";

class CommentService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
        this.likeRepository = new LikeRepository();
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

    async deleteLikesOnComment(commentId) {
        const comment = await this.commentRepository.get(commentId);

        comment.likes.forEach(async (like) => {
            await this.likeRepository.destroy(like);
        });

        comment.likes = [];
        await comment.save();
    }

    async deleteCommentWithLikes(commentId) {
        await this.deleteLikesOnComment(commentId);

        const response = await this.commentRepository.destroy(commentId);
        return response;
    }

    async deleteCommentsOnComment(commentId) {
        const comment = await this.commentRepository.get(commentId);

        comment.comments.forEach(async (comment) => {
            await this.deleteCommentWithLikes(comment);
        });

        comment.comments = [];
        comment.save();
    }

    async deleteComment(commentId) {
        const comment = await this.commentRepository.get(commentId);

        if (comment.onModel === 'Tweet') {
            var commentable = await this.tweetRepository.get(comment.commentable);
        }
        else if (comment.onModel === 'Comment') {
            var commentable = await this.commentRepository.get(comment.commentable);
        }

        await this.deleteLikesOnComment(commentId);
        await this.deleteCommentsOnComment(commentId);

        commentable.comment.pull(comment.id);
        await commentable.sace();

        const response = await this.commentRepository.destroy(commentId);
        return response;
    }
}

export default CommentService;