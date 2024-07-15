import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import BusinessModel from '../models/business';
import CategoryModel from '../models/category';

export const GET_BUSINESSES = async (req: Request, res: Response) => {
  try {
    const businesses = await BusinessModel.find();
    return res.status(200).json({ businesses });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

export const GET_BUSINESS = async (req: Request, res: Response) => {
  try {
    const business = await BusinessModel.findOne({ id: req.params.id });
    if (!business) {
      return res.status(404).json({ response: 'Business not found' });
    }
    return res.status(200).json({ business });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

export const GET_BUSINESSES_BY_CATEGORY = async (req: Request, res: Response) => {
  try {
    const businesses = await BusinessModel.find({ category: req.params.category });

    return res.status(200).json({ businesses });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

export const ADD_BUSINESS = async (req: Request, res: Response) => {
  try {
    const {
      businessName, description, address, category, person, email, images,
    } = req.body;

    if (!businessName || !description || !address
      || !category || !person || !email || !images) {
      return res.status(400).json({ response: 'Invalid input, all fields are required' });
    }

    const checkedImages = Array.isArray(images) ? images.filter((image) => image.url && typeof image.url === 'string') : [];
    if (checkedImages.length === 0) {
      return res.status(400).json({ response: 'Images array cannot be empty' });
    }

    const categoryExists = await CategoryModel.findOne({ serviceName: category });
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category does not exist.' });
    }

    const newBusiness = new BusinessModel({
      id: uuidv4(),
      businessName,
      description,
      address,
      category,
      person,
      email,
      images: checkedImages,
      creationDate: new Date(),
    });

    await newBusiness.save();
    return res.status(200).json({ response: 'Business added successfully', business: newBusiness });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

export const UPDATE_BUSINESS = async (req: Request, res: Response) => {
  try {
    const business = await BusinessModel.findOne({ id: req.params.id });

    if (!business) {
      return res.status(404).json({ response: 'Business not found' });
    }

    const updatedBusiness = await BusinessModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
    );
    return res.status(200).json({ response: 'Business updated successfully', business: updatedBusiness });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};
