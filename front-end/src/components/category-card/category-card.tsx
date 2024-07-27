import { Link, useParams } from 'react-router-dom';
import { clsx } from 'clsx';
import routes from '@/navigation/routes';
import { FC } from 'react';
import { Category } from '@/types/category';
import styles from './styles.module.scss';

interface Props {
  category: Category,
  variant?: 'wide' | '',
}

const CategoryCard: FC<Props> = ({ category, variant = '' }) => {
  const path = routes.SEARCH_CATEGORY.url(category.categoryName);
  const { category: activeCategory } = useParams();
  const isActive = activeCategory === category.categoryName;

  return (
    <Link
      id={category.id}
      className={clsx(
        styles.card,
        variant && styles[variant],
        isActive && styles.active,
      )}
      to={path}
    >
      <img
        className={styles.image}
        src={category.imageUrl}
        alt={`${category.categoryName} icon`}
      />
      <p className={styles.text}>{category.categoryName}</p>
    </Link>
  );
};

export default CategoryCard;
