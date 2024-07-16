import { FC } from 'react';
import { useParams } from 'react-router-dom';
import useBusinesses from '@/hooks/use-businesses';
import styles from './styles.module.scss';
import BusinessCard from '../business-card/business-card';

interface BusinessSectionProps {
  shouldFilter?: boolean,
}

const BusinessesSection: FC<BusinessSectionProps> = ({ shouldFilter = false }) => {
  const { data } = useBusinesses();
  const businesses = data ?? [];
  const { category: activeCategory } = useParams();

  const filteredBusinesses = shouldFilter && activeCategory
    ? businesses?.filter((business) => business.category.toLowerCase()
    === activeCategory.toLowerCase())
    : businesses;

  return (
    <div className={styles.section}>
      {filteredBusinesses.length > 0 ? filteredBusinesses.map((business) => (
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
