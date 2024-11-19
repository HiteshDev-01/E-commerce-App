import validator from "validator";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET);
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not exist , register first",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.json({ success: false, message: "Password is not correct" });
    } else {
      const token = createToken(user._id);
      return res.json({
        success: true,
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: `Failed to logged in:${error.message}`,
    });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists with this email address",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        messsage: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token: token });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: `Faild to register the user:${error.message}`,
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.json({
        success: false,
        message: "Email or password is required !",
      });
    }
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.TOKEN_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({
        success: false,
        messsage: "Email or password is wrong !",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: `Failed to admin logged in: ${error.message}`,
    });
  }
};
