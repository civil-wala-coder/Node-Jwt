const router = require("express").Router();
const {
  findAll,
  findById,
  create,
  deleteById,
  addComment,
} = require("../controller/postController");
const { auth } = require("../middleware/auth");

router.get("/", auth, findAll);
router.get("/:id", auth, findById);
router.post("/", auth, create);
router.post("/comments/:id", auth, addComment);
router.delete("/:id", auth, deleteById);

module.exports = router;
