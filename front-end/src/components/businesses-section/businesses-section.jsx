import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import BusinessCard from '../business-card/business-card';
import { v4 as uuidv4 } from 'uuid';
import businessesData from '../../data/businesses-data';
import { useParams } from 'react-router-dom';

const BusinessesSection = ({ shouldFilter }) => {
  const [businesses, setBusinesses] = useState(businessesData);
  const { category: activeCategory } = useParams();

  useEffect(() => {
    if (shouldFilter) {
      const filteredBusinesses = businessesData.filter(business => business.category.toLowerCase() === activeCategory.toLowerCase());
      setBusinesses(filteredBusinesses);
    } else {
      setBusinesses(businessesData);
    }
  }, [activeCategory, shouldFilter]);

  return (
    <div className={styles.section}>
      {businesses.length > 0 ? businesses.map(business =>
        <BusinessCard
          key={uuidv4()}
          id={business.id}
          src={business.imageUrl}
          alt={business.serviceName}
          serviceCategory={business.category}
          serviceName={business.serviceName}
          personName={business.personName}
          address={business.address}
        />
      ) : <p>No data</p>}
    </div>
  )
}

export default BusinessesSection
