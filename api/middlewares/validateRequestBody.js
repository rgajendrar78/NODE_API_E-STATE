export const validateUpdateRequestBody = (req, res, next) => {
    const allowedFields = ['name', 'role'];
    const requestKeys = Object.keys(req.body);
  
    const isInvalidField = requestKeys.some(key => !allowedFields.includes(key));
  
    if (isInvalidField) {
      return res.status(400).json({
        success: false,
        message: "Invalid field provided. You are only authorized to change name and role.",
      });
    }
  
    next();
  };