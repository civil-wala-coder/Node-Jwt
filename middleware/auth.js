const jwt = require("jsonwebtoken");
const User = require("../model/user");

// generic auth
exports.auth = async (req, res, next) => {
  let token = null;
  try {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = _id;
      next();
    } else {
      return res.status(400).json({ error: "Invalid Token" });
    }
    if (!token) {
      res.status(400).json({ error: "No Token Present" });
    }
  } catch (error) {
    console.log("Auth error=====> ", error.message);
    res.status(400).json({ error: error.message });
  }
};

// admin auth
exports.adminAuth = async (req, res, next) => {
  try {
    const _id = req.userId;
    const existingUser = await User.findById(_id)
      .populate("role")
      .select("-password");

    if (existingUser.role.name !== "ADMIN") {
      return res.status(400).json({ error: "Access Denied" });
    }
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
