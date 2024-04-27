import jwt from "jsonwebtoken";

// Function to generate a new access token
export const generateAccessToken = (userId, role) => {
  return jwt.sign({ userId, role }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY_TIME}`,
  }); // Adjust the expiration time as needed
};

// Function to generate a new refresh token
export const generateRefreshToken = (userId, role) => {
  return jwt.sign({ userId, role }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: `${process.env.REFRESH_TOKEN_EXPIRY_TIME}`,
  }); // Adjust the expiration time as needed
};
