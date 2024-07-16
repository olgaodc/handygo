import useServices from '@/hooks/use-services';
import styles from './styles.module.scss';
import ServiceCard from '../service-card/service-card';

// TODO: REFACTOR CODE, REUSE SERVICE-SECTION HERE

const Sidebar = () => {
  const { data: services } = useServices();

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
