const UserModel = require('../models/user');
const { generateToken } = require('../utils/generate-token');

module.exports.GET_USERS = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

module.exports.REGISTER = async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ response: 'User already exists' });
    }
    const newUser = new UserModel(user);
    await newUser.save();
    return res.status(201).json({ response: 'User registered successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ response: 'Error registering new user.', error: error.message });
  }
};

module.exports.LOGIN = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user || !(await user.isCorrectPassword(password))) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  const token = generateToken({ id: user._id });
  return res.status(200).json({ token, user });
};
