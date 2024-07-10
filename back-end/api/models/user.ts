const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isCorrectPassword = function isCorrectPassword(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.set('toJSON', {
  transform: (doc, { _id, ...props }) => ({
    id: _id,
    ...props,
  }),
});

module.exports = mongoose.model('User', userSchema);
