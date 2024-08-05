const UserModel = require("../model/Usermodel");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function checkPassword(req, res) {
  try {
    const { password, userId } = req.body;
    const user = await UserModel.findById(userId);
    const verifyPassword = await bcryptjs.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(400).json({
        message: "please check password",
        error: true,
      });
    }
    const tokanData = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokanData, process.env.JWT_SECREAT_KEY, {
      expiresIn: "1d",
    });

    const cookieOption = {
      http: true,
      secure: true,
    };
    return res.cookie("token", token, cookieOption).status(200).json({
      message: "login successfuly",
      token: token,
      //   data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;
