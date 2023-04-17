const Post = require("../model/post");
const User = require("../model/user");

/********************************find all****************************************/
exports.findAll = async (req, res, next) => {
  try {
    const posts = await Post.find({ isComment: false }).populate("comments");
    res.status(200).json({ posts });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/********************************find by id****************************************/
exports.findById = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const post = await Post.findById(_id);
    if (!post) return res.status(400).json({ error: "Post Not Found" });
    res.status(200).json({ post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/********************************create****************************************/
exports.create = async (req, res, next) => {
  try {
    const { title, content, imageUrl, link } = req.body;

    // geting user id from req.userId which was added from auth middleware
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ error: "User Not Found" });
    const post = new Post({ title, content, imageUrl, link });
    post.owner = user._id;
    await post.save();
    res.status(200).json({ post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/********************************add comment to post****************************************/
exports.addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    // geting user id from req.userId which was added from auth middleware
    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ error: "User Not Found" });

    const post = await Post.findById(id);
    if (!post) return res.status(400).json({ error: "Post Not Found" });
    const comment = new Post({ title, isComment: true, owner: user._id });
    await comment.save();

    post.comments.push(comment);
    await post.save();
    res.status(200).json({ post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/********************************delete****************************************/
exports.deleteById = async (req, res, next) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
