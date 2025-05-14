const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");

// Đăng ký người dùng
exports.signup = async (req, res) => {
  const { username, password, level } = req.body;
  //validation input
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  } else if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  } else {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  // const verificationToken = Math.floor(
  //   100000 + Math.random() * 900000
  // ).toString();

  try {
    const user = new User({
      username,
      password: hashedPassword,
      level: level || "user",
      // verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    const userWithLevel = {
      ...user._doc,
      level: level || "user",
      password: undefined,
    };
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;
  // const existingUser = await User.findOne({ username });

  try {
    const user = await User.findOne({ username });
    //validation input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.Please try again!" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // try {
    //   const user = await User.findOne({ username });
    //   if (!user || !(await user.comparePassword(password))) {
    //     return res.status(401).json({ message: "Invalid credentials" });
    //   }

    // const token = jwt.sign(
    //   { id: user._id, username: user.username, level: user.level },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );
    generateTokenAndSetCookie(res, user._id);

    await user.save();
    // show user with token
    // const userWithToken = {
    //   token,
    //   ...user._doc,
    //   password: undefined,
    // };
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      // user: userWithToken,
      token: generateTokenAndSetCookie(res, user._id),
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Lấy thông tin người dùng hiện tại
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username level");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ username: user.username, level: user.level });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = newPassword; // Mật khẩu sẽ được hash bởi pre-save middleware
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
