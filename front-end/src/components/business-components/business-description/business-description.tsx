import { Business } from '@/types/business';
import { FC } from 'react';
import styles from './styles.module.scss';
import SimilarBusinesses from '../similar-businesses/similar-businesses';

interface BusinessProps {
  business: Business,
}
const BusinessDescription: FC<BusinessProps> = ({ business }) => {
  // console.log(business.category);
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.section}>
        <div className={styles.descriptionWrapper}>
          <h2 className={styles.title}>Description</h2>
          <p className={styles.description}>{business.description}</p>
        </div>
        <div className={styles.galleryWrapper}>
          <h2 className={styles.title}>Gallery</h2>
          <div className={styles.galleryImages}>
            {business.images.map((image) => {
              return (
                <img
                  className={styles.galleryImage}
                  key={image._id}
                  src={image.url}
                  alt={image.alt}
                />
              );
            })}
          </div>
        </div>
      </div>
      <SimilarBusinesses activeCategory={business.category} businessId={business.id} />
    </div>
  );
};

export default BusinessDescription;
