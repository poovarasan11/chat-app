const UserModel = require("../model/Usermodel");
const becryptjs = require("bcryptjs");
async function registerUser(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;
    // console.log("body:", password);
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Alredy user exits",
        error: true,
      });
    }
    //hash password
    const salt = await becryptjs.genSalt(10);
    const hashpassword = await becryptjs.hash(password, salt);
    // console.log("hashpassword", hashpassword);
    const payload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
    };
    // console.log("payload::", payload);
    const user = new UserModel(payload);
    const userSave = await user.save();
    // console.log("userSave::", userSave);

    return res.status(201).json({
      message: "User Created Successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}
module.exports = registerUser;
