const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
})

// Has the password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return 
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Check a login attempt against the stored hash
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", UserSchema)