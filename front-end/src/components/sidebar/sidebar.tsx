import useCategories from '@/hooks/use-categories';
import styles from './styles.module.scss';
import CategoryCard from '../category-card/category-card';

const Sidebar = () => {
  const { data: categories } = useCategories();

  return (
    <aside className={styles.sidebarWrapper}>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.sidebar}>
        {categories && categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            variant='wide'
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
