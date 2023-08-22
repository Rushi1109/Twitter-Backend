import UserService from "../services/user-service.js";

const userService = new UserService();

export const signup = async (req, res) => {
    try {
        const response = await userService.signup(req.body.email, req.body.password, req.body.name);
        return res.status(201).json({
            success: true,
            message: "Successfully created a new user",
            data: response,
            err: {},
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            err: error,
            data: {},
            message: "Something went wrong",
        });
    }
}