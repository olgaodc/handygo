import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import routes from '@navigation/routes';
import { FC } from 'react';
import styles from './styles.module.scss';

interface ServiceCardProps {
  src: string,
  serviceName: string,
  variant?: 'wide' | '' // ????????????????????????
}

const ServiceCard: FC<ServiceCardProps> = ({ src, serviceName, variant = '' }) => {
  const path = routes.SEARCH_CATEGORY.url(serviceName);
  const { category } = useParams();
  const isActive = category === serviceName;

  return (
    <Link
      className={clsx(
        styles.card,
        variant && styles[variant],
        isActive && styles.active,
      )}
      to={path}
    >
      <img
        className={styles.image}
        src={src}
        alt={`${serviceName} icon`}
      />
      <p className={styles.text}>{serviceName}</p>
    </Link>
  );
};

export default ServiceCard;
