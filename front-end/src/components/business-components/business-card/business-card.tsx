import clsx from 'clsx';
import { FC } from 'react';
import useLikeCard from '@/hooks/use-like-card';
import { Link, useNavigate } from 'react-router-dom';
import routes from '@/navigation/routes';
import { Business } from '@/types/business';
import { ReactSVG } from 'react-svg';
import HeartIcon from '@/assets/heart-icon.svg';
import PrimaryButton from '../../primary-button/primary-button';
import styles from './styles.module.scss';

interface Props {
  business: Business,
  variant?: string,
  showButton?: boolean,
}

const BusinessCard: FC<Props> = ({ business, variant = '', showButton = true }) => {
  const { addLikedCard, removeLikedCard, isCardLiked } = useLikeCard();
  const path = routes.BUSINESS_ID.url(business.id);

  const navigate = useNavigate();

  const handleBook = () => {
    navigate(path);
  };

  // TODO: TIKRINTI NE CIA!!!
  const handleLike = () => {
    if (isCardLiked(business.id)) {
      removeLikedCard(business.id);
    } else {
      addLikedCard(business.id);
    }
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
      <span
        role='button'
        tabIndex={0}
        className={styles.likeBtn}
        onClick={handleLike}
        onKeyDown={handleLike}
      >
        <ReactSVG className={styles.icon} src={HeartIcon} />
      </span>
      <div className={styles.images}>
        <img
          key={business.images[0]._id}
          className={styles.image}
          src={business.images[0].url}
          alt={business.images[0].alt || 'Image'}
        />
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.category}>{business.category}</span>
        <h3 className={styles.serviceName}>{business.businessName}</h3>
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
