const Role = require("../model/role");

/********************************Create New Role****************************************/
exports.create = async (req, res, next) => {
  const { name } = req.body;
  try {
    const existingRole = await Role.findOne({ name });
    if (existingRole) return res.status(400).json({ error: "Role Exists" });

    const role = new Role({ name });
    await role.save();
    res.status(201).json({ role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/********************************Find All Roles****************************************/
exports.findAll = async (req, res, next) => {
  try {
    const roles = await Role.find();
    res.status(201).json({ roles });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
