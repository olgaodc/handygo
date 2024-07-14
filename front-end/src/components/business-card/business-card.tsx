import clsx from 'clsx';
import { FC } from 'react';
import useLikeCard from '@hooks/use-like-card';
import PrimaryButton from '../primary-button/primary-button';
import styles from './styles.module.scss';

interface BusinessCardProps {
  id: string,
  src: string,
  alt: string,
  serviceCategory: string,
  serviceName: string,
  personName: string,
  address: string,
}

const BusinessCard: FC<BusinessCardProps> = ({
  id,
  src,
  alt,
  serviceCategory,
  serviceName,
  personName,
  address,
}) => {
  const { addLikedCard, removeLikedCard, isCardLiked } = useLikeCard();

  const handleLike = () => {
    if (isCardLiked(id)) {
      removeLikedCard(id);
    } else {
      addLikedCard(id);
    }
  };

  return (
    <div
      className={clsx(
        styles.card,
        isCardLiked(id) && styles.liked,
      )}
      id={id}
    >
      <span
        role='button'
        tabIndex={0}
        className={styles.likeBtn}
        onClick={handleLike}
        onKeyDown={handleLike}
      >
        <svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'>
          <rect fill='none' height='256' width='256' />
          <path d='M176,32a60,60,0,0,0-48,24A60,60,0,0,0,20,92c0,71.9,99.9,128.6,104.1,131a7.8,7.8,0,0,0,3.9,1,7.6,7.6,0,0,0,3.9-1,314.3,314.3,0,0,0,51.5-37.6C218.3,154,236,122.6,236,92A60,60,0,0,0,176,32Z' />
        </svg>
      </span>
      <img className={styles.image} src={src} alt={alt} />
      <div className={styles.cardInfo}>
        <span className={styles.category}>{serviceCategory}</span>
        <h3 className={styles.serviceName}>{serviceName}</h3>
        <p className={styles.personName}>{personName}</p>
        <p className={styles.address}>{address}</p>
        <PrimaryButton
          variant='primary'
          // TO DO: ADD FUNCTIONALITY
          // eslint-disable-next-line no-console
          onClick={() => console.log('clicked')}
        >
          Book now
        </PrimaryButton>
      </div>
    </div>
  );
};

export default BusinessCard;
