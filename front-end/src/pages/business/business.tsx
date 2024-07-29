import Container from '@/components/container/container';
import { useParams } from 'react-router-dom';
import BusinessInfo from '@/components/business-components/business-info/business-info';
import BusinessDescription from '@/components/business-components/business-description/business-description';
import useBusiness from '@/hooks/use-business-by-id';
import Loader from '@/components/loader/loader';
import styles from './styles.module.scss';

const BusinessPage = () => {
  const { id } = useParams<{ id: string }>();
  const businessId = id || '';
  const { data: business, isLoading } = useBusiness(businessId);

  return (
    <div className={styles.content}>
      <Container>
        <div className={styles.sectionWrapper}>
          {isLoading ? <Loader /> : (
            business && (
            <div className={styles.section}>
              <BusinessInfo business={business} />
              <BusinessDescription business={business} />
            </div>
            )
          )}
        </div>
      </Container>
    </div>
  );
};

export default BusinessPage;
