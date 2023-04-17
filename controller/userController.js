const User = require("../model/user");
const Role = require("../model/role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/********************************Login****************************************/
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ error: "Incorrect username/password" });

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch)
      return res.status(400).json({ error: "Incorrect credentials" });

    let token = jwt.sign(
      {
        _id: existingUser._id,
        name: existingUser.firstName + " " + existingUser.lastName,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ jwt: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/********************************Signup****************************************/
exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).select("-password");
    if (existingUser) res.status(400).json({ error: "Email exists" });

    const role = await Role.findOne({ name: "USER" });

    const newUser = new User({ firstName, lastName, email });
    newUser.password = await bcrypt.hash(password, 10);
    newUser.role = role._id;
    await newUser.save();

    res.status(201).json({ message: `User Created : ${newUser._id}` });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.test = async (req, res, next) => {
  return res.status(200).json({ message: "working fine" });
};

/********************************update****************************************/
exports.update = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).json({ error: "Incorrect username/password" });

    if (req.body.hasOwnProperty("firstName"))
      user.firstName = req.body.firstName;
    if (req.body.hasOwnProperty("lastName")) user.lastName = req.body.lastName;
    if (req.body.hasOwnProperty("password")) user.password = req.body.password;

    await user.save();

    res.status(201).json({ message: "Updated Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/********************************delete****************************************/
exports.deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });

    res.status(201).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
