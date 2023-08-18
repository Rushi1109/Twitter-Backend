import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Maximum character limit is 250'],
    },
},
    {
        timestamps: true,
    });

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;