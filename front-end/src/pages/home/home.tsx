import SearchSection from '@/components/search-section/search-section';
import BusinessesSection from '@/components/business-components/businesses-section/businesses-section';
import HeroBox from '@/components/hero-box/hero-box';
import CategoriesSection from '@/components/categories-section/categories-section';
import Container from '@/components/container/container';
import useBusinesses from '@/hooks/use-businesses';
import useCategories from '@/hooks/use-categories';
import Loader from '@/components/loader/loader';
import styles from './styles.module.scss';

const HomePage = () => {
  const { isLoading: isBusinessesLoading } = useBusinesses();
  const { isLoading: isCategoriesLoading } = useCategories();

  const isLoading = isBusinessesLoading || isCategoriesLoading;

  return (
    <>
      <HeroBox />
      <SearchSection />
      {isLoading ? <Loader /> : (
        <>
          <CategoriesSection />
          <section className={styles.bsWrapper}>
            <Container>
              <h2 className={styles.bsTitle}>Popular businesses</h2>
              <BusinessesSection />
            </Container>
          </section>
        </>
      )}
    </>
  );
};

export default HomePage;
