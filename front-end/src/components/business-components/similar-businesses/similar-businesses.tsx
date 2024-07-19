import Modal from '@/components/modal/modal';
import PrimaryButton from '@/components/primary-button/primary-button';
import { FC, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import BookIcon from '@/assets/book-icon.svg';
import ApiService from '@/services/api-service';
import { Business } from '@/types/business';
import BusinessCard from '@/components/business-components/business-card/business-card';
import styles from './styles.module.scss';

interface Props {
  activeCategory: string,
  businessId: string,
  // category: boolean,
}

const SimilarBusinesses: FC<Props> = ({ activeCategory, businessId }) => {
  const [businesses, setBusinesses] = useState<Business[]>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const fetchSimilarBusinesses = async () => {
    try {
      const response = await ApiService.get(`/businesses/category/${activeCategory}`);
      const { businesses: businessData } = response.data;

      const filteredBusinesses = businessData.filter(
        (business: Business) => business.id !== businessId,
      );

      setBusinesses(filteredBusinesses);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSimilarBusinesses();
  }, []);

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

        {businesses && businesses.length > 0 && (
        <div className={styles.similarBusinessesWrapper}>
          <h3 className={styles.title}>Similar Businesses</h3>

          <div className={styles.similarBusinesses}>
            {businesses.map((business) => {
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
