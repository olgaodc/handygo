interface ImageProps {
  _id: string;
  url: string;
  alt?: string;
}

export interface Business {
  id: string,
  category: string,
  businessName: string,
  person: string,
  email: string,
  address: string,
  images: ImageProps[],
  description: string,
}
