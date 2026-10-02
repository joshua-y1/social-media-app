const multer = require("multer")
const path = require("path")

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"]

module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error("File type is not supported"), false)
    }
    cb(null, true)
  },
})