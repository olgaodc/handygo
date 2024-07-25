import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import CategoryModel from '../models/category';

export const GET_CATEGORIES = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).json({ categories });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

export const ADD_CATEGORY = async (req: Request, res: Response) => {
  try {
    const { categoryName, imageUrl, bgColor } = req.body;

    if (!categoryName || !imageUrl || !bgColor) {
      return res.status(400).json({ response: 'All fields are required' });
    }

    const updatedImageUrl = imageUrl.replace(/color=[0-9a-f]{6}/i, `color=${bgColor}`);
    const category = new CategoryModel({
      id: uuidv4(),
      categoryName,
      imageUrl: updatedImageUrl,
      bgColor,
      creationDate: new Date(),
    });

    const newCategory = await category.save();
    return res.status(200).json({ response: 'Category added successfully', category: newCategory });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};
