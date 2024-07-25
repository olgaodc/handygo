import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import UserModel from '../models/user';
import generateToken from '../utils/generate-token';

export const GET_USERS = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

export const REGISTER = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ response: 'User already exists' });
    }

    const newUser = new UserModel({
      id: uuidv4(),
      ...user,
    });

    await newUser.save();

    return res.status(201).json({ response: 'User registered successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ response: 'Error registering new user.', error: (error as Error).message });
  }
};

export const LOGIN = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await UserModel.findOne({ email });

    if (!user || !(await user.isCorrectPassword(password))) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = generateToken(user.id);

    const userWithoutPassword = await UserModel.findOne({ id: user.id }).select(
      '-password -_id',
    );

    return res.status(200).json({ token, userWithoutPassword });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in.', error: (error as Error).message });
  }
};
