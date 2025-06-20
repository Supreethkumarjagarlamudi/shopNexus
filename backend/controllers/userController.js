import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/userModel.js";

const userRegistration = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    let userExists = await User.findOne({ email });

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters only",
      });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser
      .save()
      .then((user) => {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        return res.status(200).json({
          success: true,
          message: "User registered successfully",
          token,
          user,
        });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


const userLogin = async (req, res) => {

    try {

        let {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({ success: false, message: "Please enter a valid email"});
        }
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ success: false, message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials"});
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        return res.status(200).json({
            message: "user logged in successfully",
            success: true,
            token
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(!email || !password) {
      return res.status(400).json({success: false, message: "Please fill all the fields"});
    }
    if(!validator.isEmail(email)){
      return res.status(400).json({success: false, message: "Please enter a valid email"});
    }
    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PWD){
      return res.status(400).json({success: false, message: "Invalid credentials"});
    }
    const token = jwt.sign(email+password, process.env.JWT_SECRET);
    return res.status(200).json({message: "Admin logged in successfully", success: true, token});
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Internal Server Error"});
  }
};

export { userRegistration, userLogin, adminLogin };
