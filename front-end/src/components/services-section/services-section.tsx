import { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../service-card/service-card';
import Container from '../container/container';
import styles from './styles.module.scss';

type ServiceProps = {
  id: string,
  serviceName: string,
  imageUrl: string
};

type ServicesProps = Array<ServiceProps> | null;

const ServicesSection = () => {
  const [services, setServices] = useState<ServicesProps>();

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories');
      const { categories } = response.data;
      setServices(categories);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
