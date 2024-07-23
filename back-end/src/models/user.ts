import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends mongoose.Document {
  id: string;
  name: string;
  age?: number;
  email: string;
  password: string;
  isCorrectPassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number },
    email: {
      type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre<IUser>('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isCorrectPassword = function comparePassword(password: string) {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
