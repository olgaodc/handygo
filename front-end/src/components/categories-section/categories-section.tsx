import useCategories from '@/hooks/use-categories';
import CategoryCard from '../category-card/category-card';
import Container from '../container/container';
import styles from './styles.module.scss';

const CategoriesSection = () => {
  const { data: categories } = useCategories();

  return (
    <section className={styles.categoriesSectionWrapper}>
      <Container>
        <div className={styles.categoriesSection}>
          {categories && categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoriesSection;
