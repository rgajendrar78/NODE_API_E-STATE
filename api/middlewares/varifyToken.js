import jwt from "jsonwebtoken";
// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token not provided",
    });
  }

  jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};
