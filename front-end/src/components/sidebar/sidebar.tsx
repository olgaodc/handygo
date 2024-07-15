import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import ServiceCard from '../service-card/service-card';

// TO DO: REFACTOR CODE, REUSE SERVICE-SECTION HERE

type ServiceProps = {
  id: string,
  serviceName: string,
  imageUrl: string
};

type ServicesProps = Array<ServiceProps> | null;

const Sidebar = () => {
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
    <aside className={styles.sidebarWrapper}>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.sidebar}>
        {services && services.map((service) => (
          <ServiceCard
            id={service.id}
            key={service.id}
            variant='wide'
            src={service.imageUrl}
            serviceName={service.serviceName}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
