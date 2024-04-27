export const roleAuthorize = (role) => {
  return async (req, res, next) => {
    try {
      const userRole = req.userRole;
      if (!userRole || userRole !== role) {
        return res.status(403).json({
          success: false,
          message: "Not authorized: Insufficient role permissions",
        });
      }
      next();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
};
