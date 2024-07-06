const { v4: uuidv4 } = require('uuid');
const CategoryModel = require('../models/category');

module.exports.GET_CATEGORIES = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    return res.status(200).json({ categories: categories })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }

}

module.exports.ADD_CATEGORY = async (req, res) => {
  try {
    const updatedImageUrl = req.body.imageUrl.replace(/color=[0-9a-f]{6}/i, `color=${req.body.bgColor}`);
    const category = new CategoryModel({
      id: uuidv4(),
      serviceName: req.body.serviceName,
      imageUrl: updatedImageUrl,
      bgColor: req.body.bgColor,
      creationDate: new Date(),
    });

    const addedCategory = await category.save();
    return res.status(200).json({ response: 'Category added successfully', category: addedCategory });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}
