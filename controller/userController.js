const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const { transporter } = require("../service/mailService");

//sign Up
const signupUserApi = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  const newUser = new User(req.body);

  try {
    const isExistingUser = await User.findOne({ userEmail:userEmail});

    if (isExistingUser) {
      res.status(409).json({
        success: false,
        error: "User with this email is already registered",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      newUser.userPassword = await bcrypt.hash(userPassword, salt);
      newUser.profilePic = `/uploads/${req.file.filename}`;
      await newUser.save();
      res.status(201).json({
        success: true,
        message: "Signup Successful",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//Login API
const loginUserApi = async (req, res) => {
  const toFoundUser = await User.findOne({ userEmail: req.body.userEmail });
  try {
    if (toFoundUser) {
      const isPasswordValid = await bcrypt.compare(
        req.body.userPassword,
        toFoundUser.userPassword
      );
      const token = jwt.sign({ userId: toFoundUser._id }, process.env.JWT, {
        expiresIn: "10d",
      });
      if (toFoundUser && isPasswordValid) {
        res.status(200).json({
          success: true,
          message: "Login Successfully",
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "UserEmail not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//forgot password
const forgotUserApi = async (req, res) => {
  const retrievedUser = await User.findOne({ userEmail: req.body.userEmail });
  try {
    if (retrievedUser != null) {
      const token = jwt.sign(
        { userId: retrievedUser._id, userEmail: retrievedUser.userEmail },
        process.env.JWT,
        { expiresIn: "1hr" }
      );

      await transporter.sendMail({
        from: process.env.Email,
        to: req.body.userEmail,
      });

      return res.status(200).json({
        success: true,
        message: "Mail sent successfully",
        token: token,
        userId: retrievedUser._id,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//reset password
const resetPasswordApi = async (req, res) => {
  const { userId, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await User.findById(userId);
    if (checkUser != null) {
      jwt.verify(token, process.env.JWT, async (err) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
          });
        }
        if (newPassword === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const newUserPassword = await bcrypt.hash(newPassword, salt);
          await User.findByIdAndUpdate(checkUser._id, {
            $set: { userPassword: newUserPassword },
          });
          return res.status(200).json({
            success: true,
            message: "Password updated successfully",
          });
        } else {
          return res.status(403).json({
            success: false,
            message: "NewPassword and ConfirmPassword do not match",
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  signupUserApi,
  loginUserApi,
  forgotUserApi,
  resetPasswordApi,
};
