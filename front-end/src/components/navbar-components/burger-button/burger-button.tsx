import clsx from 'clsx';
import styles from './styles.module.scss';

interface Props {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const BurgerButton = ({ isMenuOpen = false, toggleMenu }: Props) => {
  return (
    <button
      type='button'
      onClick={toggleMenu}
      className={styles.burgerMenu}
    >
      <div className={clsx(styles.burgerLine, isMenuOpen && styles.isOpen)} />
      <div className={clsx(styles.burgerLine, isMenuOpen && styles.isOpen)} />
      <div className={clsx(styles.burgerLine, isMenuOpen && styles.isOpen)} />
    </button>
  );
};

export default BurgerButton;
