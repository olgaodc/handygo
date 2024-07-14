import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.scss';
import servicesData from '../../data/services-data';
import ServiceCard from '../service-card/service-card';

const Sidebar = () => {
  return (
    <aside className={styles.sidebarWrapper}>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.sidebar}>
        {servicesData.length > 0 && servicesData.map((service) => (
          <ServiceCard
            cardType='wide'
            key={uuidv4()}
            src={service.imageUrl}
            serviceName={service.serviceName}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
