import React, { useState } from 'react';
import ServiceCard from '../service-card/service-card';
import { v4 as uuidv4 } from 'uuid';
import servicesData from '../../data/services-data';
import styles from './styles.module.scss';
import Container from '../container/container';

const ServicesSection = () => {
  const [services, setServices] = useState(servicesData);

  return (
    <section className={styles.servicesSectionWrapper}>
      <Container>
        <div className={styles.servicesSection}>
          {services.length > 0 ? services.map(service =>
            <ServiceCard
              key={uuidv4()}
              src={service.imageUrl}
              serviceName={service.serviceName}
            />
          ) : null}
        </div>
      </Container>
    </section>
  )
}

export default ServicesSection