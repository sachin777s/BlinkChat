import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* Register a New User */
export const registerUser = async (req, res) => {
  try {
    const { name, mob, email, password, cpassword } = req.body;
    const userExist = await User.findOne({ mob });
    if (userExist) {
      return res.status(500).json("Mobile Number Already Exist");
    }
    if (!name || !mob || !email || !password || !cpassword) {
      return res.status(500).json("Incomplete Detail");
    }
    if (mob < 1000000000 || mob > 999999999999) {
      return res.status(500).json("Invalid Mobile Number!");
    }
    if (password !== cpassword) {
      return res
        .status(500)
        .json("Password and Confirm Password is not matching");
    }
    if (password.length < 6) {
      return res
        .status(500)
        .json("Password length should be mininum 6 characters");
    }
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);
    const newUser = await User(req.body);
    const savedUser = await newUser.save();
    delete savedUser._doc.password;
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_KEY, {
      expiresIn: "90d",
    });
    
    res.cookie("blink_token", token, {
         expires: new Date(Date.now() + 90 * 24 * 3600000), //Cookies Expiration Date for 90 days
         httpOnly: true,
         sameSite: 'none',
         secure: true
      });
    
    res.status(201).json({
        message: "Registration SuccessFully",
        user: savedUser,
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Login User */
export const loginUser = async (req, res) => {
  try {
    const { mob, password } = req.body;
    if (!mob || !password) {
      return res.status(500).json("Incomplete Details");
    }
    const user = await User.findOne({ mob: mob });
    if (!user) {
      return res.status(500).json("Wrong Credentials");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (isPasswordValid) {
      const { password, ...otherDetails } = user._doc;
      const token = jwt.sign(
        { userId: otherDetails._id },
        process.env.JWT_KEY,
        {
          expiresIn: "90d",
        }
      );
      res.cookie("blink_token", token, {
        expires: new Date(Date.now() + 90 * 24 * 3600000), //Cookies Expiration Date for 90 days
         httpOnly: true,
         sameSite: 'none',
         secure: true,
      });
      res.status(201).json({
        message: "Login Successfully",
        user: otherDetails,
      });
      console.log(token);
    } else {
      res.status(500).json("Wrong Password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
