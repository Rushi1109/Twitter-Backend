import Comment from "../models/comment.js";
import CrudRepository from "./crud-repository.js";

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }


}

export default CommentRepository;