const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/Post")

module.exports = {
  getProfile: async (req, res, next) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean()
      res.render("profile.ejs", { posts, user: req.user })
    } catch (err) {
      next(err)
    }
  },

  getFeed: async (req, res, next) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean()
      res.render("feed.ejs", { posts })
    } catch (err) {
      next(err)
    }
  },

  getPost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id)
      if (!post) {
        return res.status(404).send("Post not found")
      }
      res.render("post.ejs", { post, user: req.user })
    } catch (err) {
      next(err)
    }
  },

  createPost: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send("Please attach an image")
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        user: req.user.id,
      })
      res.redirect("/profile")
    } catch (err) {
      next(err)
    }
  },

  likePost: async (req, res, next) => {
    try {
      await Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } })
      res.redirect(`/post/${req.params.id}`)
    } catch (err) {
      next(err)
    }
  },

  deletePost: async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id)
      if (!post) {
        return res.status(404).send("Post not found")
      }

      // Authorization: only the owner can delete
      if (!post.user.equals(req.user._id)) {
        return res.status(403).send("You can only delete your own posts")
      }

      // Delete image from Cloudinary, then the post from MongoDB
      await cloudinary.uploader.destroy(post.cloudinaryId)
      await Post.deleteOne({ _id: post._id })
      res.redirect("/profile")
    } catch (err) {
      next(err)
    }
  },
}