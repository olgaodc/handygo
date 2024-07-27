import { FC } from 'react';
import { useParams } from 'react-router-dom';
import useBusinesses from '@/hooks/use-businesses';
import { clsx } from 'clsx';
import styles from './styles.module.scss';
import BusinessCard from '../business-card/business-card';

interface BusinessSectionProps {
  shouldFilter?: boolean,
  variant?: string,
}

const BusinessesSection: FC<BusinessSectionProps> = ({ shouldFilter = false, variant = '' }) => {
  const { data } = useBusinesses();
  const businesses = data ?? [];
  const { category: activeCategory } = useParams();

  const filteredBusinesses = shouldFilter && activeCategory
    ? businesses?.filter((business) => business.category.toLowerCase()
    === activeCategory.toLowerCase())
    : businesses.slice(0, 8);

  return (
    <div className={clsx(styles.sectionWrapper, styles[variant])}>
      <div className={styles.section}>
        {/* TODO: Fix on loading do not show no data message */}
        {filteredBusinesses.length > 0 ? filteredBusinesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        )) : <p>No data</p>}
      </div>
    </div>
  );
};

export default BusinessesSection;
