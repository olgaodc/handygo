import { useParams } from 'react-router-dom';
import Container from '@/components/container/container';
import Sidebar from '@/components/sidebar/sidebar';
import BusinessesSection from '@/components/business-components/businesses-section/businesses-section';
import styles from './styles.module.scss';

const SearchPage = () => {
  const { category } = useParams();
  return (
    <Container>
      <div className={styles.content}>
        <Sidebar />
        <section className={styles.bsWrapper}>
          <h2 className={styles.bsTitle}>{category}</h2>
          <BusinessesSection shouldFilter />
        </section>
      </div>
    </Container>
  );
};

export default SearchPage;
