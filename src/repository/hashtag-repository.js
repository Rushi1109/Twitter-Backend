import Hashtag from "../models/hashtags.js";

class HashtagRepository {

    // To insert hashtag into database
    async create(data) {
        try {
            const tag = await Hashtag.create(data);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    // To bulk insert hashtags from the tweet to database
    async bulkCreate(data) {
        try {
            const tags = await Hashtag.insertMany(data);
            return tags;
        } catch (error) {
            console.log(error);
        }
    }

    // To get a tag by id
    async get(id) {
        try {
            const tag = await Hashtag.findById(id);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    // To delete the tag 
    async destroy(id) {
        try {
            const tag = await Hashtag.findByIdAndRemove(id);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    async findByName(titleList) {
        try {
            const tags = await Hashtag.find({
                title: titleList,
            });
            return tags;
        } catch (error) {
            console.log(error);
        }
    }
}

export default HashtagRepository;