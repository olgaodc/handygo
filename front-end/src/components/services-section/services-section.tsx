import useServices from '@/hooks/use-services';
import ServiceCard from '../service-card/service-card';
import Container from '../container/container';
import styles from './styles.module.scss';

const ServicesSection = () => {
  const { data: services } = useServices();

  return (
    <section className={styles.servicesSectionWrapper}>
      <Container>
        <div className={styles.servicesSection}>
          {services && services.map((service) => (
            <ServiceCard
              id={service.id}
              key={service.id}
              src={service.imageUrl}
              serviceName={service.serviceName}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;
