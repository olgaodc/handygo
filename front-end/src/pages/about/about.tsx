/* eslint-disable max-len */
import Container from '@/components/container/container';
import AboutImage from '@/assets/about-image.jpg';
import { ReactSVG } from 'react-svg';
import West53Icon from '@/assets/about-images/icon-53-west-53.svg';
import AlfredIcon from '@/assets/about-images/icon-alfred.svg';
import CompassIcon from '@/assets/about-images/icon-compass.svg';
import CorcoranIcon from '@/assets/about-images/icon-corcoran.svg';
import DouglasEllimanIcon from '@/assets/about-images/icon-douglas-elliman.svg';
import LuxuryApartmentsIcon from '@/assets/about-images/icon-luxury-apartments.svg';
import RemaxIcon from '@/assets/about-images/icon-remax.svg';
import SolowIcon from '@/assets/about-images/icon-solow.svg';
import styles from './styles.module.scss';

// TODO: 'FETCH FROM API'

const AboutPage = () => {
  return (
    <div className={styles.contentWrapper}>
      <Container>
        <div className={styles.content}>
          <div className={styles.flexWrapper}>
            <div className={styles.aboutWrapper}>
              <section className={styles.about}>
                <h2 className={styles.aboutTitle}>About Us</h2>
                <p className={styles.description}>Welcome to HandyGo, your trusted partner for all home service and repair needs. We are dedicated to simplifying the process of maintaining your home by connecting you with the best local professionals. Our platform ensures you receive top-quality service with minimal effort, so you can enjoy a well-maintained home without the hassle.</p>
              </section>
              <section className={styles.history}>
                <h2 className={styles.historyTitle}>Our History</h2>
                <p>Our journey began with a simple vision: to revolutionize how homeowners find and book home services. Recognizing the challenges in locating reliable service providers, we aimed to create a platform that simplifies this process, ensuring top-quality home maintenance with minimal effort.</p>
                <p>In 2018, a group of homeowners and tech enthusiasts founded HandyGo. Experiencing the struggles of home maintenance themselves, they envisioned a user-friendly platform to connect homeowners with trustworthy local professionals. In 2019, we launched our beta version in New York City, offering cleaning, repair, and plumbing services. The positive response and growing demand led to an expansion of our service categories.</p>
                <p>From 2021, we enhanced our platform with real-time booking and we expanded to major cities across the United States, connecting more homeowners with top-rated service providers. Our dedication to excellence and customer satisfaction has earned us a reputation as a trusted partner for home maintenance.</p>
              </section>
            </div>
            <img className={styles.aboutImage} src={AboutImage} alt='3 workers' />
          </div>

          <section className={styles.trusted}>
            <h2 className={styles.title}>Trusted By</h2>
            <div className={styles.trustedImages}>
              <ReactSVG src={West53Icon} />
              <ReactSVG src={DouglasEllimanIcon} />
              <ReactSVG src={CompassIcon} />
              <ReactSVG src={RemaxIcon} />
              <ReactSVG src={SolowIcon} />
              <ReactSVG src={AlfredIcon} />
              <ReactSVG src={CorcoranIcon} />
              <ReactSVG src={LuxuryApartmentsIcon} />
            </div>
          </section>
        </div>
      </Container>
    </div>

  );
};

export default AboutPage;
