import Hashtag from "../models/hashtags.js";
import CrudRepository from "./crud-repository.js";

class HashtagRepository extends CrudRepository {

    constructor() {
        super(Hashtag);
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