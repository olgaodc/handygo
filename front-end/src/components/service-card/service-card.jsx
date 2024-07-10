import React from 'react';
import styles from './styles.module.scss';
import { Link, useParams } from 'react-router-dom';
import { routes } from '../navigation/router';
import clsx from 'clsx';

const ServiceCard = ({ src, serviceName, cardType}) => {
  const path = routes.SEARCH_CATEGORY.url(serviceName);
  const { category } = useParams();
  const isActive = category === serviceName;

  return (
    <Link 
      className={clsx(
        styles.card, 
        styles[cardType], 
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
  )
}

export default ServiceCard