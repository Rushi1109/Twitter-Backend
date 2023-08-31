class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in CRUD repo');
            throw error;
        }
    }

    async destroy(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log('Something went wrong in CRUD repo');
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.log('Something went wrong in CRUD repo');
            throw error;
        }
    }

    async getAll() {
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log('Something went wrong in CRUD repo');
            throw error;
        }
    }

    async getWithLikes(id) {
        try {
            const response = await this.model.findById(id).populate({ path: "likes" });
            return response;
        }
        catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }

    async findForLikes(id) {
        try {
            const response = await this.model.findById(id).populate({ path: "likes" });
            return response;
        }
        catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }

    async update(id, data) {
        try {
            const result = await this.model.findByIdandUpdate(id, data, { new: true });
            return result;
        } catch (error) {
            console.log('Something went wrong in CRUD repo');
            throw error;
        }
    }
}

export default CrudRepository;