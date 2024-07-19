import Container from '@/components/container/container';
import Navbar from '@/components/navbar/navbar';
import ApiService from '@/services/api-service';
import { Business } from '@/types/business';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BusinessInfo from '@/components/business-components/business-info/business-info';
import BusinessDescription from '@/components/business-components/business-description/business-description';
import styles from './styles.module.scss';

const BusinessPage = () => {
  const [business, setBusiness] = useState<Business>();

  const { id: businessId } = useParams<{ id: string }>();

  const fetchBusiness = async () => {
    try {
      const response = await ApiService.get(`/business/${businessId}`);
      const { business: businessData } = response.data;
      setBusiness(businessData);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBusiness();
  }, [businessId]);

  return (
    <>
      <Navbar />
      <div className={styles.content}>
        <Container>
          <div className={styles.sectionWrapper}>
            {business && (
              <div className={styles.section}>
                <BusinessInfo business={business} />
                <BusinessDescription business={business} />
              </div>
            )}

          </div>
        </Container>
      </div>
    </>

  );
};

export default BusinessPage;
