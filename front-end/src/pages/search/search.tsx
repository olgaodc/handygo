import { useParams } from 'react-router-dom';
import Container from '@/components/container/container';
import Sidebar from '@/components/sidebar/sidebar';
import BusinessesSection from '@/components/business-components/businesses-section/businesses-section';
import useBusinesses from '@/hooks/use-businesses';
import useCategories from '@/hooks/use-categories';
import Loader from '@/components/loader/loader';
import styles from './styles.module.scss';

const SearchPage = () => {
  const { category } = useParams();
  const { isLoading: isBusinessesLoading } = useBusinesses();
  const { isLoading: isCategoriesLoading } = useCategories();
  const isLoading = isBusinessesLoading || isCategoriesLoading;

  return (
    <Container>
      {isLoading ? <Loader /> : (
        <div className={styles.content}>
          <Sidebar />
          <section className={styles.bsWrapper}>
            <h2 className={styles.bsTitle}>{category}</h2>
            <BusinessesSection shouldFilter variant='flexStart' />
          </section>
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
