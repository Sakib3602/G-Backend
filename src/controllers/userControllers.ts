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
        if (typeof error === "object" && error !== null && "code" in error && (error as { code?: number }).code === 11000) {
            return res.status(409).json({ message: "User with this email already exists" });
        }
        res.status(500).json({ message: "Error creating user" });
    }
}


// get single user
export const getUserByEmail = async (req: Request, res: Response) => {
  try {

    const email = req.params.email as string;
    // console.log("Email param:", email); 

    const user = await User.findOne({ email });
    // console.log("User found:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User found",
      data: user
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error
    });
  }
};

