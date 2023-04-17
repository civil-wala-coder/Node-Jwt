const {
  login,
  test,
  signup,
  update,
  deleteUser,
} = require("../controller/userController");
const { auth, adminAuth } = require("../middleware/auth");

const router = require("express").Router();

router.post("/authenticate", login);
router.post("/", signup);
router.put("/:id", auth, update);
router.delete("/:id", auth, deleteUser);

module.exports = router;
