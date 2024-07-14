import Container from '../container/container';
import styles from './styles.module.scss';

const HeroBox = () => {
  return (
    <div className={styles.heroBoxWrapper}>
      <Container>
        <div className={styles.heroBox}>
          <h1 className={styles.title}>
            Find Home
            <span>Service/Repair</span>
            {' '}
            Near You
          </h1>
          <h2 className={styles.subtitle}>Explore Best Home Service & Repair near you</h2>
        </div>
      </Container>
    </div>
  );
};

export default HeroBox;
