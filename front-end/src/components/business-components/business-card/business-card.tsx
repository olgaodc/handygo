import { clsx } from 'clsx';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routes from '@/navigation/routes';
import { Business } from '@/types/business';
import { ReactSVG } from 'react-svg';
import HeartIcon from '@/assets/heart-icon.svg';
import useLikedCards from '@/store/use-like-card';
import useAuth from '@/store/use-auth';
import PrimaryButton from '../../primary-button/primary-button';
import styles from './styles.module.scss';

interface Props {
  business: Business,
  variant?: string,
  showButton?: boolean,
}

const BusinessCard: FC<Props> = ({ business, variant = '', showButton = true }) => {
  const { user } = useAuth();
  const { toggleLikedCard, isCardLiked } = useLikedCards();
  const path = routes.BUSINESS_ID.url(business.id);

  const navigate = useNavigate();

  const handleBook = () => {
    navigate(path);
  };

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    toggleLikedCard(business.id);
  };

  return (
    <Link
      to={path}
      id={business.id}
      className={clsx(
        styles.card,
        styles[variant],
        isCardLiked(business.id) && styles.liked,
      )}
    >
      {user && (
      <button
        type='button'
        className={styles.likeBtn}
        onClick={handleLike}
        data-testid='like-button'
      >
        <ReactSVG className={styles.icon} src={HeartIcon} />
      </button>
      )}
      <div className={styles.images}>
        {business.images && business.images.length > 0 && (
          <img
            key={business.images[0]._id}
            className={styles.image}
            src={business.images[0].url}
            alt={business.images[0].alt || 'Image'}
          />
        )}
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.category}>{business.category}</span>
        <h3 className={styles.businessName}>{business.businessName}</h3>
        <p className={styles.personName}>{business.person}</p>
        <p className={styles.address}>{business.address}</p>
        {showButton && (
          <PrimaryButton
            variant='primary'
            onClick={handleBook}
          >
            Book now
          </PrimaryButton>
        )}

      </div>
    </Link>
  );
};

export default BusinessCard;
