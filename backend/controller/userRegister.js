import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required fields.",
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(password, salt);
        if (!hashPassword) {
            return res.status(500).json({ error: "Something went wrong with password encryption" });
        }

        const userPayload = {
            name,
            email,
            password: hashPassword
        };
        // Save the user to MongoDB
        const newUser = new User(userPayload);
        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: savedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export default userRegister;