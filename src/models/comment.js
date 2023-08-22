import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Maximum character limit for a comment is 250']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment'],
    },
    commentable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel',
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
        }
    ]
},
    {
        timestamps: true,
    });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;