import {
  getAllUsers,
  getCurrentUserById,
  signInUser,
  signUpUser,
  getUserByID as getUserByIDService,
  deleteUserByID as deleteUserByIDService,
  updateUserByID as updateUserByIDService,
} from "../services/userservice.js";

export async function signUp(req, res) {
  const { name, email, phone, password, role } = req.body;
  try {
    const result = await signUpUser(name, email, password, phone, role);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function signIn(req, res) {
  const { emailOrPhone, password } = req.body;
  try {
    const result = await signInUser(emailOrPhone, password);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const getCurrentUser = async (req, res) => {
  const { userId } = req; // Assuming userId is extracted from the token
  try {
    const user = await getCurrentUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUsers = async (req, res) => {
  const userRole = req.userRole;
  try {
    const users = await getAllUsers(userRole);
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserByIDService(id);
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the user exists
    const user = await deleteUserByIDService(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    await deleteUserByIDService(id);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateUserByID = async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;

  try {
    const updatedUser = await updateUserByIDService(id, name, role);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
