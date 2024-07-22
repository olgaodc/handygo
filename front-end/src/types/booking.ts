interface Images {
  _id: string;
  url: string;
  alt?: string;
}

interface BusinessInfo {
  businessName: string,
  person: string,
  address: string,
  images: Images[],
}

export interface Booking {
  id: string,
  businessId: string,
  date: string,
  time: string,
  businessInfo: BusinessInfo[],
  status: string,
}
