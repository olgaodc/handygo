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

export interface BookingFormValues {
  businessId: string,
  date: string,
  time: string,
  userEmail: string,
  userName: string,
  status: string,
}

export const initialValues: BookingFormValues = {
  businessId: '',
  date: '',
  time: '',
  userEmail: '',
  userName: '',
  status: 'pending',
};
