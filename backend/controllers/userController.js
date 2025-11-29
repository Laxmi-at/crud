import User from "../models/User.js";
import bcrypt from "bcryptjs";
// Register
const register = async function (req, res, next) {
  try {
    // receive the data
    const { name, age, email, password } = req.body;
    // validate
    if (!name || !age || !email || !password) {
      const err = new Error("Please fill all fields");
      err.status = 400;
      throw err;
    }
    // check already exist
    const isExist = await User.findOne({ email });
    if (isExist) {
      const err = new Error("Email id already registered with us");
      err.status = 400;
      throw err;
    }

    const hashed = await bcrypt.hash(password, 10);

    // then create
    const user = await User.create({
      name,
      email,
      age,
      password: hashed,
    });

    // send response
    res.status(201).json({
      message: "Registered Successfully",
      data: { name, email, age },
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async function (req, res, next) {
  try {
    // receive data
    const { email, password } = req.body;
    // validate
    if (!email || !password) {
      const err = new Error("Please fill all fields");
      err.status = 400;
      throw err;
    }
    // find
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const err = new Error("Email not registred with us");
      err.status = 404;
      throw err;
    }
    // compare email
    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      const err = new Error("Email or Password wrong");
      err.status = 400;
      throw err;
    }

    // send response
    res.status(200).json({
      message: "Login successful",
      success: true,
      data: { name: user.name, email: user.email, age: user.age },
    });
  } catch (error) {
    next(error);
  }
};

// All users

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json({ message: "All users", success: true, data: users });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async function (req, res, next) {
  try {
    const userId = req.params.id;

    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({ message: "User deleted", success: true });
  } catch (error) {
    next(error);
  }
};

export { register, login, allUsers, deleteUser };
