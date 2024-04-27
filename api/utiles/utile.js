import parsePhoneNumber from "libphonenumber-js";

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone format
//It allows only India, USA, or Dubai
export const isValidPhone = (phone) => {
  try {
    const phoneNumber = parsePhoneNumber(phone);
    if (
      phoneNumber &&
      (phoneNumber.country === "IN" ||
        phoneNumber.country === "US" ||
        phoneNumber.country === "AE")
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// Validate Password format
export const isValidPassword = (password) => {
  return password.length >= 8;
};
