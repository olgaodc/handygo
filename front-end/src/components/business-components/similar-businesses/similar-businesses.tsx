import Modal from '@/components/modal/modal';
import PrimaryButton from '@/components/primary-button/primary-button';
import { FC, useState } from 'react';
import { ReactSVG } from 'react-svg';
import BookIcon from '@/assets/book-icon.svg';
import { Business } from '@/types/business';
import BusinessCard from '@/components/business-components/business-card/business-card';
import useBusinessesByCategory from '@/hooks/use-businesses-by-category';
import styles from './styles.module.scss';

interface Props {
  activeCategory: string,
  businessId: string,
}

const SimilarBusinesses: FC<Props> = ({ activeCategory, businessId }) => {
  const { data } = useBusinessesByCategory(activeCategory);
  const businesses = data ?? [];
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const filteredBusinesses = businesses.filter(
    (business: Business) => business.id !== businessId,
  );

  const limitedBusinesses = filteredBusinesses.slice(0, 4);

  return (
    <>
      <div className={styles.section}>
        <PrimaryButton
          onClick={openModal}
          variant='primary'
        >
          <div className={styles.buttonChild}>
            <ReactSVG className={styles.icon} src={BookIcon} />
            <div>Book Appointment</div>
          </div>
        </PrimaryButton>

        {limitedBusinesses && limitedBusinesses.length > 0 && (
        <div className={styles.similarBusinessesWrapper}>
          <h3 className={styles.title}>Similar Businesses</h3>

          <div className={styles.similarBusinesses}>
            {limitedBusinesses.map((business) => {
              return (
                <BusinessCard
                  key={business.id}
                  business={business}
                  variant='small'
                  showButton={false}
                />
              );
            })}
          </div>
        </div>
        )}

      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        closeModal={closeModal}
      />
    </>
  );
};

export default SimilarBusinesses;
