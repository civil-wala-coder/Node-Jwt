const { create, findAll } = require("../controller/roleController");
const { auth, adminAuth } = require("../middleware/auth");

const router = require("express").Router();

router.get("/", auth, adminAuth, findAll);
router.post("/", auth, adminAuth, create);

module.exports = router;
