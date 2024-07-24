import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
  id: string;
  categoryName: string;
  imageUrl: string;
  bgColor: string;
  creationDate: Date;
}

const categorySchema = new Schema<ICategory>({
  id: { type: String, required: true, minlength: 3 },
  categoryName: {
    type: String, required: true, unique: true, minlength: 3,
  },
  imageUrl: { type: String, required: true, minlength: 10 },
  bgColor: { type: String, required: true, minlength: 6 },
  creationDate: { type: Date, required: true },
});

const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);
export default CategoryModel;
