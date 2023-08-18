import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Maximum character limit is 250'],
    },
    hashtags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag',
        }
    ]
},
    {
        timestamps: true,
    });

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;