import bcrypt from "bcrypt";
import { userModel } from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/authService.js";
import { isValidEmail, isValidPassword } from "../utiles/utile.js";

//signUpUser
export async function signUpUser(name, email, password, phone, role = "user") {
  try {
    // Validation error messages
    const validationErrors = [];

    // Validate name
    if (!name) {
      validationErrors.push("Name is required");
    }

    // Validate email format
    if (!email || !isValidEmail(email)) {
      validationErrors.push("Invalid email format");
    }

    // Validate phone format
    if (!phone) {
      validationErrors.push("Invalid phone number format");
    }

    // Validate password strength
    if (!password || !isValidPassword(password)) {
      validationErrors.push("Password must be at least 8 characters long");
    }

    // Check if there are any validation errors
    if (validationErrors.length > 0) {
      return {
        success: false,
        message: "Invalid input data",
        errors: validationErrors,
      };
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return { success: false, message: "Email already exists" };
      }
      return { success: false, message: "Phone number already exists" };
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    // Generate JWT token with the ID of the newly created user
    const token = generateAccessToken(newUser._id, newUser.role);

    // Generate refresh token
    const refreshToken = generateRefreshToken(newUser._id, newUser.role);

    return {
      success: true,
      message: "User created successfully",
      token,
      refreshToken,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
}

//signInUser
export async function signInUser(emailOrPhone, password) {
  try {
    const user = await userModel.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return {
        success: false,
        message: "Authentication failed. User not found.",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Authentication failed. Invalid password.",
      };
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    return {
      success: true,
      message: "Authentication successful",
      accessToken,
      refreshToken,
      role: user.role,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal Server Error" };
  }
}

//get current user
export const getCurrentUserById = async (userId) => {
  try {
    return await userModel.findById(userId, "-password");
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

//get All Users
export const getAllUsers = async () => {
  try {
    return await userModel.find({}, "-password");
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

//get user by id
export const getUserByID = async (id) => {
  return await userModel.findById(id, "-password");
};

//delete user by id
export const deleteUserByID = async (id) => {
  const deletedUser = await userModel.findByIdAndDelete(id);
  if (!deletedUser) {
    return null; // Return null if user is not found
  }
  return deletedUser;
};

//update user by Id
export const updateUserByID = async (id, name, role) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { name, role },
      { new: true, select: "-password" }
    );
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};
