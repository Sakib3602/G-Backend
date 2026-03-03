import type { Request, Response } from "express";
import { User } from "../modules/User.js";



// create user
export const createUser = async (req: Request, res: Response) => {
    try {
        console.log("Request body:", req.body); // Debugging line to check the request body
        const user = await User.create(req.body);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Mongoose Error:", error);
        res.status(500).json({ message: "Error creating user", error });
    }
}


// get all users
export const getUsers = async (req: Request, res: Response) => {
    try{
        const users = await User.find();
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error });
    }
}