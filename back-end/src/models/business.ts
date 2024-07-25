import mongoose, { Schema, Document } from 'mongoose';

interface IBusiness extends Document {
  id: string;
  businessName: string;
  description: string;
  address: string;
  category: string;
  person: string;
  email: string;
  images: { url: string; alt?: string }[];
  creationDate: Date;
}

const businessSchema = new Schema<IBusiness>({
  id: { type: String, required: true, minlength: 3 },
  businessName: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  address: { type: String, required: true, minlength: 10 },
  category: { type: String, required: true, minlength: 3 },
  person: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  images: [{
    url: { type: String, required: true },
    alt: { type: String, required: false },
  }],
  creationDate: { type: Date, required: true },
});

const BusinessModel = mongoose.model<IBusiness>('Business', businessSchema);

export default BusinessModel;
