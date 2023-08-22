import { UserRepository } from "../repository/index.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(email, password, name) {
        try {
            const user = await this.userRepository.create({
                email: email,
                password: password,
                name: name,
            });
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default UserService;