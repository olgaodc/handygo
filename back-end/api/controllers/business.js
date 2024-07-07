const { v4: uuidv4 } = require('uuid');
const BusinessModel = require('../models/business');
const CategoryModel = require('../models/category');

module.exports.GET_BUSINESSES = async (req, res) => {
  try {
    const businesses = await BusinessModel.find();
    return res.status(200).json({ businesses: businesses })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}

module.exports.GET_BUSINESS = async (req, res) => {
  try {
    const business = await BusinessModel.findOne({ id: req.params.id });
    if (!business) {
      return res.status(404).json({ response: 'Business not found' })
    }
    return res.status(200).json({ business: business })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}

module.exports.GET_BUSINESSES_BY_CATEGORY = async (req, res) => {
  try {
    const businesses = await BusinessModel.find({ category: req.params.category });
    if (!businesses.length) {
      return res.status(404).json({ response: 'No businesses found for this category' });
    }

    return res.status(200).json({ businesses: businesses })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}


module.exports.ADD_BUSINESS = async (req, res) => {
  try {
    const { businessName, description, address, category, person, email, images } = req.body;

    const checkedImages = Array.isArray(images) ? images.filter(image => image.url && typeof image.url === 'string') : [];
    if (checkedImages.length === 0) {
      return res.status(400).json({ response: 'Images array cannot be empty' });
    };

    const categoryExists = await CategoryModel.findOne({ serviceName: category });
    if (!categoryExists) {
      return res.status(404).json({ message: 'Category does not exist.' });
    };

    const business = new BusinessModel({
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

    const addedBusiness = await business.save();
    return res.status(200).json({ response: 'Business added successfully', business: addedBusiness });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}


module.exports.UPDATE_BUSINESS = async (req, res) => {
  try {
    const business = await BusinessModel.findOne({ id: req.params.id });

    if (!business) {
      return res.status(404).json({ response: 'Business not found' });
    }

    const updatedBusiness = await BusinessModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {new: true}
    );
    return res.status(200).json({ response: 'Business updated successfully', business: updatedBusiness });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}