import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.scss';
import BusinessCard from '../business-card/business-card';

interface BusinessSectionProps {
  shouldFilter?: boolean, // ????????????????????????
}

interface ImageProps {
  url: string;
  alt?: string;
}

interface BusinessProps {
  id: string,
  images: ImageProps[],
  category: string,
  businessName: string,
  person: string,
  address: string,
}

type BusinessesProps = BusinessProps[] | null;

const BusinessesSection: FC<BusinessSectionProps> = ({ shouldFilter = false }) => {
  const [businesses, setBusinesses] = useState<BusinessesProps>(null);
  const { category: activeCategory } = useParams();

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/businesses');
      const { businesses: businessesData } = response.data;
      setBusinesses(businessesData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBusinessesByCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/businesses/category/${activeCategory}`);
      const { businesses: businessesData } = response.data;
      setBusinesses(businessesData);

      if (!businessesData.length) {
        setBusinesses([]);
      }
    } catch (err) {
      console.log('Error fetching businesses by category:', err);
    }
  };

  useEffect(() => {
    if (shouldFilter && activeCategory) {
      fetchBusinessesByCategory();
    } else {
      fetchBusinesses();
    }
  }, [activeCategory, shouldFilter]);

  return (
    <div className={styles.section}>
      {businesses && businesses.length > 0 ? businesses.map((business) => (
        <BusinessCard
          id={business.id}
          key={business.id}
          category={business.category}
          businessName={business.businessName}
          personName={business.person}
          address={business.address}
          images={business.images}
        />
      )) : <p>No data</p>}
    </div>
  );
};

export default BusinessesSection;
