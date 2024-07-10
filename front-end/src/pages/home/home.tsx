import Navbar from '../../components/navbar/navbar';
import SearchSection from '../../components/search-section/search-section';
import BusinessesSection from '../../components/businesses-section/businesses-section';
import HeroBox from '../../components/hero-box/hero-box';
import ServicesSection from '../../components/services-section/services-section';
import styles from './styles.module.scss';
import Container from '../../components/container/container';

const HomePage = () => {
  return (
    <>
    <Navbar />
    <HeroBox />
    <SearchSection />
    <ServicesSection />
    <section className={styles.bsWrapper}>
      <Container>
        <h2 className={styles.bsTitle}>Popular businesses</h2> 
        <BusinessesSection />       
      </Container>
      </section>
    </>
  )
}

export default HomePage
